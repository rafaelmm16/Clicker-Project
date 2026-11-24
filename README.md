# Clicker Project 💻

Um jogo de clicker disponível em duas versões no mesmo repositório:
- **`web/`**: Versão web em **Next.js + TypeScript + Tailwind CSS** com estética **Retro Terminal / Cyberpunk**.
- **`C/`**: Versão original em C para terminal.

🔗 **Jogar online (GitHub Pages):** https://rafaelmm16.github.io/Clicker-Project/

## 🚀 Funcionalidades

- **Mecânica de Clicker**: Acumule "Bits" clicando (ou pressionando `0`, `1` ou `Espaço` na versão web).
- **Loja de Upgrades**: Compre 8 itens de hardware (do Disquete ao Mainframe) com preços dinâmicos (`+15%` a cada compra).
- **Sistema de Ascensão / Prestígio**: Atinja marcos de Bits para acumular pontos de prestígio pendentes e ascenda para resetar sua run em troca de um multiplicador global permanente (`+25%` por nível).
- **Conquistas e Estatísticas**: Desbloqueie 8 conquistas automaticamente e acompanhe estatísticas globais.
- **Salvar e Carregar**: Persistência em arquivo binário (`save.dat`) na versão em C e save automático via `localStorage` na versão web.
- **Nome de PC Personalizável**: Dê um nome único ao seu computador no jogo.

---

## 🌐 Versão Web (Next.js + Tailwind CSS)

### Pré-requisitos
- **Node.js 20+** e **npm**

### Executar em desenvolvimento
```bash
cd web
npm install
npm run dev
```

Depois, abra `http://localhost:3000` no navegador.

### Build estático (GitHub Pages)
```bash
cd web
npm run build
```

Os arquivos estáticos são gerados em `web/out/`.

### ☁️ Deploy no GitHub Pages

O projeto já possui deploy automático configurado via GitHub Actions em [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. No repositório do GitHub, acesse **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça `git push` para a branch `master` (ou `main`). O workflow compilará o app Next.js em modo estático com `basePath: "/Clicker-Project"` e publicará automaticamente em `https://rafaelmm16.github.io/Clicker-Project/`.

---

## 🛠️ Versão Terminal (C)

### Pré-requisitos
- **GCC** (MinGW/MSYS2 no Windows, ou pacote padrão no Linux/macOS)

### Compilação e Execução
```bash
cd C
gcc -Wall -Wextra -Wpedantic -std=c11 -g3 main.c player.c ui.c shop.c game.c save_load.c -o clicker
```

**No Windows:**
```bash
.\clicker.exe
```

**No Linux ou macOS:**
```bash
./clicker
```

---

## 📂 Estrutura do Projeto

- `.github/workflows/deploy-pages.yml`: Pipeline de build e deploy automático no GitHub Pages.
- `C/`: Código-fonte modular em C (`main.c`, `clicker.h`, `player.*`, `ui.*`, `shop.*`, `game.*`, `save_load.*`).
- `web/`: Aplicação Next.js + Tailwind CSS:
  - `web/next.config.ts`: Configuração de export estático (`output: "export"`) e `basePath` para o GitHub Pages.
  - `web/src/lib/game.ts`: Motor do jogo, regras, upgrades, conquistas e persistência.
  - `web/src/hooks/useClickerGame.ts`: Hook de estado, atalhos de teclado e notificações.
  - `web/src/components/`: Componentes da interface (`HeaderBar`, `ClickerCore`, `ShopPanel`, `AscensionPanel`, `AchievementsStatsPanel`, `ToastContainer`).
  - `web/src/app/page.tsx`: Página principal do jogo.
