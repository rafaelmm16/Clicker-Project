#include "shop.h"
#include <stdio.h>

void initialize_shop(Upgrades *upgrades, Multipliers *multipliers, Prices *prices) {
    // Inicializa a quantidade de cada upgrade para 0
    upgrades->disket = 0;
    upgrades->cd = 0;
    upgrades->dvd = 0;
    upgrades->pendrive = 0;
    upgrades->hd = 0;
    upgrades->ram = 0;
    upgrades->internet = 0;
    upgrades->mainfraime = 0;

    // Inicializa os multiplicadores de cada item
    multipliers->disket = 0.15;
    multipliers->cd = 0.100;
    multipliers->dvd = 0.200;
    multipliers->pendrive = 0.500;
    multipliers->hd = 1.024;      // Ajustado de 0.1024 para um valor mais impactante
    multipliers->ram = 2.048;      // Ajustado de 0.2048
    multipliers->internet = 4.096;  // Ajustado de 0.4096
    multipliers->mainfraime = 8.192; // Ajustado de 0.8192

    // Inicializa os preços base de cada item
    prices->disket = 2;
    prices->cd = 100;
    prices->dvd = 200;
    prices->pendrive = 500;
    prices->hd = 1024;
    prices->ram = 2048;
    prices->internet = 4096;
    prices->mainfraime = 8192;
}

void buy_upgrade(Player *player, Upgrades *upgrades, Multipliers *multipliers, Prices *prices, int upgrade_choice, float *aplicar) {
    // Usamos switch para tratar as diferentes opções de compra
    switch (upgrade_choice) {
        case 1: // Disket
            if (player->bitps >= prices->disket) {
                player->bitps -= prices->disket;
                upgrades->disket++;
                *aplicar += multipliers->disket;
                prices->disket *= 1.15; // Aumentar o preço para a próxima compra
                printf("\nComprou Disket! Total: %d\n", upgrades->disket);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 2: // CD
            if (player->bitps >= prices->cd) {
                player->bitps -= prices->cd;
                upgrades->cd++;
                *aplicar += multipliers->cd;
                prices->cd *= 1.15;
                printf("\nComprou CD! Total: %d\n", upgrades->cd);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 3: // DVD
            if (player->bitps >= prices->dvd) {
                player->bitps -= prices->dvd;
                upgrades->dvd++;
                *aplicar += multipliers->dvd;
                prices->dvd *= 1.15;
                printf("\nComprou DVD! Total: %d\n", upgrades->dvd);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 4: // Pendrive
            if (player->bitps >= prices->pendrive) {
                player->bitps -= prices->pendrive;
                upgrades->pendrive++;
                *aplicar += multipliers->pendrive;
                prices->pendrive *= 1.15;
                printf("\nComprou Pendrive! Total: %d\n", upgrades->pendrive);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 5: // HD
            if (player->bitps >= prices->hd) {
                player->bitps -= prices->hd;
                upgrades->hd++;
                *aplicar += multipliers->hd;
                prices->hd *= 1.15;
                printf("\nComprou HD! Total: %d\n", upgrades->hd);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 6: // Mémoria Ram
            if (player->bitps >= prices->ram) {
                player->bitps -= prices->ram;
                upgrades->ram++;
                *aplicar += multipliers->ram;
                prices->ram *= 1.15;
                printf("\nComprou Mémoria Ram! Total: %d\n", upgrades->ram);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 7: // Internet
            if (player->bitps >= prices->internet) {
                player->bitps -= prices->internet;
                upgrades->internet++;
                *aplicar += multipliers->internet;
                prices->internet *= 1.15;
                printf("\nComprou Internet! Total: %d\n", upgrades->internet);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        case 8: // Mainframe
            if (player->bitps >= prices->mainfraime) {
                player->bitps -= prices->mainfraime;
                upgrades->mainfraime++;
                *aplicar += multipliers->mainfraime;
                prices->mainfraime *= 1.15;
                printf("\nComprou Mainframe! Total: %d\n", upgrades->mainfraime);
            } else {
                printf("\nBits insuficientes!\n");
            }
            break;

        default:
            printf("\nOpção de compra inválida!\n");
            break;
    }
}