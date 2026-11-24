#include "save_load.h"
#include "shop.h"

#define SAVE_FILE "save.dat"
#define SAVE_MAGIC 0x434C4B52U /* "CLKR" */
#define SAVE_VERSION 2U

typedef struct {
    uint32_t magic;
    uint32_t version;
} SaveHeader;

typedef struct {
    int quantidade;
    double preco;
} UpgradeSaveData;

int save_game(const Player *player, const Shop *shop, double aplicar) {
    FILE *file = fopen(SAVE_FILE, "wb");
    if (file == NULL) {
        printf("Erro: Não foi possível criar o arquivo de save.\n");
        return 0;
    }

    SaveHeader header = { SAVE_MAGIC, SAVE_VERSION };
    UpgradeSaveData items_data[NUM_UPGRADES];
    for (int i = 0; i < NUM_UPGRADES; i++) {
        items_data[i].quantidade = shop->items[i].quantidade;
        items_data[i].preco = shop->items[i].preco;
    }

    int ok = 1;
    if (fwrite(&header, sizeof(header), 1, file) != 1 ||
        fwrite(player, sizeof(Player), 1, file) != 1 ||
        fwrite(items_data, sizeof(UpgradeSaveData), NUM_UPGRADES, file) != NUM_UPGRADES ||
        fwrite(&aplicar, sizeof(double), 1, file) != 1) {
        ok = 0;
    }

    if (fclose(file) != 0) {
        ok = 0;
    }

    if (ok) {
        printf("\nJogo salvo com sucesso!\n");
    } else {
        printf("\nErro ao gravar o arquivo de save.\n");
    }

    return ok;
}

int load_game(Player *player, Shop *shop, double *aplicar) {
    FILE *file = fopen(SAVE_FILE, "rb");
    if (file == NULL) {
        printf("Nenhum jogo salvo encontrado. Iniciando um novo jogo.\n");
        return 0;
    }

    SaveHeader header = { 0, 0 };
    Player loaded_player;
    UpgradeSaveData items_data[NUM_UPGRADES];
    double loaded_aplicar = 0.0;

    int ok = 1;
    if (fread(&header, sizeof(header), 1, file) != 1 ||
        header.magic != SAVE_MAGIC ||
        header.version != SAVE_VERSION ||
        fread(&loaded_player, sizeof(Player), 1, file) != 1 ||
        fread(items_data, sizeof(UpgradeSaveData), NUM_UPGRADES, file) != NUM_UPGRADES ||
        fread(&loaded_aplicar, sizeof(double), 1, file) != 1) {
        ok = 0;
    }

    fclose(file);

    if (!ok) {
        printf("Arquivo de save inválido ou incompatível. Iniciando um novo jogo.\n");
        return 0;
    }

    loaded_player.nome[PLAYER_NAME_MAX - 1] = '\0';
    if (loaded_player.next_asc_bits <= 0.0) {
        loaded_player.next_asc_bits = INITIAL_ASCENSION_BITS;
    }
    if (loaded_player.prestige_level < 0) {
        loaded_player.prestige_level = 0;
    }

    *player = loaded_player;
    for (int i = 0; i < NUM_UPGRADES; i++) {
        shop->items[i].quantidade = items_data[i].quantidade;
        shop->items[i].preco = items_data[i].preco;
    }
    *aplicar = calculate_total_bonus(shop);

    printf("\nJogo carregado com sucesso! Bem-vindo de volta, %s.\n", player->nome);
    return 1;
}
