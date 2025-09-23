#include "ui.h"
#include "clicker.h"

void clear_screen() {
    system("cls || clear");
}

void print_main_menu() {
    printf("<...> <...> <...> <...> <...> <...> <...>\n");
    printf("1 -> Cliker; \n2 -> Upgrades; \n3 -> Ascenção; \n4 -> Sair (Sem Salvar); \n5 -> Salvar e Sair.\n");
    printf("<...> <...> <...> <...> <...> <...> <...>\n");
}

void print_shop_menu(Prices *prices) {
    printf("---------- Sh@p! ----------\n");
    printf("\n(1) Disket      - Preço: %.2f\n", prices->disket);
    printf("(2) CD          - Preço: %.2f\n", prices->cd);
    printf("(3) DVD         - Preço: %.2f\n", prices->dvd);
    printf("(4) Pendrive    - Preço: %.2f\n", prices->pendrive);
    printf("(5) HD          - Preço: %.2f\n", prices->hd);
    printf("(6) Mémoria Ram - Preço: %.2f\n", prices->ram);
    printf("(7) Internet    - Preço: %.2f\n", prices->internet);
    printf("(8) Mainfraime  - Preço: %.2f\n", prices->mainfraime);
    printf("\n(9) Voltar\n");
    printf("---------------------------\n");
}

void print_player_stats(Player *player) {
    printf("%s computer.\n", player->nome);
    printf("\n%0.2f Bits\n", player->bitps);
    printf("\nPontos de prestígio: %d\n", player->cont_asc);
}