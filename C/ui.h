#ifndef UI_H
#define UI_H

#include "clicker.h"

void setup_console(void);
void clear_screen(void);
void wait_for_enter(void);
int read_int(const char *prompt, int *out_value);
void read_line(const char *prompt, char *buffer, size_t size);

void print_main_menu(void);
void print_shop_menu(const Shop *shop);
void print_player_stats(const Player *player, double bonus_por_clique);

#endif /* UI_H */
