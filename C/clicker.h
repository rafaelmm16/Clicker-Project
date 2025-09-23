#ifndef CLICKER_H
#define CLICKER_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

// Estruturas de dados
typedef struct {
    float bitps;
    char nome[64];
    int cont_asc;
} Player;

typedef struct {
    int disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
} Upgrades;

typedef struct {
    float disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
} Multipliers;

typedef struct {
    float disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
} Prices;

#endif /* CLICKER_H */