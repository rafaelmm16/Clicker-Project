#include "ui.h"
#include "player.h"

#include <ctype.h>
#include <errno.h>
#include <limits.h>

#ifdef _WIN32
#include <windows.h>
#endif

static void flush_input_line(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
        // Descarta caracteres restantes da linha
    }
}

void setup_console(void) {
    setlocale(LC_ALL, "");
#ifdef _WIN32
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
#endif
}

void clear_screen(void) {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void wait_for_enter(void) {
    char buffer[16];
    printf("\nPressione Enter para continuar...");
    fflush(stdout);
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        if (strchr(buffer, '\n') == NULL) {
            flush_input_line();
        }
    }
}

int read_int(const char *prompt, int *out_value) {
    char buffer[64];

    if (prompt != NULL) {
        printf("%s", prompt);
        fflush(stdout);
    }

    if (fgets(buffer, sizeof(buffer), stdin) == NULL) {
        return 0;
    }

    if (strchr(buffer, '\n') == NULL) {
        flush_input_line();
    }

    char *start = buffer;
    while (isspace((unsigned char)*start)) {
        start++;
    }
    if (*start == '\0') {
        return 0;
    }

    errno = 0;
    char *endptr = NULL;
    long val = strtol(start, &endptr, 10);
    if (errno == ERANGE || endptr == start || val < INT_MIN || val > INT_MAX) {
        return 0;
    }

    while (isspace((unsigned char)*endptr)) {
        endptr++;
    }
    if (*endptr != '\0') {
        return 0;
    }

    *out_value = (int)val;
    return 1;
}

void read_line(const char *prompt, char *buffer, size_t size) {
    if (size == 0) {
        return;
    }

    if (prompt != NULL) {
        printf("%s", prompt);
        fflush(stdout);
    }

    if (fgets(buffer, (int)size, stdin) == NULL) {
        buffer[0] = '\0';
        return;
    }

    if (strchr(buffer, '\n') == NULL) {
        flush_input_line();
    }

    buffer[strcspn(buffer, "\r\n")] = '\0';
}

void print_main_menu(void) {
    printf("<...> <...> <...> <...> <...> <...> <...>\n");
    printf("1 -> Clicker\n");
    printf("2 -> Upgrades\n");
    printf("3 -> Ascensão\n");
    printf("4 -> Conquistas e Estatísticas\n");
    printf("5 -> Sair (Sem Salvar)\n");
    printf("6 -> Salvar e Sair\n");
    printf("<...> <...> <...> <...> <...> <...> <...>\n");
}

void print_shop_menu(const Shop *shop) {
    printf("-------------------- Sh@p! --------------------\n");
    for (int i = 0; i < NUM_UPGRADES; i++) {
        const UpgradeItem *item = &shop->items[i];
        printf("(%d) %-12s | Qtd: %2d | +%.3f/clique | Preço: %.2f\n",
               i + 1, item->nome, item->quantidade, item->multiplicador, item->preco);
    }
    printf("\n(%d) Voltar\n", NUM_UPGRADES + 1);
    printf("-----------------------------------------------\n");
}

void print_player_stats(const Player *player, double bonus_por_clique) {
    double mult = get_prestige_multiplier(player);
    double gain = (1.0 + bonus_por_clique) * mult;

    printf("Computador: %s\n", player->nome);
    printf("Bits: %.2f (+%.3f por clique | Prestígio: %.2fx)\n",
           player->bits, gain, mult);
    printf("Prestígio pendente: %d (próximo marco: %.0f Bits)\n",
           player->cont_asc, player->next_asc_bits);
}
