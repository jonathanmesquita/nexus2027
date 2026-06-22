# ASSETS — Guia de Sprites e Cenas

```
PROJECT_NEXUS_2027 // ASSET_TRACKER
Referência visual: Resident Evil 3: Nemesis (1999)
```

---

## Estilo visual

### Retratos de personagens (Character Files — sidebar)
Inspiração direta: os retratos de personagens do menu de RE3 (Jill, Carlos, Mikhail, Nicholai).

| Propriedade | Valor |
|---|---|
| Dimensão | 80×100px (exibição) · Source: 160×200px ou maior |
| Estilo | Pixel art OU ilustração digitalizada |
| Fundo | Escuro neutro (`#0D0D0D` a `#1A1A1A`) |
| Paleta | Deep Autumn: tons terra, marrom café, oliva, terracota |
| Formato | PNG com transparência |

**Arquivos esperados:**
- `src/assets/sprites/jonathan.png`
- `src/assets/sprites/julia.png`
- `src/assets/sprites/mae.png`
- `src/assets/sprites/pai.png`
- `src/assets/sprites/rodrigo.png`
- `src/assets/sprites/caetano.png` (locked até 2027+)

---

## Cenas estáticas (CutScenes — tela cheia)
Inspiração: as cenas de encontro de RE3 (Jill vs. Nemesis na rua, na delegacia, etc.).

| Propriedade | Valor |
|---|---|
| Dimensão | 1280×720px mínimo · 1920×1080px ideal |
| Estilo | Ilustração digital OU foto editada OU arte gerada |
| Paleta | Dark, atmosférico — monitor como única luz |
| Formato | JPG (backgrounds) |
| Filtro | Leve vinheta nas bordas; scanlines via CSS |

### Cenas por ordem de prioridade

**Prioridade 1 — Sprint 3:**
1. `quarto_noite.jpg` — Jonathan sentado, monitor ligado, caixas ao fundo
2. `caderno_preto.jpg` — Caderno preto fechado sobre superfície escura
3. `trancamento.jpg` — Close no monitor: botão CONFIRMAR em destaque
4. `terminal_3h14.jpg` — Monitor aceso no escuro, 03:14 no relógio

**Prioridade 2 — Sprint 6:**
5. `encontro_julia.jpg` — Dois celulares na escuridão (conversa noturna)
6. `pedido_casamento.jpg` — Restaurante, mesa íntima, luz quente
7. `apartamento_planta.jpg` — Planta 84B sobre mesa
8. `email_construtora.jpg` — Tela do e-mail com texto borrado

**Prioridade 3 — Sprint 6 (final):**
9. `pedido_final.jpg` — PENDING: será criada quando acontecer em 2027

---

## Paleta de cores — Deep Autumn

```
Primários:
  #C8622A  Terracota / Accent
  #C4BCA4  Creme / Texto principal
  #07080D  Preto profundo / Background

Personagens:
  Jonathan  #C8622A (terracota)
  Júlia     #A08870 (marrom rosé)
  Sistema   #387A38 (verde terminal)
  Mãe       #907060 (oliva quente)
  Pai       #607888 (azul aço)
  Rodrigo   #7A8860 (verde oliva)
  Caetano   #607888 (azul — locked)

ECG:
  FINE      #387038 (verde)
  CAUTION   #BF9C18 (âmbar)
  DANGER    #BB2E2E (vermelho)
```

---

## Fonte

**Share Tech Mono** — Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
```

Fallback: `'Courier New', monospace`

---

## Referências RE3 Nemesis

As imagens de referência estão em:
- Interface do inventário: `docs/design/re3_menu_ref.jpg`
- Cena de encontro (Jill vs Nemesis): `docs/design/re3_encounter_ref.jpg`
- Font sheet: `docs/design/re3_font.png`

---

*PROJECT_NEXUS_2027 · Asset Guide · Jonathan Mesquita · 2026*
