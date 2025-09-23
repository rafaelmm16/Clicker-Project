// ui.h

#ifndef UI_H
#define UI_H

#include "clicker.h"

// Protótipos de função
void clear_screen();
void print_main_menu();
void print_shop_menu(Prices *prices);
void print_player_stats(Player *player);

#endif /* UI_H */