#ifndef SHOP_H
#define SHOP_H

#include "clicker.h"

void initialize_shop(Shop *shop);
double calculate_total_bonus(const Shop *shop);
void buy_upgrade(Player *player, Shop *shop, int upgrade_choice, double *aplicar);

#endif /* SHOP_H */
