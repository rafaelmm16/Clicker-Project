#ifndef CLICKER_H
#define CLICKER_H

#include <locale.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PLAYER_NAME_MAX 64
#define NUM_UPGRADES 8
#define NUM_ACHIEVEMENTS 8
#define PRICE_GROWTH_RATE 1.15
#define INITIAL_ASCENSION_BITS 100.0
#define ASCENSION_GROWTH_RATE 2.0
#define PRESTIGE_BONUS_PER_POINT 0.25

enum AchievementFlag {
    ACH_FIRST_CLICK      = 1U << 0,
    ACH_FIFTY_CLICKS     = 1U << 1,
    ACH_FIRST_UPGRADE    = 1U << 2,
    ACH_TEN_UPGRADES     = 1U << 3,
    ACH_HUNDRED_BITS     = 1U << 4,
    ACH_KILOBIT          = 1U << 5,
    ACH_FIRST_ASCENSION  = 1U << 6,
    ACH_MAINFRAME_MASTER = 1U << 7
};

typedef struct {
    double bits;
    char nome[PLAYER_NAME_MAX];
    int cont_asc;              // Pontos de prestígio pendentes nesta run
    double next_asc_bits;      // Próximo marco de Bits para ganhar prestígio
    int prestige_level;        // Pontos de prestígio permanentes (já ascendidos)
    int ascension_count;       // Quantas vezes o jogador ascendeu
    unsigned long total_clicks;
    double total_bits_earned;
    uint32_t achievements;     // Bitmask de conquistas desbloqueadas
} Player;

typedef struct {
    const char *nome;
    int quantidade;
    double preco;
    double multiplicador;
} UpgradeItem;

typedef struct {
    UpgradeItem items[NUM_UPGRADES];
} Shop;

#endif /* CLICKER_H */
