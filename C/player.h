#ifndef PLAYER_H
#define PLAYER_H

#include "clicker.h"

void initialize_player(Player *player);
void set_player_name(Player *player);
double get_prestige_multiplier(const Player *player);
int check_achievements(Player *player, const Shop *shop);
void print_achievements_list(const Player *player);

#endif /* PLAYER_H */
