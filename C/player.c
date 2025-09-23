#include "player.h"

void initialize_player(Player *player) {
    player->bitps = 0;
    player->cont_asc = 0;
    strcpy(player->nome, "default");
}

void set_player_name(Player *player) {
    int changename;
    printf("\nDeseja nomear seu PC?\n");
    printf("\nSim = (1); \nNão = (2)\n");
    scanf("%d", &changename);
    getchar(); // Limpar o buffer do teclado

    if (changename == 1) {
        printf("Pc name: ");
        fgets(player->nome, 64, stdin);
        // Remover a nova linha do final da string
        player->nome[strcspn(player->nome, "\n")] = 0;
    }
}