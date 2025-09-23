// save_load.h

#ifndef SAVE_LOAD_H
#define SAVE_LOAD_H

#include "clicker.h"

// Salva o estado atual do jogo em um arquivo binário.
void save_game(Player *player, Upgrades *upgrades, Prices *prices, float *aplicar);

// Carrega o estado do jogo de um arquivo.
// Retorna 1 se o carregamento for bem-sucedido, 0 caso contrário.
int load_game(Player *player, Upgrades *upgrades, Prices *prices, float *aplicar);

#endif /* SAVE_LOAD_H */