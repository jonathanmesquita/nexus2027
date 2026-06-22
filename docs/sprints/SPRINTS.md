# SPRINTS — PROJECT_NEXUS_2027

```
REALITY_ENGINE v3.1 // SPRINT_TRACKER
ECG: 🟡 CAUTION → 🟢 FINE (objetivo)
TARGET: Pedido de Casamento desbloqueado
```

---

## Sprint 0 — Setup & Foundation
**Objetivo:** Repositório no ar, projeto rodando localmente e no GitHub Pages.
**Duração estimada:** 1–2 dias

### Issues
- [ ] `#001` Criar repositório no GitHub (público ou privado)
- [ ] `#002` Configurar GitHub Pages via Actions (`npm run build` → `/dist`)
- [ ] `#003` Commit inicial com `App.tsx` (v2), `CutScene.tsx`, `characters.ts`
- [ ] `#004` Testar build em produção (verificar `base: '/nexus2027/'` no vite.config)
- [ ] `#005` Proteger branch `main` → trabalhar em branches de feature

**Branch:** `main` (inicial direto)

---

## Sprint 1 — Engine & Narrativa Base
**Objetivo:** Capítulo 1 completo e jogável no browser.
**Duração estimada:** 3–5 dias

### Issues
- [ ] `#010` Refatorar `NODES` para arquivo separado `src/data/storyNodes.ts`
- [ ] `#011` Implementar `CutScene` na abertura do jogo (antes do Boot)
- [ ] `#012` Adicionar cena `trancamento` como Live Selection com cutscene
- [ ] `#013` Adicionar cena `atraso_construtora`
- [ ] `#014` Integrar `characters.ts` na engine (substituir objeto inline)
- [ ] `#015` Adicionar personagem `rodrigo` como personagem desbloqueável
- [ ] `#016` Testar todos os caminhos do Capítulo 1 (A, B, C de cada nó)

**Branch:** `feature/sprint-1-engine`

---

## Sprint 2 — Personagens & Retratos
**Objetivo:** Sprites e retratos dos personagens principais no jogo.
**Duração estimada:** 1 semana (depende de geração/arte)

### Issues
- [ ] `#020` Definir estilo visual dos retratos (pixel art 64×64 vs ilustração 200×280)
- [ ] `#021` Arte: retrato Jonathan Mesquita (pixel art estilo RE3)
- [ ] `#022` Arte: retrato Júlia Darc
- [ ] `#023` Arte: retrato Mãe
- [ ] `#024` Arte: retrato Pai
- [ ] `#025` Arte: retrato Rodrigo (desbloqueável)
- [ ] `#026` Arte: retrato Caetano Kraft (locked — era 2027+)
- [ ] `#027` Integrar `imageUrl` em todos os personagens no `characters.ts`
- [ ] `#028` Atualizar sidebar para exibir imagem quando disponível

**Branch:** `feature/sprint-2-sprites`

**Assets esperados em:** `src/assets/sprites/` e `src/assets/portraits/`

---

## Sprint 3 — Cenas Estáticas (Estilo RE3 Nemesis)
**Objetivo:** Todas as cutscenes com imagens reais e texto dramático.
**Duração estimada:** 1 semana

### Issues
- [ ] `#030` Definir resolução padrão das cenas (recomendado: 1920×1080 ou 1280×720)
- [ ] `#031` Cena `abertura` — Jonathan no quarto escuro com monitor
- [ ] `#032` Cena `caderno_encontrado` — o caderno preto na caixa
- [ ] `#033` Cena `trancamento` — cursor sobre o botão CONFIRMAR
- [ ] `#034` Cena `atraso_construtora` — e-mail da construtora na tela
- [ ] `#035` Cena `terminal_3h14` — monitor aceso às 3:14 AM
- [ ] `#036` Cena `encontro_julia` — primeira mensagem / Wim Wenders
- [ ] `#037` Cena `pedido_casamento` — restaurante, 20:34

**Branch:** `feature/sprint-3-cutscenes`

**Assets esperados em:** `src/assets/scenes/`

---

## Sprint 4 — Sistema de Files & Inventário
**Objetivo:** Todos os 41+ files do livro integrados ao jogo.
**Duração estimada:** 3–5 dias

### Issues
- [ ] `#040` Refatorar `FILES` para `src/data/files.ts`
- [ ] `#041` Adicionar Files dos Volumes I–IX ao banco de dados
- [ ] `#042` Implementar modal de File com scroll e tipografia melhorada
- [ ] `#043` Files desbloqueáveis por progresso narrativo (não todos de uma vez)
- [ ] `#044` Indicador de novos files no sidebar

**Branch:** `feature/sprint-4-files`

---

## Sprint 5 — Família & Personagens Secundários
**Objetivo:** Integrar todos os personagens com diálogos reais.
**Duração estimada:** 3–5 dias

### Issues
- [ ] `#050` Adicionar cenas de diálogo com Mãe e Pai (Casa dos Pais)
- [ ] `#051` Desbloquear Rodrigo na Seção 009 (quando Jonathan manda foto da página 87)
- [ ] `#052` Desbloquear Caetano Kraft (gatilho a definir — pós-2027)
- [ ] `#053` Sistema de `characterUnlocks` no game state

**Branch:** `feature/sprint-5-family`

---

## Sprint 6 — Arc Final: O Pedido de Casamento
**Objetivo:** O clímax do jogo — cena equivalente ao "Jill encontra Nemesis".
**Duração estimada:** 1 semana

### Issues
- [ ] `#060` Estruturar o arco narrativo do Volume IV (Arquivos de Júlia)
- [ ] `#061` Implementar nós: do primeiro "boa noite" ao noivado
- [ ] `#062` Cena estática `pedido_casamento` com imagem real (restaurante)
- [ ] `#063` Live Selection do pedido: ["Pode falar"] → [ela disse sim]
- [ ] `#064` Desbloqueio da cena `pedido_final` (pós-2027, PENDING)
- [ ] `#065` Tela de encerramento do Volume I com mapa de todos os caminhos

**Branch:** `feature/sprint-6-proposal`

---

## Sprint 7 — Polimento & Deploy
**Objetivo:** Versão 1.0 publicada e compartilhável.

### Issues
- [ ] `#070` Responsividade mobile revisada
- [ ] `#071` Som/música ambiente (jazz loop, typewriter click) — opcional
- [ ] `#072` Meta tags OG para compartilhamento (preview no WhatsApp/Twitter)
- [ ] `#073` Domínio customizado (opcional: `nexus2027.com.br`)
- [ ] `#074` README final com screenshots

---

## Convenção de branches

```
main              ← sempre estável, deploy automático
feature/sprint-N  ← desenvolvimento por sprint
fix/ISSUE-ID      ← correções pontuais
```

## Convenção de commits

```
feat: adiciona CutScene component
fix: corrige timer da Seção 002
content: adiciona File #042 (Reality Engine log)
sprite: adiciona retrato Jonathan
scene: adiciona imagem quarto_noite
docs: atualiza SPRINTS.md
```

---

*PROJECT_NEXUS_2027 · Sprint Tracker · Jonathan Mesquita · 2026*
