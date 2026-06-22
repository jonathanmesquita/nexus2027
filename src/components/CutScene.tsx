// src/components/CutScene.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Cenas estáticas estilo "Jill encontra Nemesis" de Resident Evil 3.
// Cada cena tem: imagem de fundo, título dramático, subtexto e botão continuar.
// Para adicionar imagem real: substitua backgroundGrad por backgroundImage.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export interface CutSceneData {
  id:              string;
  title:           string;       // ex: "O PONTO DE IGNIÇÃO"
  subtitle?:       string;       // ex: "Junho de 2026 — São Paulo"
  lines:           string[];     // texto dramático, linha a linha
  backgroundGrad:  string;       // CSS gradient até ter imagem real
  backgroundImage?: string;      // "/assets/scenes/quarto_noite.jpg"
  accentColor?:    string;       // cor do título
  continueLabel?:  string;       // texto do botão
}

// ── BANCO DE CENAS ────────────────────────────────────────────────────────────
// Adicione novas cenas aqui. A imagem final vai em backgroundImage.
export const CUTSCENES: Record<string, CutSceneData> = {

  abertura: {
    id:             "abertura",
    title:          "O PONTO DE IGNIÇÃO",
    subtitle:       "16 de junho de 2026 · São Paulo",
    lines: [
      "Um monitor. O único ponto de luz no quarto.",
      "Oito caixas de mudança encostadas na parede.",
      "O barulho do bairro que você aprendeu a bloquear",
      "há quinze anos voltou esta noite.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 30% 40%, #1A0E06 0%, #080404 60%, #030202 100%)",
    accentColor:    "#C8622A",
    continueLabel:  "[ INICIAR ]",
  },

  caderno_encontrado: {
    id:             "caderno_encontrado",
    title:          "O CADERNO PRETO",
    subtitle:       "Objeto físico · Origem desconhecida",
    lines: [
      "A capa preta tem o desgaste de anos de uso.",
      "Você não comprou esse caderno.",
      "A caligrafia na página 4 é quase a sua.",
      "Quase.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 50% 60%, #120A04 0%, #060404 70%, #030202 100%)",
    accentColor:    "#BF9C18",
    continueLabel:  "[ ABRIR O CADERNO ]",
  },

  trancamento: {
    id:             "trancamento",
    title:          "LIVE SELECTION",
    subtitle:       "SENAC_PORTAL v4.2.1 · 23:02:34",
    lines: [
      "O cursor está sobre o botão há quarenta e seis minutos.",
      "CONFIRMAR TRANCAMENTO DE MATRÍCULA.",
      "Dez palavras para pausar dois anos de intenção.",
      "O quarto espera.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 60% 30%, #060E1A 0%, #030508 60%, #020304 100%)",
    accentColor:    "#BB2E2E",
    continueLabel:  "[ DECIDIR ]",
  },

  atraso_construtora: {
    id:             "atraso_construtora",
    title:          "SEGUNDO ATRASO",
    subtitle:       "Construtora · Unidade 84B · 10 jun 2026",
    lines: [
      "\"Nova data prevista: segundo semestre de 2027.\"",
      "O casamento também é no segundo semestre de 2027.",
      "Dois eventos. Mesmo período.",
      "Sem espaço entre eles.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 40% 50%, #0A0C18 0%, #040608 65%, #020304 100%)",
    accentColor:    "#BF9C18",
    continueLabel:  "[ CONTINUAR ]",
  },

  terminal_3h14: {
    id:             "terminal_3h14",
    title:          "03:14 AM",
    subtitle:       "Monitor acendeu sozinho",
    lines: [
      "O monitor acendeu sozinho.",
      "Terminal preto. Cursor piscando.",
      "Uma linha de texto apareceu, letra por letra,",
      "como se alguém estivesse digitando do outro lado.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 50% 38%, #04060C 0%, #020408 70%, #010203 100%)",
    accentColor:    "#387038",
    continueLabel:  "[ LER A MENSAGEM ]",
  },

  encontro_julia: {
    id:             "encontro_julia",
    title:          "BOA NOITE, JÚLIA",
    subtitle:       "14 de novembro de 2021 · 22:43",
    lines: [
      "A maioria das pessoas que conheço",
      "não sabe quem é o Wim Wenders.",
      "Você sabia.",
      "A conversa durou quatro horas e dezoito minutos.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 60% 40%, #14100C 0%, #080608 60%, #040404 100%)",
    accentColor:    "#A08870",
    continueLabel:  "[ CONTINUAR ]",
  },

  pedido_casamento: {
    id:             "pedido_casamento",
    title:          "22 DE DEZEMBRO DE 2023",
    subtitle:       "Restaurante · 20:34 · São Paulo",
    lines: [
      "A fala estava preparada. Ensaiada quatro vezes.",
      "\"Parece artificial quando ensaio.\"",
      "\"Vou improvisar dentro da estrutura.\"",
      "Às 20:34 — ela disse sim.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 50% 45%, #180C06 0%, #0A0604 60%, #040302 100%)",
    accentColor:    "#C8622A",
    continueLabel:  "[ O PLANO 2027 ESTÁ ATIVO ]",
  },

  // ── CENA FINAL — O PEDIDO (desbloqueada no final do jogo) ────────────────
  pedido_final: {
    id:             "pedido_final",
    title:          "[ DESBLOQUEADO APÓS CONCLUSÃO ]",
    subtitle:       "2027 · Unidade 84B",
    lines: [
      "Esta cena ainda não foi vivida.",
      "Será desbloqueada quando acontecer.",
      "O espaço está reservado.",
      "As páginas estão em branco. Como devem estar.",
    ],
    backgroundGrad: "radial-gradient(ellipse at 50% 50%, #0A0806 0%, #060404 70%, #040302 100%)",
    accentColor:    "#2E324A",
    continueLabel:  "[ AGUARDAR 2027 ]",
  },
};

// ── COMPONENTE ────────────────────────────────────────────────────────────────

interface CutSceneProps {
  scene:   CutSceneData;
  onDone:  () => void;
}

export function CutScene({ scene, onDone }: CutSceneProps) {
  const [lineIdx,  setLineIdx]  = useState(-1);
  const [charIdx,  setCharIdx]  = useState(0);
  const [ready,    setReady]    = useState(false);
  const [titleIn,  setTitleIn]  = useState(false);

  const accent  = scene.accentColor ?? "#C8622A";
  const f       = "'Share Tech Mono', 'Courier New', monospace";

  // Title fade-in
  useEffect(() => {
    const t = setTimeout(() => setTitleIn(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Lines reveal
  useEffect(() => {
    if (!titleIn) return;
    if (lineIdx >= scene.lines.length - 1) {
      setTimeout(() => setReady(true), 600);
      return;
    }
    const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, lineIdx < 0 ? 900 : 700);
    return () => clearTimeout(t);
  }, [titleIn, lineIdx, scene.lines.length]);

  // Typewriter per line
  useEffect(() => {
    if (lineIdx < 0) return;
    const cur = scene.lines[lineIdx] ?? "";
    if (charIdx < cur.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 22);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, scene.lines]);

  const bgStyle = scene.backgroundImage
    ? { backgroundImage: `url(${scene.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: scene.backgroundGrad };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: f,
      ...bgStyle,
    }}>
      {/* CRT scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ maxWidth: 560, width: "100%", padding: "0 24px", textAlign: "center", position: "relative" }}>

        {/* Subtitle */}
        {scene.subtitle && titleIn && (
          <div style={{ fontSize: 9, color: "rgba(160,150,130,0.6)", letterSpacing: 4, marginBottom: 20, textTransform: "uppercase" }}>
            {scene.subtitle}
          </div>
        )}

        {/* Title */}
        <div style={{
          fontSize: "clamp(18px, 4vw, 32px)",
          fontWeight: "bold",
          color: titleIn ? accent : "transparent",
          letterSpacing: "0.12em",
          lineHeight: 1.2,
          marginBottom: 36,
          transition: "color 0.6s ease",
        }}>
          {scene.title}
        </div>

        {/* Ornamental divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 36 }}>
          <div style={{ flex: 1, maxWidth: 80, height: 1, background: "rgba(160,140,100,0.2)" }} />
          <div style={{ width: 5, height: 5, background: accent, transform: "rotate(45deg)", opacity: 0.7 }} />
          <div style={{ flex: 1, maxWidth: 80, height: 1, background: "rgba(160,140,100,0.2)" }} />
        </div>

        {/* Lines */}
        <div style={{ minHeight: 120, marginBottom: 48 }}>
          {scene.lines.slice(0, lineIdx).map((line, i) => (
            <p key={i} style={{ fontSize: 13, color: "rgba(196,188,164,0.7)", lineHeight: 2, margin: "0 0 4px", letterSpacing: "0.05em" }}>
              {line}
            </p>
          ))}
          {lineIdx >= 0 && lineIdx < scene.lines.length && (
            <p style={{ fontSize: 13, color: "#C4BCA4", lineHeight: 2, margin: "0 0 4px", letterSpacing: "0.05em" }}>
              {scene.lines[lineIdx].slice(0, charIdx)}
              <span style={{ animation: "blink 1s step-end infinite" }}>▋</span>
            </p>
          )}
        </div>

        {/* Continue button */}
        {ready && (
          <button
            onClick={onDone}
            style={{
              background: "transparent",
              border: `1px solid ${accent}`,
              color: accent,
              padding: "14px 32px",
              fontFamily: f,
              fontSize: 11,
              letterSpacing: 3,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = accent; (e.target as HTMLElement).style.color = "#000"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = accent; }}
          >
            {scene.continueLabel ?? "[ CONTINUAR ]"}
          </button>
        )}
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
