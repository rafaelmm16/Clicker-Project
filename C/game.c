#include "game.h"
#include "ui.h"
#include "shop.h"
#include <stdio.h>

void run_clicker(Player *player, float *aplicar) {
    int cont;
    clear_screen();
    do {
        print_player_stats(player);
        printf("\nDigite -1 para sair!\n");
        printf("\nDigite 0 ou 1:");
        scanf("%d", &cont);
        clear_screen();

        if (cont == 1 || cont == 0) {
            player->bitps += 1 + *aplicar;
            if (player->bitps >= 100) {
                player->cont_asc++;
            }
        }
    } while (cont != -1);
}

void run_shop(Player *player, Upgrades *upgrades, Multipliers *multipliers, Prices *prices, float *aplicar) {
    int comprauni;
    do {
        clear_screen();
        print_shop_menu(prices);
        printf("\nSeus Bits: %0.2f\n", player->bitps);
        printf("\nQual ira comprar (-1 para sair):");
        scanf("%d", &comprauni);
        if (comprauni > 0 && comprauni < 9) { // Adicionado verificação para evitar compra inválida
            buy_upgrade(player, upgrades, multipliers, prices, comprauni, aplicar);
            printf("\nPressione Enter para continuar...\n");
            getchar();
            getchar();
        }
    } while (comprauni != -1 && comprauni != 9); // Modificado para sair com 9 também
}

void show_ascension(Player *player) {
    clear_screen();
    printf("\nPara 'acender' é necessário ter no minímo um ponto de de pretigío.\n");
    printf("\nSeus pontos: %d\n", player->cont_asc);
    printf("\nPressione Enter para continuar...\n");
    getchar();
    getchar();
}