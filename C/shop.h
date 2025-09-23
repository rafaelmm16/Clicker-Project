#ifndef SHOP_H
#define SHOP_H

#include "clicker.h"

void initialize_shop(Upgrades *upgrades, Multipliers *multipliers, Prices *prices);
void buy_upgrade(Player *player, Upgrades *upgrades, Multipliers *multipliers, Prices *prices, int upgrade_choice, float *aplicar);

#endif /* SHOP_H */