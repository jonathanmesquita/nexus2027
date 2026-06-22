# GITHUB SETUP — PROJECT_NEXUS_2027

```
> INICIALIZANDO GITHUB_SETUP.md...
> Siga os passos na ordem exata.
> Cada comando é um commit da sua história.
```

---

## PASSO 1 — Criar o repositório no GitHub

1. Acesse https://github.com/new
2. Preencha:
   - **Repository name:** `nexus2027`
   - **Description:** `PROJECT_NEXUS_2027 — Livro-jogo autobiográfico interativo`
   - **Visibility:** Public (para GitHub Pages gratuito) ou Private
   - ⚠️ **NÃO** marque "Add a README file" (já temos um)
3. Clique em **Create repository**

---

## PASSO 2 — Configurar Git localmente

Na pasta do projeto (onde está o `package.json`), rode:

```bash
# Inicializar o repositório
git init

# Configurar identidade (se ainda não fez)
git config user.name "Jonathan Mesquita"
git config user.email "seu@email.com"

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: commit inicial — PROJECT_NEXUS_2027 v0.1"

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/nexus2027.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

---

## PASSO 3 — Ativar GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Em **Source**, selecione **GitHub Actions**
3. O arquivo `.github/workflows/deploy.yml` já está configurado
4. Faça qualquer push para `main` e o deploy roda automaticamente
5. Sua URL será: `https://SEU_USUARIO.github.io/nexus2027/`

---

## PASSO 4 — Criar as Milestones (Sprints)

No GitHub, vá em **Issues → Milestones → New milestone**:

| Milestone | Título | Prazo sugerido |
|---|---|---|
| Sprint 0 | Setup & Foundation | Semana 1 |
| Sprint 1 | Engine & Narrativa Base | Semana 2–3 |
| Sprint 2 | Personagens & Retratos | Semana 4 |
| Sprint 3 | Cenas Estáticas (CutScenes) | Semana 5 |
| Sprint 4 | Files & Inventário | Semana 6 |
| Sprint 5 | Família & Personagens | Semana 7 |
| Sprint 6 | Arc Final: O Pedido | Semana 8–9 |
| Sprint 7 | Polimento & Deploy 1.0 | Semana 10 |

---

## PASSO 5 — Criar os Issues do Sprint 0

Vá em **Issues → New issue** e crie esses 5 issues, todos com **Milestone: Sprint 0**:

```
#001 — Criar repositório no GitHub
#002 — Configurar GitHub Pages via Actions
#003 — Commit inicial com App.tsx (v2), CutScene.tsx, characters.ts
#004 — Testar build em produção
#005 — Proteger branch main, trabalhar em feature branches
```

---

## PASSO 6 — Workflow de desenvolvimento

Para cada nova feature (sprite, cena, nó narrativo):

```bash
# 1. Criar branch
git checkout -b feature/sprint-2-jonathan-sprite

# 2. Fazer o trabalho
# ... editar arquivos ...

# 3. Commit
git add src/assets/sprites/jonathan.png
git commit -m "sprite: adiciona retrato Jonathan — Sprint 2 #021"

# 4. Push
git push origin feature/sprint-2-jonathan-sprite

# 5. Abrir Pull Request no GitHub
# Título: "sprite: retrato Jonathan Mesquita"
# Fecha: #021
```

---

## PASSO 7 — Adicionar sprites/imagens

```bash
# Copiar imagem para o projeto
cp ~/Downloads/jonathan_sprite.png src/assets/sprites/jonathan.png

# Commit
git add src/assets/sprites/jonathan.png
git commit -m "sprite: retrato Jonathan Mesquita (80x100px pixel art)"
git push
```

---

## Comandos úteis do dia a dia

```bash
# Ver status atual
git status

# Ver histórico
git log --oneline

# Criar branch e trocar
git checkout -b feature/nome-da-feature

# Voltar para main
git checkout main

# Atualizar local com remoto
git pull origin main

# Fechar issue no commit
git commit -m "feat: adiciona CutScene abertura — closes #011"
```

---

## URL do jogo publicado

Após o deploy do Sprint 0:
```
https://SEU_USUARIO.github.io/nexus2027/
```

---

*PROJECT_NEXUS_2027 · GitHub Setup · Jonathan Mesquita · 2026*
*"git commit -m 'first commit' — isso já é alguma coisa."*
