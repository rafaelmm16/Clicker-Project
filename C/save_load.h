#ifndef SAVE_LOAD_H
#define SAVE_LOAD_H

#include "clicker.h"

// Salva o estado atual do jogo em um arquivo binário.
// Retorna 1 em caso de sucesso, 0 caso contrário.
int save_game(const Player *player, const Shop *shop, double aplicar);

// Carrega o estado do jogo de um arquivo.
// A struct Shop deve estar inicializada previamente com initialize_shop().
// Retorna 1 se o carregamento for bem-sucedido, 0 caso contrário.
int load_game(Player *player, Shop *shop, double *aplicar);

#endif /* SAVE_LOAD_H */
