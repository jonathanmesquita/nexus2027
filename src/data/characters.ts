// src/data/characters.ts
// ─────────────────────────────────────────────────────────────────────────────
// Todos os personagens do PROJECT_NEXUS_2027.
// imageUrl: null  →  usa emoji até ter sprites reais.
// imageUrl: "/assets/sprites/jonathan.png"  →  usa imagem.
// ─────────────────────────────────────────────────────────────────────────────

export interface Character {
  id:         string;
  name:       string;
  role:       string;       // descrição curta para o painel de personagens
  color:      string;       // cor do nome no diálogo
  bg:         string;       // fundo do retrato
  emoji:      string;       // fallback até ter sprite
  imageUrl:   string | null;
  portrait?:  string | null; // imagem do painel lateral (maior)
}

export const CHARACTERS: Record<string, Character> = {

  // ── PROTAGONISTA ─────────────────────────────────────────────────────────
  jonathan: {
    id:       "jonathan",
    name:     "JONATHAN",
    role:     "MESQUITA · PROTAGONISTA",
    color:    "#C8622A",
    bg:       "#120A04",
    emoji:    "🧑‍💻",
    imageUrl: null,        // → "/assets/sprites/jonathan.png"
    portrait: null,        // → "/assets/portraits/jonathan_portrait.png"
  },

  // ── JÚLIA DARC — noiva → esposa ───────────────────────────────────────────
  julia: {
    id:       "julia",
    name:     "JÚLIA",
    role:     "DARC · NOIVA → 2027",
    color:    "#A08870",
    bg:       "#100C0A",
    emoji:    "💛",
    imageUrl: null,
    portrait: null,
  },

  // ── CAETANO KRAFT — filho (futuro / personagem 2027+) ────────────────────
  caetano: {
    id:       "caetano",
    name:     "CAETANO",
    role:     "KRAFT · [CLASSIFICADO]",
    color:    "#607888",
    bg:       "#080C12",
    emoji:    "⭐",
    imageUrl: null,
    portrait: null,
  },

  // ── FAMÍLIA — pais de Jonathan ────────────────────────────────────────────
  mae: {
    id:       "mae",
    name:     "MÃE",
    role:     "FAMÍLIA · CASA DOS PAIS",
    color:    "#907060",
    bg:       "#0E0A08",
    emoji:    "👩",
    imageUrl: null,
    portrait: null,
  },

  pai: {
    id:       "pai",
    name:     "PAI",
    role:     "FAMÍLIA · CASA DOS PAIS",
    color:    "#607888",
    bg:       "#0A0C12",
    emoji:    "👨",
    imageUrl: null,
    portrait: null,
  },

  // ── RODRIGO — colega de suporte que escreveu o bilhete ───────────────────
  rodrigo: {
    id:       "rodrigo",
    name:     "RODRIGO",
    role:     "COLEGA · SUPORTE 2017",
    color:    "#7A8860",
    bg:       "#0A0C08",
    emoji:    "👤",
    imageUrl: null,
    portrait: null,
  },

  // ── SISTEMA / REALITY ENGINE ─────────────────────────────────────────────
  sistema: {
    id:       "sistema",
    name:     "[ SISTEMA ]",
    role:     "REALITY_ENGINE v3.1",
    color:    "#387A38",
    bg:       "#060E06",
    emoji:    "💻",
    imageUrl: null,
    portrait: null,
  },

};

// ── ORDEM PARA O PAINEL LATERAL (sidebar characters) ────────────────────────
// Os personagens aparecem no painel na ordem desta lista.
// Personagens "locked" ficam opacos até serem desbloqueados.
export const SIDEBAR_CHARACTERS: Array<{ id: string; locked?: boolean }> = [
  { id: "jonathan" },
  { id: "julia" },
  { id: "caetano",  locked: true },   // desbloqueado em arco futuro
  { id: "mae" },
  { id: "pai" },
  { id: "rodrigo",  locked: true },   // desbloqueado na Seção 009
];
