// save_load.c

#include "save_load.h"
#include <stdio.h>

#define SAVE_FILE "save.dat"

void save_game(Player *player, Upgrades *upgrades, Prices *prices, float *aplicar) {
    FILE *file = fopen(SAVE_FILE, "wb"); // "wb" = Write Binary

    if (file == NULL) {
        printf("Erro: Não foi possível criar o arquivo de save.\n");
        return;
    }

    // Escreve as structs e a variável 'aplicar' no arquivo
    fwrite(player, sizeof(Player), 1, file);
    fwrite(upgrades, sizeof(Upgrades), 1, file);
    fwrite(prices, sizeof(Prices), 1, file);
    fwrite(aplicar, sizeof(float), 1, file);

    fclose(file);
    printf("\nJogo salvo com sucesso!\n");
}

int load_game(Player *player, Upgrades *upgrades, Prices *prices, float *aplicar) {
    FILE *file = fopen(SAVE_FILE, "rb"); // "rb" = Read Binary

    if (file == NULL) {
        printf("Nenhum jogo salvo encontrado. Iniciando um novo jogo.\n");
        return 0; // Retorna 0 para indicar que nenhum save foi carregado
    }

    // Lê os dados do arquivo para as structs
    fread(player, sizeof(Player), 1, file);
    fread(upgrades, sizeof(Upgrades), 1, file);
    fread(prices, sizeof(Prices), 1, file);
    fread(aplicar, sizeof(float), 1, file);

    fclose(file);
    printf("\nJogo carregado com sucesso! Bem-vindo de volta, %s\n", player->nome);
    return 1; // Retorna 1 para indicar sucesso
}