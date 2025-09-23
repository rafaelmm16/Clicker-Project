#ifndef GAME_H
#define GAME_H

#include "clicker.h"

void run_clicker(Player *player, float *aplicar);
void run_shop(Player *player, Upgrades *upgrades, Multipliers *multipliers, Prices *prices, float *aplicar);
void show_ascension(Player *player);

#endif /* GAME_H */