#include "shop.h"

void initialize_shop(Shop *shop) {
    const UpgradeItem defaults[NUM_UPGRADES] = {
        { "Disquete",    0,    2.0,  0.100 },
        { "CD",          0,  100.0,  0.250 },
        { "DVD",         0,  200.0,  0.500 },
        { "Pendrive",    0,  500.0,  1.000 },
        { "HD",          0, 1024.0,  2.048 },
        { "Memória RAM", 0, 2048.0,  4.096 },
        { "Internet",    0, 4096.0,  8.192 },
        { "Mainframe",   0, 8192.0, 16.384 }
    };

    for (int i = 0; i < NUM_UPGRADES; i++) {
        shop->items[i] = defaults[i];
    }
}

double calculate_total_bonus(const Shop *shop) {
    double total = 0.0;
    for (int i = 0; i < NUM_UPGRADES; i++) {
        total += shop->items[i].quantidade * shop->items[i].multiplicador;
    }
    return total;
}

void buy_upgrade(Player *player, Shop *shop, int upgrade_choice, double *aplicar) {
    if (upgrade_choice < 1 || upgrade_choice > NUM_UPGRADES) {
        printf("\nOpção de compra inválida!\n");
        return;
    }

    UpgradeItem *item = &shop->items[upgrade_choice - 1];

    if (player->bits >= item->preco) {
        player->bits -= item->preco;
        item->quantidade++;
        *aplicar += item->multiplicador;
        item->preco *= PRICE_GROWTH_RATE;
        printf("\nComprou %s! Total: %d\n", item->nome, item->quantidade);
    } else {
        printf("\nBits insuficientes! Você precisa de %.2f Bits.\n", item->preco);
    }
}
