#include "game.h"
#include "player.h"
#include "shop.h"
#include "ui.h"

void run_clicker(Player *player, const Shop *shop, double aplicar) {
    int cont = 0;
    clear_screen();

    do {
        print_player_stats(player, aplicar);
        printf("\nDigite -1 para sair!\n");

        if (!read_int("\nDigite 0 ou 1: ", &cont)) {
            if (feof(stdin)) {
                break;
            }
            clear_screen();
            printf("Entrada inválida! Digite 0, 1 ou -1 para sair.\n\n");
            continue;
        }

        clear_screen();

        if (cont == 0 || cont == 1) {
            double gain = (1.0 + aplicar) * get_prestige_multiplier(player);
            player->bits += gain;
            player->total_bits_earned += gain;
            player->total_clicks++;

            while (player->bits >= player->next_asc_bits) {
                player->cont_asc++;
                player->next_asc_bits *= ASCENSION_GROWTH_RATE;
                printf(">> Você ganhou +1 ponto de prestígio pendente! (Total pendente: %d)\n",
                       player->cont_asc);
            }

            if (check_achievements(player, shop) > 0) {
                printf("\n");
            }
        } else if (cont != -1) {
            printf("Opção inválida! Digite 0, 1 ou -1 para sair.\n\n");
        }
    } while (cont != -1);
}

void run_shop(Player *player, Shop *shop, double *aplicar) {
    int comprauni = 0;
    const int exit_option = NUM_UPGRADES + 1;

    do {
        clear_screen();
        print_shop_menu(shop);
        printf("\nSeus Bits: %.2f\n", player->bits);

        if (!read_int("\nQual irá comprar (-1 ou 9 para sair): ", &comprauni)) {
            if (feof(stdin)) {
                break;
            }
            printf("\nEntrada inválida!\n");
            wait_for_enter();
            continue;
        }

        if (comprauni >= 1 && comprauni <= NUM_UPGRADES) {
            buy_upgrade(player, shop, comprauni, aplicar);
            check_achievements(player, shop);
            wait_for_enter();
        } else if (comprauni != -1 && comprauni != exit_option) {
            printf("\nOpção de compra inválida!\n");
            wait_for_enter();
        }
    } while (comprauni != -1 && comprauni != exit_option);
}

void run_ascension(Player *player, Shop *shop, double *aplicar) {
    clear_screen();

    double current_mult = get_prestige_multiplier(player);
    int new_prestige_level = player->prestige_level + player->cont_asc;
    double new_mult = 1.0 + (new_prestige_level * PRESTIGE_BONUS_PER_POINT);

    printf("================ Ascensão ================\n");
    printf("Nível de prestígio permanente: %d (Bônus atual: %.2fx)\n",
           player->prestige_level, current_mult);
    printf("Ascensões realizadas:          %d\n", player->ascension_count);
    printf("Pontos pendentes nesta run:    %d\n", player->cont_asc);
    printf("Próximo ponto pendente em:     %.0f Bits\n", player->next_asc_bits);
    printf("==========================================\n");

    if (player->cont_asc <= 0) {
        printf("\nPara ascender é necessário ter no mínimo 1 ponto de prestígio pendente.\n");
        printf("Continue clicando até atingir %.0f Bits!\n", player->next_asc_bits);
        wait_for_enter();
        return;
    }

    printf("\nAo ascender agora:\n");
    printf("- Seus Bits e upgrades da loja serão resetados.\n");
    printf("- Você ganhará +%d nível(is) de prestígio permanente.\n", player->cont_asc);
    printf("- Seu multiplicador global passará de %.2fx para %.2fx (+%.0f%% por nível)!\n",
           current_mult, new_mult, PRESTIGE_BONUS_PER_POINT * 100.0);
    printf("- Seu nome, estatísticas e conquistas serão mantidos.\n");

    int confirm = 0;
    printf("\nDeseja ascender agora?\n(1) Sim, ascender!\n(2) Não, voltar\n");
    while (!read_int("Escolha: ", &confirm) || (confirm != 1 && confirm != 2)) {
        if (feof(stdin)) {
            return;
        }
        printf("Opção inválida! Digite 1 para Sim ou 2 para Não.\n");
    }

    if (confirm == 1) {
        player->prestige_level += player->cont_asc;
        player->ascension_count++;
        player->bits = 0.0;
        player->cont_asc = 0;
        initialize_shop(shop);
        *aplicar = 0.0;

        printf("\nAscensão concluída com sucesso!\n");
        printf("Novo multiplicador global permanente: %.2fx\n\n",
               get_prestige_multiplier(player));
        check_achievements(player, shop);
        wait_for_enter();
    }
}

void show_stats_and_achievements(const Player *player, const Shop *shop, double aplicar) {
    clear_screen();

    int total_upgrades = 0;
    for (int i = 0; i < NUM_UPGRADES; i++) {
        total_upgrades += shop->items[i].quantidade;
    }

    double mult = get_prestige_multiplier(player);
    double bits_por_clique = (1.0 + aplicar) * mult;

    printf("============== Estatísticas ==============\n");
    printf("Computador:                %s\n", player->nome);
    printf("Bits atuais:               %.2f\n", player->bits);
    printf("Bits por clique:           %.3f (Base %.3f x %.2fx)\n",
           bits_por_clique, 1.0 + aplicar, mult);
    printf("Total de cliques:          %lu\n", player->total_clicks);
    printf("Total de Bits acumulados:  %.2f\n", player->total_bits_earned);
    printf("Upgrades possuídos:        %d\n", total_upgrades);
    printf("Ascensões realizadas:      %d (Prestígio permanente: %d)\n",
           player->ascension_count, player->prestige_level);
    printf("==========================================\n");

    print_achievements_list(player);
    wait_for_enter();
}
