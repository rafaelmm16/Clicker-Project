# Clicker Project 💻

Um simples jogo de clicker desenvolvido em C para ser executado no terminal. O projeto foi criado como um exercício de programação e estruturado de forma modular para facilitar a manutenção e a adição de novas funcionalidades.

## 🚀 Funcionalidades

- **Mecânica de Clicker**: Acumule "Bits" clicando.
- **Loja de Upgrades**: Compre itens para aumentar a quantidade de Bits gerados por segundo.
- **Preços Dinâmicos**: O preço de cada upgrade aumenta a cada compra, tornando o jogo progressivamente mais desafiador.
- **Sistema de Prestígio**: Acumule pontos de prestígio (ascensão) para futuros bônus.
- **Salvar e Carregar**: O progresso do jogo é salvo automaticamente ao sair e carregado ao iniciar.
- **Nome de PC Personalizável**: Dê um nome único ao seu computador no jogo.

## 🛠️ Como Compilar e Executar

Este projeto foi desenvolvido utilizando o compilador GCC. Para compilar e executar, siga os passos abaixo.

### Pré-requisitos

**GCC**: Você precisa ter o compilador GCC instalado. No Windows, você pode usar o MinGW. No Linux ou macOS, ele geralmente já vem instalado ou pode ser obtido através do gerenciador de pacotes.

### Compilação

1. Abra um terminal na pasta raiz do projeto (onde o `main.c` está localizado).

2. Execute o seguinte comando para compilar todos os arquivos-fonte e gerar o executável:

```bash
gcc -Wall -Wextra -g3 main.c player.c ui.c shop.c game.c save_load.c -o clicker
```

### Execução

**No Windows:**
```bash
.\clicker.exe
```

**No Linux ou macOS:**
```bash
./clicker
```

## 📂 Estrutura do Projeto

O código-fonte está organizado de forma modular para melhor legibilidade e manutenção:

- `main.c`: Ponto de entrada do programa, contém o loop principal do jogo.
- `clicker.h`: Arquivo de cabeçalho principal que define as estruturas de dados globais.
- `player.c` / `player.h`: Gerencia os dados do jogador (nome, pontuação, etc.).
- `ui.c` / `ui.h`: Controla a interface do usuário, como a exibição de menus.
- `shop.c` / `shop.h`: Gerencia toda a lógica da loja de upgrades.
- `game.c` / `game.h`: Contém as lógicas centrais do jogo (o clicker, a loja, a ascensão).
- `save_load.c` / `save_load.h`: Lida com as funções de salvar e carregar o progresso do jogo.

## 🔮 Futuras Melhorias

- Implementar completamente a mecânica de ascensão/prestígio.
- Adicionar mais upgrades e conquistas.
- Melhorar a interface do usuário no terminal.