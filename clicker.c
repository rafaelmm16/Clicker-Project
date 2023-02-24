#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

#include "clicker.h"

typedef struct byte{

    char enter;
    float again, bitps;
    float multiplicador; //provavelmente vou utilizar na ascenção
    char nome[64];

}bits;

typedef struct acender{
    float quantidade;
    int cont_asc;
}assinar;

typedef struct compras{// Essa serve como um contador pra cada item;
    int disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
}comprar;

typedef struct multiplicador{// Cada item tem um multiplicador especifico;
    float disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
}multiplicar;

typedef struct valor{// E o valor de cada item.
    float disket, cd, dvd, pendrive, mainfraime, hd, ram, internet;
}vale;

typedef char nomebyte; // Vi q dava pra fazer isso e achei muito legal usar

void menu(){// Menu referente ao menu principal

    printf("<...> <...> <...> <...> <...> <...> <...>");
    printf("\n1 -> Cliker; \n2 -> Upgrades; \n3 -> Ascenção; \n4 -> Sair.\n");
    printf("<...> <...> <...> <...> <...> <...> <...>\n");
}
void menucompras(){// Menu referente ao shop
    //system("cls || clear");
    printf("---------- Sh@p! ----------\n");
    printf("\n(1) Disket;\n(2) CD;\n(3) DVD;\n(4) Pendrive;\n(5) HD;\n(6) Mémoria Ram;\n(7) Internet;\n(8) Mainfraime;\n");
    printf("---------------------------\n");
}