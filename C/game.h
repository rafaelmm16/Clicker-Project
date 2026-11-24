#ifndef GAME_H
#define GAME_H

#include "clicker.h"

void run_clicker(Player *player, const Shop *shop, double aplicar);
void run_shop(Player *player, Shop *shop, double *aplicar);
void run_ascension(Player *player, Shop *shop, double *aplicar);
void show_stats_and_achievements(const Player *player, const Shop *shop, double aplicar);

#endif /* GAME_H */
