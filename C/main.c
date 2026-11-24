#include "clicker.h"
#include "game.h"
#include "player.h"
#include "save_load.h"
#include "shop.h"
#include "ui.h"

int main(void) {
    setup_console();

    Player player;
    Shop shop;
    double aplicar = 0.0;
    int choose = 0;

    // Inicializa sempre jogador e loja (garante nomes e multiplicadores válidos)
    initialize_player(&player);
    initialize_shop(&shop);

    // Tenta carregar o jogo. Se não houver save válido, pede o nome do PC.
    if (load_game(&player, &shop, &aplicar)) {
        wait_for_enter();
    } else {
        set_player_name(&player);
    }

    do {
        clear_screen();
        print_main_menu();

        if (!read_int("Escolha uma opção: ", &choose)) {
            if (feof(stdin)) {
                break;
            }
            printf("\nOpção inválida!\n");
            wait_for_enter();
            continue;
        }

        switch (choose) {
            case 1:
                run_clicker(&player, &shop, aplicar);
                break;
            case 2:
                run_shop(&player, &shop, &aplicar);
                break;
            case 3:
                run_ascension(&player, &shop, &aplicar);
                break;
            case 4:
                show_stats_and_achievements(&player, &shop, aplicar);
                break;
            case 5:
                printf("Saindo sem salvar...\n");
                break;
            case 6:
                save_game(&player, &shop, aplicar);
                break;
            default:
                printf("\nOpção inválida!\n");
                wait_for_enter();
                break;
        }
    } while (choose != 5 && choose != 6);

    return 0;
}
