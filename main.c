//
//  main.c
//  Clicker
//
//  Created by Rafael on 12/02/20.
//  Copyright © 2020 Rafael. All rights reserved.
//

/*
 1 Byte = 8 bits

 1 kilobyte (kB ou Kbytes) = 1024 bytes

 1 megabyte (MB ou Mbytes) = 1024 kilobytes

 1 gigabyte (GB ou Gbytes) = 1024 megabytes

 1 terabyte (TB ou Tbytes) = 1024 gigabytes

 1 petabyte (PB ou Pbytes) = 1024 terabytes

 1 exabyte (EB ou Ebytes) = 1024 petabytes

 1 zettabyte (ou Zbytes) = 1024 exabytes

 1 yottabyte (ou Ybytes) = 1024 zettabytes.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

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

// Vamos lá, por enquanto fiz essas 3 structs muito parecidas
// Porem cada uma faz uma coisa

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
    system("cls || clear");
    printf("---------- Sh@p! ----------\n");
    printf("\n(1) Disket;\n(2) CD;\n(3) DVD;\n(4) Pendrive;\n(5) HD;\n(6) Mémoria Ram;\n(7) Internet;\n(8) Mainfraime;\n");
    printf("---------------------------\n");
}

int main() {

    setlocale(LC_ALL,"");

    // Implementar a opção de salvar em arquivos
    //FILE *ptr;
    bits change;
    nomebyte *str = NULL;
    comprar quantidade;
    multiplicar multi;
    vale valor;
    assinar acender;

    int cont, choose = 0;
    int changename;
    int comprauni;
    float aplicar = 0.0;

    change.again=0;
    change.bitps=0;
    acender.cont_asc=0;

    printf("\nDeseja nomear seu PC?\n");
    printf("\nSim = (1); \nNão = (2)\n");
    scanf("%d", &changename);
    if(changename == 1){

    fflush(stdin);
    printf("Pc name: ");
    fgets(change.nome, 64, stdin);
    fflush(stdin);

    }
    else
        strcpy(change.nome, "default"); // Atribuindo um texto a uma variavel de tipo char

    system("cls || clear");

    do{// Laço usado para as escolhas referentes ao menu

        menu();
        scanf("%d", &choose);
        switch (choose) {
            case 1:

                if(change.bitps>=0){ // Alocação feita para nomear o char principal
                str = malloc (6 * sizeof (nomebyte));
                    str = "Byte";

                }
                    printf("%s computer.\n", change.nome);

                    do{ // Segundo laço exclusivo para contagem do 'bits'
                        printf("\nDigite -1 para sair!\n");
                        printf("\nDigite 0 ou 1:");
                        scanf("%d", &cont);
                        system("clear || cls");

                        if(cont==1 || cont==0){
                            if(change.bitps>=100){//Verificação para que o contador da ascenção.

                                acender.cont_asc++;
                            }
                            change.bitps = change.bitps + aplicar;//Aplicação do multiplicador no contador atual.

                            change.bitps++;//Contador simples.
                            printf("\n%0.2f %s\n", change.bitps, str);
                            printf("\nPontos de prestígio: %d\n", acender.cont_asc);

                            if (change.bitps>=8){
                                    str = malloc (7 * sizeof (nomebyte));
                                    str = "Bits";
                                }
                            else
                                if(change.bitps>=1024){
                                    str = malloc (1024 * sizeof (nomebyte));
                                    str = "Mbytes";
                                }
                                else
                                    if(change.bitps>=2048){
                                        str = malloc (2048 * sizeof (nomebyte));
                                        str = "Gbytes";
                                    }
                            }

                    }while(cont!=-1);

                break;

            case 2:

                do{// Terceiro laço para a escolha de 'compras'
                    menucompras();
                    printf("\nDigite -1 para sair!\n");
                    printf("Quantidade: %0.2f", change.bitps);
                    printf("\nQual ira comprar:");
                    scanf("%d", &comprauni);

                    switch (comprauni) {
                        case 1:

                            quantidade.disket=0;
                            multi.disket=0.15;
                            valor.disket=2;
                            if(quantidade.disket>1){
                                valor.disket = (valor.disket * multi.disket) + valor.disket;
                            }
                            else
                                if(change.bitps>=valor.disket){
                                    change.bitps = change.bitps - valor.disket;
                                    quantidade.disket++;
                                    printf("\n%d Diskets\n", quantidade.disket);
                                    aplicar = quantidade.disket * multi.disket;
                                    change.bitps = change.bitps + aplicar;
                                    printf("\n%0.2f quant ", change.bitps);
                                    printf("\nValor do produto: %0.2f", valor.disket);

                              }
                            else
                            break;

                        case 2:
                            quantidade.cd = 0;
                            multi.cd = 0.100;
                            valor.cd = 100;
                            if (quantidade.cd>1){
                                valor.cd = (valor.cd * multi.cd) + valor.cd;
                            }
                            else
                              if(change.bitps>=valor.cd){
                                  change.bitps = change.bitps - valor.cd;
                                  quantidade.cd++;
                                  printf("\n%d Diskets\n", quantidade.cd);
                                  aplicar = quantidade.cd * multi.cd;
                                  change.bitps = change.bitps + aplicar;
                                  printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                            break;
                        case 3:
                            quantidade.dvd=0;
                            multi.dvd=0.200;
                            valor.dvd=200;
                            if(change.bitps>=valor.dvd){
                                change.bitps = change.bitps - valor.dvd;
                                quantidade.dvd++;
                                printf("\n%d Diskets\n", quantidade.dvd);
                                aplicar = quantidade.dvd * multi.dvd;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                            break;
                        case 4:
                            quantidade.pendrive=0;
                            multi.pendrive=0.500;
                            valor.pendrive=500;
                            if(change.bitps>=valor.pendrive){
                                change.bitps = change.bitps - valor.pendrive;
                                quantidade.pendrive++;
                                printf("\n%d Diskets\n", quantidade.pendrive);
                                aplicar = quantidade.pendrive * multi.pendrive;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                            break;
                        case 5:
                            quantidade.hd=0;
                            multi.hd=0.1024;
                            valor.hd=1024;
                            if(change.bitps>=valor.hd){
                                change.bitps = change.bitps - valor.hd;
                                quantidade.hd++;
                                printf("\n%d Diskets\n", quantidade.hd);
                                aplicar = quantidade.hd * multi.hd;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                            break;
                        case 6:
                            quantidade.ram=0;
                            multi.ram=0.2048;
                            valor.ram=2048;
                            if(change.bitps>=valor.ram){
                                change.bitps = change.bitps - valor.ram;
                                quantidade.ram++;
                                printf("\n%d Diskets\n", quantidade.ram);
                                aplicar = quantidade.ram * multi.ram;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                            break;
                        case 7:
                            quantidade.internet=0;
                            multi.internet=0.4096;
                            valor.internet=4096;
                            if(change.bitps>=valor.internet){
                                change.bitps = change.bitps - valor.internet;
                                quantidade.internet++;
                                printf("\n%d Diskets\n", quantidade.internet);
                                aplicar = quantidade.internet * multi.internet;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                              }
                            else
                                break;
                        case 8:
                            quantidade.mainfraime=0;
                            multi.mainfraime=0.8192;
                            valor.mainfraime=8192;
                            if(change.bitps>=valor.mainfraime){
                                change.bitps = change.bitps - valor.mainfraime;
                                quantidade.mainfraime++;
                                printf("\n%d Diskets\n", quantidade.mainfraime);
                                aplicar = quantidade.mainfraime * multi.mainfraime;
                                change.bitps = change.bitps + aplicar;
                                printf("\n%0.2f quant ", change.bitps);
                            }
                            else
                        default:
                            break;
                    }

                }while(comprauni!=-1);
                break;
            case 3: //Ascenção com prestígios

                printf("\nPara 'acender' é necessário ter no minímo um ponto de de pretigío.\n");
                printf("\nSeus pontos: %d\n", acender.cont_asc);



                break;
            default:
                break;
        }
    }while(choose!=4);
    return 0;
}
