# PROJECT_NEXUS_2027

```
╔══════════════════════════════════════════════════════════╗
║  PROJECT_NEXUS_2027                                      ║
║  Livro-jogo autobiográfico interativo                    ║
║  Jonathan Mesquita · São Paulo · 2026                    ║
╠══════════════════════════════════════════════════════════╣
║  ECG: 🟡 CAUTION  ·  ITERAÇÃO: 8  ·  TARGET: 2027      ║
╚══════════════════════════════════════════════════════════╝
```

## Sobre o projeto

PROJECT_NEXUS_2027 é um **livro-jogo autobiográfico interativo** construído como Web App, com design inspirado nos menus e _Files_ de **Resident Evil 3: Nemesis**, mecânicas de escolha de **Black Mirror: Bandersnatch** e uma meta-narrativa de loop temporal que mistura a vida real com ficção científica existencial.

A história começa em **16 de junho de 2026**, no quarto da casa dos pais em São Paulo — e vai até o **pedido de casamento** com Júlia Darc.

---

## Referências visuais e narrativas

| Referência | O que usar |
|---|---|
| **Resident Evil 3: Nemesis** | Menus de inventário, sistema de _Files_, cenas estáticas de encontro, ECG de status |
| **Black Mirror: Bandersnatch** | Live Selections, quebra da quarta parede, loops e multiverso |
| **Perfect Days (Wim Wenders)** | Tom introspectivo, significado dentro da rotina |
| **Estoicismo (Marco Aurélio)** | Filosofia âncora do protagonista |
| **Jazz** | Improvisação dentro da estrutura — metáfora central |

---

## Personagens

| ID | Nome | Papel |
|---|---|---|
| `jonathan` | Jonathan Mesquita | Protagonista |
| `julia` | Júlia Darc | Noiva → Esposa (2027) |
| `caetano` | Caetano Kraft | [CLASSIFICADO] |
| `mae` | Mãe | Família · Casa dos Pais |
| `pai` | Pai | Família · Casa dos Pais |
| `rodrigo` | Rodrigo | Colega de Suporte (2017) |
| `sistema` | [ SISTEMA ] | REALITY_ENGINE v3.1 |

---

## Estrutura do projeto

```
nexus2027/
├── src/
│   ├── App.tsx                    # Engine principal do jogo
│   ├── main.tsx                   # Entry point React
│   ├── components/
│   │   └── CutScene.tsx           # Cenas estáticas estilo RE3
│   ├── data/
│   │   └── characters.ts          # Todos os personagens
│   └── assets/
│       ├── sprites/               # Sprites dos personagens (PNG)
│       └── scenes/                # Imagens de background das cenas
├── public/
│   └── index.html
├── docs/
│   ├── narrative/
│   │   └── nexus2027_livro.md     # Livro completo — Volume I
│   ├── design/
│   └── sprints/
│       └── SPRINTS.md             # Planejamento de sprints
└── .github/
    └── ISSUE_TEMPLATE/
```

---

## Cenas estáticas (Estilo "Jill encontra Nemesis")

As `CutScene`s são cenas dramáticas de tela cheia, sem movimento, com texto e música. Acionadas em momentos-chave:

| ID da cena | Momento |
|---|---|
| `abertura` | O quarto, o monitor, as caixas — tela de entrada |
| `caderno_encontrado` | Encontrar o caderno preto |
| `trancamento` | LIVE SELECTION do Senac |
| `atraso_construtora` | O segundo e-mail da construtora |
| `terminal_3h14` | O monitor acende sozinho às 3:14 |
| `encontro_julia` | Primeira conversa com Júlia |
| `pedido_casamento` | 22/12/2023 — ela disse sim |
| `pedido_final` | **[DESBLOQUEADO APÓS CONCLUSÃO]** — 2027 |

Para adicionar imagem real a uma cena:
```tsx
// em src/components/CutScene.tsx
abertura: {
  backgroundImage: "/assets/scenes/quarto_noite.jpg",  // ← adicionar aqui
  ...
}
```

---

## ECG — Monitor de Estabilidade

| Status | Cor | Significado |
|---|---|---|
| 🟢 FINE | Verde | Linha temporal estável |
| 🟡 CAUTION | Âmbar | Instabilidade detectada |
| 🔴 DANGER | Vermelho | Colapso iminente |

---

## Stack técnica

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **CSS-in-JS** (inline styles — zero dependência de CSS externo)
- **Google Fonts** — Share Tech Mono (fonte mono estilo terminal)
- Deploy: **GitHub Pages** via `gh-pages`

---

## Como rodar localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/nexus2027.git
cd nexus2027

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev

# 4. Build de produção
npm run build
```

---

## Como adicionar sprites

1. Coloque a imagem em `src/assets/sprites/NOME.png`
2. Edite `src/data/characters.ts`:
```ts
jonathan: {
  imageUrl: "/assets/sprites/jonathan.png",
  portrait: "/assets/portraits/jonathan_portrait.png",
}
```
3. O componente de diálogo e o sidebar vão carregar automaticamente.

---

## Sprints

Ver [`docs/sprints/SPRINTS.md`](docs/sprints/SPRINTS.md) para o planejamento completo.

---

## Estado atual do jogo (JSON)

```json
{
  "nodeId": "quarto_pais_loop_8",
  "chapter": 1,
  "realityECG": "CAUTION",
  "inventory": ["cracha_ph3a", "caderno_preto", "email_construtora"],
  "iteration": 8,
  "targetYear": 2027
}
```

---

*PROJECT_NEXUS_2027 — Jonathan Mesquita · São Paulo · 2026*  
*"O protagonista está sempre no meio da história."*
