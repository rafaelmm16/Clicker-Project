#include "player.h"
#include "ui.h"

typedef struct {
    uint32_t flag;
    const char *titulo;
    const char *descricao;
} AchievementDef;

static const AchievementDef ACHIEVEMENT_DEFS[NUM_ACHIEVEMENTS] = {
    { ACH_FIRST_CLICK,      "Primeiro Clique",  "Faça seu primeiro clique." },
    { ACH_FIFTY_CLICKS,     "Dedos Rápidos",    "Realize 50 cliques no total." },
    { ACH_FIRST_UPGRADE,    "Primeiro Upgrade", "Compre seu primeiro upgrade na loja." },
    { ACH_TEN_UPGRADES,     "Colecionador",     "Possua 10 upgrades ao mesmo tempo." },
    { ACH_HUNDRED_BITS,     "Centena de Bits",  "Acumule 100 Bits no total." },
    { ACH_KILOBIT,          "Kilobit",          "Acumule 1.024 Bits no total." },
    { ACH_FIRST_ASCENSION,  "Ascendido",        "Realize sua primeira ascensão." },
    { ACH_MAINFRAME_MASTER, "Mainframe Master", "Compre pelo menos 1 Mainframe." }
};

void initialize_player(Player *player) {
    player->bits = 0.0;
    player->cont_asc = 0;
    player->next_asc_bits = INITIAL_ASCENSION_BITS;
    player->prestige_level = 0;
    player->ascension_count = 0;
    player->total_clicks = 0;
    player->total_bits_earned = 0.0;
    player->achievements = 0U;
    snprintf(player->nome, PLAYER_NAME_MAX, "default");
}

void set_player_name(Player *player) {
    int changename = 0;

    printf("\nDeseja nomear seu PC?\n");
    printf("(1) Sim\n(2) Não\n");

    while (!read_int("Escolha: ", &changename) || (changename != 1 && changename != 2)) {
        if (feof(stdin)) {
            return;
        }
        printf("Opção inválida! Digite 1 para Sim ou 2 para Não.\n");
    }

    if (changename == 1) {
        char nome_temp[PLAYER_NAME_MAX];
        read_line("Nome do PC: ", nome_temp, sizeof(nome_temp));
        if (nome_temp[0] != '\0') {
            snprintf(player->nome, PLAYER_NAME_MAX, "%s", nome_temp);
        }
    }
}

double get_prestige_multiplier(const Player *player) {
    return 1.0 + (player->prestige_level * PRESTIGE_BONUS_PER_POINT);
}

static int unlock_achievement(Player *player, uint32_t flag) {
    if ((player->achievements & flag) != 0U) {
        return 0;
    }

    player->achievements |= flag;
    for (int i = 0; i < NUM_ACHIEVEMENTS; i++) {
        if (ACHIEVEMENT_DEFS[i].flag == flag) {
            printf(">> [CONQUISTA DESBLOQUEADA] %s - %s\n",
                   ACHIEVEMENT_DEFS[i].titulo, ACHIEVEMENT_DEFS[i].descricao);
            break;
        }
    }
    return 1;
}

int check_achievements(Player *player, const Shop *shop) {
    int unlocked = 0;
    int total_upgrades = 0;
    int has_mainframe = 0;

    if (shop != NULL) {
        for (int i = 0; i < NUM_UPGRADES; i++) {
            total_upgrades += shop->items[i].quantidade;
        }
        has_mainframe = shop->items[NUM_UPGRADES - 1].quantidade > 0;
    }

    if (player->total_clicks >= 1) {
        unlocked += unlock_achievement(player, ACH_FIRST_CLICK);
    }
    if (player->total_clicks >= 50) {
        unlocked += unlock_achievement(player, ACH_FIFTY_CLICKS);
    }
    if (total_upgrades >= 1) {
        unlocked += unlock_achievement(player, ACH_FIRST_UPGRADE);
    }
    if (total_upgrades >= 10) {
        unlocked += unlock_achievement(player, ACH_TEN_UPGRADES);
    }
    if (player->total_bits_earned >= 100.0) {
        unlocked += unlock_achievement(player, ACH_HUNDRED_BITS);
    }
    if (player->total_bits_earned >= 1024.0) {
        unlocked += unlock_achievement(player, ACH_KILOBIT);
    }
    if (player->ascension_count >= 1) {
        unlocked += unlock_achievement(player, ACH_FIRST_ASCENSION);
    }
    if (has_mainframe) {
        unlocked += unlock_achievement(player, ACH_MAINFRAME_MASTER);
    }

    return unlocked;
}

void print_achievements_list(const Player *player) {
    int unlocked_count = 0;

    printf("\n--------------- Conquistas ---------------\n");
    for (int i = 0; i < NUM_ACHIEVEMENTS; i++) {
        int is_unlocked = (player->achievements & ACHIEVEMENT_DEFS[i].flag) != 0U;
        if (is_unlocked) {
            unlocked_count++;
        }
        printf("[%c] %-17s - %s\n",
               is_unlocked ? 'X' : ' ',
               ACHIEVEMENT_DEFS[i].titulo,
               ACHIEVEMENT_DEFS[i].descricao);
    }
    printf("------------------------------------------\n");
    printf("Progresso: %d/%d conquistas desbloqueadas\n", unlocked_count, NUM_ACHIEVEMENTS);
}
