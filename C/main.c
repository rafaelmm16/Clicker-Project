// main.c

#include "clicker.h"
#include "player.h"
#include "ui.h"
#include "shop.h"
#include "game.h"
#include "save_load.h"

int main() {
    setlocale(LC_ALL, "");

    Player player;
    Upgrades upgrades;
    Multipliers multipliers; // Multipliers não precisa ser salvo, pois é recalculado
    Prices prices;

    float aplicar = 0.0;
    int choose = 0;

    // Tenta carregar o jogo. Se não houver save, inicializa um novo jogo.
    if (!load_game(&player, &upgrades, &prices, &aplicar)) {
        initialize_player(&player);
        initialize_shop(&upgrades, &multipliers, &prices);
        set_player_name(&player);
    }

    do {
        clear_screen();
        print_main_menu();
        scanf("%d", &choose);

        switch (choose) {
            case 1:
                run_clicker(&player, &aplicar);
                break;
            case 2:
                run_shop(&player, &upgrades, &multipliers, &prices, &aplicar);
                break;
            case 3:
                show_ascension(&player);
                break;
            case 4:
                printf("Saindo sem salvar...\n");
                break;
            case 5:
                save_game(&player, &upgrades, &prices, &aplicar);
                break;
            default:
                printf("Opção inválida!\n");
                break;
        }
    } while (choose != 4 && choose != 5); // MODIFICADO para sair em ambas as opções

    return 0;
}