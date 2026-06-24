// @ts-nocheck
// @ts-nocheck
import { useState, useEffect, useCallback } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PERSONAGENS — Troque imageUrl por caminho da imagem real        ║
// ║  Exemplo: imageUrl: "/assets/jonathan_portrait.png"             ║
// ╚══════════════════════════════════════════════════════════════════╝

const CHARACTERS = {
  jonathan: { name: "JONATHAN",    color: "#C8622A", bg: "#120A04", emoji: "🧑‍💻", imageUrl: null },
  julia:    { name: "JÚLIA",       color: "#A08870", bg: "#100C0A", emoji: "💛",   imageUrl: null },
  mae:      { name: "MÃE",         color: "#907060", bg: "#0E0A08", emoji: "👩",   imageUrl: null },
  pai:      { name: "PAI",         color: "#607888", bg: "#0A0C12", emoji: "👨",   imageUrl: null },
  sistema:  { name: "[ SISTEMA ]", color: "#387A38", bg: "#060E06", emoji: "💻",   imageUrl: null },
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  BACKGROUNDS — Troque style por imageUrl para imagens reais      ║
// ║  Exemplo: imageUrl: "/assets/bg_quarto_noite.jpg"               ║
// ╚══════════════════════════════════════════════════════════════════╝

const BG = {
  quarto_noite:  { grad: "radial-gradient(ellipse at 28% 42%,#1E1208 0%,#080606 55%,#040404 100%)", loc: "QUARTO DOS PAIS  ·  NOITE" },
  senac_portal:  { grad: "radial-gradient(ellipse at 62% 30%,#08101E 0%,#040810 60%,#030508 100%)", loc: "TERMINAL  ·  SENAC_PORTAL" },
  caixa_quarto:  { grad: "radial-gradient(ellipse at 42% 62%,#140E08 0%,#060506 70%,#040404 100%)", loc: "QUARTO DOS PAIS  ·  CAIXA #3" },
  loop_danger:   { grad: "radial-gradient(ellipse at 50% 50%,#180808 0%,#060404 70%,#040303 100%)", loc: "QUARTO DOS PAIS  ·  [LOOP DETECTADO]" },
  terminal_3am:  { grad: "radial-gradient(ellipse at 50% 38%,#06080E 0%,#030508 70%,#020406 100%)", loc: "QUARTO DOS PAIS  ·  03:14" },
  default:       { grad: "linear-gradient(180deg,#060608 0%,#040406 100%)",                         loc: "" },
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  DADOS DA HISTÓRIA                                               ║
// ╚══════════════════════════════════════════════════════════════════╝

const FILES = {
  1: {
    title: "FILE #01 // Diário do Analista",
    date:  "DATA: JUNHO 2026",
    body: `Junho de 2026. Voltei para o quarto onde cresci.\n\nÉ estranho ver as minhas caixas empilhadas aqui de novo. A faculdade de Banco de Dados está pausada. A Júlia diz que vai dar tudo certo, que 2027 é logo ali — mas sinto que entrei num loop que não consigo fechar.\n\nO caderno estava no fundo da caixa. Eu nem me lembro de ter guardado isso.`,
  },
  2: {
    title: "FILE #02 // Log do Sistema — SENAC_PORTAL",
    date:  "16 JUN 2026 // 19:30:47",
    body: `[SYSTEM LOG] SENAC_PORTAL v4.2.1\n─────────────────────────────────────────\n[ERROR] SQL Error: Syntax error in 'Reality_Engine'\nnear line '2027'.\n\nVariable 'STUDENT_STATUS'     → PAUSED\nVariable 'TIMELINE_INTEGRITY' → 98.3% ↓ 71.2%\n\nWarning: Destructive timeline split detected.\n\n[WARNING] Unresolved var : APARTAMENTO_2027\n[WARNING] Foreign key conflict:\n          JULIA_DARC ↔ CASAMENTO_2027\n─────────────────────────────────────────\nProceed with CONFIRM_TRANCAMENTO? [Y/N]: _`,
  },
};

const ITEMS = {
  cracha_ph3a:       { icon: "🪪", label: "Crachá PH3A",       desc: "Analista de suporte. Parece de outra vida." },
  caderno_preto:     { icon: "📓", label: "Caderno Preto",      desc: "Caligrafia da p.4 não é exatamente a sua." },
  email_construtora: { icon: "📧", label: "E-mail Construtora", desc: "Entrega: 2º semestre de 2027." },
};

const NODES = {
  inicio: {
    ecg:"FINE", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"quarto_noite",
    text:[
      "O monitor é a única fonte de luz.",
      "Você reconhece esse quarto — cada rachadura no teto, o cheiro de madeira velha. Mas hoje ele parece menor. As caixas de mudança dizem o que você não quer dizer.",
      "Você voltou.",
      "Na tela: portal do SENAC com cursor sobre CONFIRMAR TRANCAMENTO — e o e-mail da construtora com o segundo atraso.",
      "Há uma caixa no chão, a única que você não lacrou. Pela abertura: um caderno de capa preta que não deveria estar ali.",
    ],
    dialogue:[
      { char:"mae",      text:"Jonathan? A cama tá feita. Jantou?" },
      { char:"jonathan", text:"Ainda não, mãe. Deixa eu organizar mais um pouco." },
      { char:"mae",      text:"As caixas não vão a lugar nenhum. Descansa." },
      { char:"jonathan", text:"Já vou. Obrigado, mãe." },
      { char:"sistema",  text:"[ Passos no corredor. Porta se fechando. Silêncio. ]" },
      { char:"jonathan", text:"Oito caixas. É o que coube." },
    ],
    choices:[
      { id:"A", text:"Abrir o e-mail da construtora",   hint:"Dados concretos. Enfrenta o atraso.",   to:"email_aberto",       item:"email_construtora" },
      { id:"B", text:"Clicar em CONFIRMAR TRANCAMENTO", hint:"A decisão que muda a variável.",         to:"live_senac",         live:true },
      { id:"C", text:"Pegar o caderno na caixa",        hint:"Algo não está certo com esse caderno.", to:"caderno_encontrado", item:"caderno_preto", file:1 },
    ],
  },

  email_aberto: {
    ecg:"FINE", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"senac_portal",
    text:[
      "O e-mail carrega a logo azul da construtora.",
      "\"Informamos que o prazo de entrega da Unidade 84B foi revisado. Nova data: segundo semestre de 2027.\"",
      "Você fecha. Abre de novo. Lê a segunda linha outra vez.",
      "O casamento é em 2027. O apartamento era para ser antes do casamento.",
    ],
    dialogue:[
      { char:"jonathan", text:"Segundo semestre de 2027." },
      { char:"jonathan", text:"O casamento é no segundo semestre." },
      { char:"sistema",  text:"[ Dois eventos. Mesmo período. Sem espaço entre eles. ]" },
      { char:"jonathan", text:"A Júlia vai entender." },
      { char:"jonathan", text:"...ela vai entender." },
    ],
    choices:[
      { id:"A", text:"Ir para o portal do SENAC", hint:"Talvez trancar agora faça sentido.", to:"live_senac",         live:true },
      { id:"B", text:"Olhar a caixa no chão",     hint:"O caderno ainda está lá.",          to:"caderno_encontrado", item:"caderno_preto", file:1 },
    ],
  },

  caderno_encontrado: {
    ecg:"CAUTION", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"caixa_quarto", file:1,
    text:[
      "A capa do caderno está intacta. Preta, textura de couro. Você não se lembra de ter comprado isso.",
      "Primeira página. Em branco. Segunda. Terceira.",
      "Na quarta — uma linha à mão com caligrafia que não é exatamente a sua, mas quase:",
      "\"Junho de 2026. Voltei para o quarto onde cresci. O loop começou aqui.\"",
    ],
    dialogue:[
      { char:"jonathan", text:"Não comprei esse caderno." },
      { char:"jonathan", text:"Essa letra é quase a minha. Quase." },
      { char:"jonathan", text:"\"O loop começou aqui.\" Que loop?" },
      { char:"sistema",  text:"[ O cooler do PC aumenta de velocidade. ECG: CAUTION. ]" },
    ],
    choices:[
      { id:"A", text:"Continuar lendo o caderno",      hint:"Há mais páginas.",  to:"caderno_paginas" },
      { id:"B", text:"Fechar o caderno e ir ao SENAC", hint:"Não. Foco.",        to:"live_senac", live:true },
    ],
  },

  caderno_paginas: {
    ecg:"CAUTION", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"caixa_quarto",
    text:[
      "As páginas seguintes alternam entre texto e código.",
      "Entrada de dezembro de 2025: \"A Júlia disse que 2027 é nosso ano. Não disse que tenho medo de que o apartamento seja uma metáfora.\"",
      "Depois, uma entrada sem data:",
      "{ nodeId: 'quarto_pais_loop_3', realityECG: 'DANGER', juliaAffection: 67 }",
    ],
    dialogue:[
      { char:"jonathan", text:"JSON. Dentro de um caderno físico." },
      { char:"jonathan", text:"Isso não é possível." },
      { char:"sistema",  text:"Iteração 3. juliaAffection: 67. Registrado." },
      { char:"jonathan", text:"Quem está escrevendo isso?" },
      { char:"sistema",  text:"[ Nenhuma resposta. O cursor do PC pisca no escuro. ]" },
    ],
    choices:[
      { id:"→", text:"Ir ao portal do SENAC", hint:"Você precisa sair daqui. Agora.", to:"live_senac", live:true },
    ],
  },

  live_senac: {
    ecg:"CAUTION", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"senac_portal", live:true,
    text:[
      "O portal do SENAC pulsa na tela.",
      "CONFIRMAR TRANCAMENTO DE MATRÍCULA.",
      "Nome, CPF, justificativa: \"Motivos pessoais e financeiros.\" Dez palavras para pausar dois anos de intenção.",
      "O cursor paira sobre o botão.",
      "Alguém na casa tosse. O relógio avança um segundo.",
    ],
    liveChoices:[
      { id:"A", text:"CONFIRMAR TRANCAMENTO", hint:"Aceitar a pausa. Reorganizar para 2027.", to:"pos_a", ecg:"CAUTION" },
      { id:"B", text:"FECHAR A ABA",           hint:"Recusar. Mesmo sem saber como pagar.",  to:"pos_b", ecg:"DANGER"  },
    ],
  },

  pos_a: {
    ecg:"CAUTION", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"senac_portal", file:2,
    text:[
      "Você clica.",
      "SOLICITAÇÃO DE TRANCAMENTO REGISTRADA COM SUCESSO.",
      "Uma notificação aparece — um pop-up que você não reconhece:",
      "[ SISTEMA ] Variable 'STUDENT_STATUS' → PAUSED. Timeline integrity: 71.2%.",
    ],
    dialogue:[
      { char:"sistema",  text:"Variable 'TIMELINE_INTEGRITY' → 71.2%." },
      { char:"sistema",  text:"Destructive timeline split registered." },
      { char:"jonathan", text:"Isso não é um sistema do Senac." },
      { char:"sistema",  text:"Não." },
      { char:"jonathan", text:"Então o que é?" },
      { char:"sistema",  text:"[ O pop-up fecha sozinho. ]" },
    ],
    choices:[
      { id:"→", text:"Investigar o pop-up", hint:"De onde veio isso?", to:"fim" },
    ],
  },

  pos_b: {
    ecg:"DANGER", chapter:"CAPÍTULO 1 // O PONTO DE IGNIÇÃO", bg:"loop_danger", file:2,
    text:[
      "Você fecha a aba.",
      "A tela pisca. Não foi você.",
      "A aba do SENAC está aberta de novo. Cursor sobre o botão vermelho.",
      "Você fecha de novo. A tela pisca. A aba reabre.",
    ],
    dialogue:[
      { char:"jonathan", text:"Por que a aba reabre?" },
      { char:"sistema",  text:"Porque você ainda não escolheu de verdade." },
      { char:"jonathan", text:"Eu fechei a aba." },
      { char:"sistema",  text:"Fechar não é o mesmo que decidir." },
      { char:"jonathan", text:"..." },
      { char:"sistema",  text:"[ ECG: DANGER. Você está num loop. ]" },
    ],
    choices:[
      { id:"→", text:"Desligar o monitor à força", hint:"Sair pela força bruta.", to:"fim" },
    ],
  },

  fim: {
    ecg:null, chapter:"FIM DO CAPÍTULO 1", bg:"terminal_3am", ending:true,
    text:[
      "O quarto da casa dos pais nunca foi só um quarto.",
      "É um nó. Um ponto onde várias linhas se cruzam.",
      "Você vai dormir.",
      "Às 3:14 da manhã, o monitor acende sozinho.",
    ],
    dialogue:[
      { char:"sistema",  text:"Olá, Jonathan." },
      { char:"jonathan", text:"Quem é você?" },
      { char:"sistema",  text:"Alguém que está acompanhando." },
      { char:"jonathan", text:"Acompanhando o quê?" },
      { char:"sistema",  text:"A iteração. Esta é a oitava." },
      { char:"jonathan", text:"O que aconteceu nas sete anteriores?" },
      { char:"sistema",  text:"Você chegou até aqui. Sempre chega até aqui." },
      { char:"sistema",  text:"A diferença desta vez é que você está começando a ver o sistema." },
      { char:"jonathan", text:"E isso é bom ou ruim?" },
      { char:"sistema",  text:"É necessário." },
    ],
    choices:[
      { id:"↺", text:"REINICIAR DO INÍCIO", hint:"Os loops são intencionais.", to:"inicio" },
    ],
  },
};

// ╔══════════════════════════════════════════╗
// ║  UI COMPONENTS                           ║
// ╚══════════════════════════════════════════╝

const C = {
  bg:"#07080D", panel:"#0C0D16", cell:"#0F1020",
  border:"#1A1C2C", border2:"#252738",
  text:"#C4BCA4", dim:"#5C5848", ghost:"#1A1C22",
  accent:"#C8622A", FINE:"#387038", CAUTION:"#BF9C18", DANGER:"#BB2E2E", PENDING:"#2E3240",
};

function Portrait({ charId, size = 72 }) {
  const ch = CHARACTERS[charId];
  if (!ch) return null;
  const h = Math.round(size * 1.2);
  return (
    <div style={{
      width:size, height:h, flexShrink:0,
      background: ch.imageUrl ? "transparent" : `linear-gradient(160deg,${ch.bg} 0%,#030408 100%)`,
      border:`1px solid ${ch.color}55`,
      outline:`1px solid ${ch.color}18`, outlineOffset:2,
      display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden", position:"relative",
    }}>
      {ch.imageUrl
        ? <img src={ch.imageUrl} alt={ch.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        : <span style={{ fontSize:size * 0.42 }}>{ch.emoji}</span>
      }
      {/* scanline overlay on portrait */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 3px)", pointerEvents:"none" }} />
    </div>
  );
}

function ECGLine({ status }) {
  const color = { FINE:C.FINE, CAUTION:C.CAUTION, DANGER:C.DANGER }[status] ?? C.FINE;
  const d = {
    FINE:   "M0,18 L13,18 L17,5 L21,31 L25,18 L60,18",
    CAUTION:"M0,18 L8,18 L12,4 L16,32 L20,18 L25,4 L29,32 L33,18 L60,18",
    DANGER: "M0,18 L5,18 L8,2 L11,34 L14,18 L17,2 L20,34 L23,18 L26,2 L29,34 L32,18 L35,2 L38,34 L41,18 L60,18",
  }[status] ?? "M0,18 L60,18";
  return (
    <svg width="100%" height="36" viewBox="0 0 60 36" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const seq = [
    "> INITIALIZING REALITY_ENGINE v3.1...",
    "> Loading agent: JONATHAN_MESQUITA.exe",
    "> Checking timeline integrity...",
    "> ECG: \uD83D\uDFE1 CAUTION",
    "> Loading dialogue system...",
    "> [████████████████████] 100%",
    "> SYSTEM READY.",
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines(p => [...p, seq[i++]]);
      if (i >= seq.length) clearInterval(t);
    }, 290);
    return () => clearInterval(t);
  }, []);
  const ready = lines.length >= seq.length;
  return (
    <div onClick={ready ? onDone : undefined} style={{ background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Courier New',monospace", cursor:ready?"pointer":"default" }}>
      <div style={{ maxWidth:440, width:"100%" }}>
        <div style={{ color:C.accent, fontSize:17, letterSpacing:4, marginBottom:28, fontWeight:"bold" }}>PROJECT_NEXUS_2027</div>
        {lines.map((l,i) => <div key={i} style={{ fontSize:11, color:i===lines.length-1?C.text:C.dim, lineHeight:1.9, letterSpacing:1 }}>{l}</div>)}
        {ready && <div onClick={onDone} style={{ display:"inline-block", marginTop:32, border:`1px solid ${C.accent}`, color:C.accent, padding:"12px 28px", fontSize:12, letterSpacing:3, cursor:"pointer" }}>[ INICIAR ]</div>}
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════╗
// ║  DIALOGUE BOX — estilo RE3 Nemesis       ║
// ╚══════════════════════════════════════════╝

function DialogueBox({ charId, text, chars, lineDone, isLast, onAdvance }) {
  const ch = CHARACTERS[charId] ?? CHARACTERS.sistema;
  const displayed = text.slice(0, chars);
  return (
    <div onClick={onAdvance} style={{
      background:"rgba(6,7,12,0.97)",
      borderTop:`2px solid ${C.border2}`,
      borderBottom:`1px solid #0A0B12`,
      padding:"14px 18px 14px 16px",
      display:"flex", gap:14, alignItems:"flex-start",
      cursor:"pointer", fontFamily:"'Courier New',monospace",
      minHeight:96,
    }}>
      {/* Portrait */}
      <Portrait charId={charId} size={58} />

      {/* Text block */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:9, color:ch.color, letterSpacing:3, marginBottom:8, fontWeight:"bold" }}>{ch.name}</div>
        <p style={{ fontSize:13, color:C.text, lineHeight:1.85, margin:0, minHeight:38 }}>
          {displayed}
          {!lineDone && <span style={{ animation:"blink 1s step-end infinite" }}>▋</span>}
        </p>
      </div>

      {/* Advance indicator */}
      <div style={{ alignSelf:"flex-end", paddingBottom:2, minWidth:16, textAlign:"right" }}>
        {lineDone && (
          <span style={{ color:C.dim, fontSize:14, animation:"blink 0.75s step-end infinite" }}>
            {isLast ? "►" : "▼"}
          </span>
        )}
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════╗
// ║  ENGINE PRINCIPAL                        ║
// ╚══════════════════════════════════════════╝

export default function App() {
  const [screen,    setScreen]    = useState("boot");
  const [nodeId,    setNodeId]    = useState("inicio");
  const [ecg,       setEcg]       = useState("FINE");
  const [inv,       setInv]       = useState(["cracha_ph3a"]);
  const [files,     setFiles]     = useState([]);
  // Narration
  const [revealed,  setRevealed]  = useState(0);
  const [chars,     setChars]     = useState(0);
  const [textDone,  setTextDone]  = useState(false);
  // Dialogue
  const [dlgIdx,    setDlgIdx]    = useState(-1);
  const [dlgChars,  setDlgChars]  = useState(0);
  const [dlgLine,   setDlgLine]   = useState(false);
  const [dlgDone,   setDlgDone]   = useState(false);
  // UI
  const [liveOn,    setLiveOn]    = useState(false);
  const [flash,     setFlash]     = useState(false);
  const [fileOpen,  setFileOpen]  = useState(null);
  const [notice,    setNotice]    = useState(null);
  const [sidebar,   setSidebar]   = useState(false);
  const [isMobile,  setMobile]    = useState(() => typeof window!=="undefined" ? window.innerWidth<700 : false);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 700);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const node   = NODES[nodeId];
  const paras  = node.text;
  const dlgLines = node.dialogue ?? [];

  // Navigate
  const go = useCallback((choice) => {
    const next = NODES[choice.to];
    if (!next) return;
    if (choice.ecg)            setEcg(choice.ecg);
    else if (next.ecg != null) setEcg(next.ecg);
    if (choice.item) setInv(p => p.includes(choice.item) ? p : [...p, choice.item]);
    const fid = choice.file ?? next.file;
    if (fid) setFiles(p => {
      if (p.includes(fid)) return p;
      setNotice(`⚠  FILE #0${fid} DESBLOQUEADO`);
      setTimeout(() => setNotice(null), 3000);
      return [...p, fid];
    });
    setNodeId(choice.to);
    setRevealed(0); setChars(0); setTextDone(false);
    setDlgIdx(-1);  setDlgChars(0); setDlgLine(false); setDlgDone(false);
    setLiveOn(false); setFlash(false); setSidebar(false);
  }, []);

  // Narration typewriter
  useEffect(() => {
    if (screen !== "game" || textDone) return;
    if (revealed >= paras.length) {
      setTextDone(true);
      return;
    }
    const cur = paras[revealed];
    if (chars < cur.length) {
      const t = setTimeout(() => setChars(c => c + 1), 16);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setRevealed(r => r + 1); setChars(0); }, 160);
    return () => clearTimeout(t);
  }, [screen, textDone, revealed, chars, paras]);

  // Start dialogue after narration
  useEffect(() => {
    if (!textDone) return;
    if (dlgLines.length > 0) { setDlgIdx(0); setDlgChars(0); setDlgLine(false); }
    else if (node.live) setTimeout(() => setLiveOn(true), 900);
  }, [textDone]);

  // Dialogue typewriter
  useEffect(() => {
    if (dlgIdx < 0 || dlgDone) return;
    if (dlgIdx >= dlgLines.length) {
      setDlgDone(true);
      if (node.live) setTimeout(() => setLiveOn(true), 900);
      return;
    }
    const cur = dlgLines[dlgIdx].text;
    if (dlgChars < cur.length) {
      const t = setTimeout(() => setDlgChars(c => c + 1), 19);
      return () => clearTimeout(t);
    }
    setDlgLine(true);
  }, [dlgIdx, dlgChars, dlgDone, dlgLines, node]);

  // Advance dialogue on click
  const advanceDlg = useCallback(() => {
    if (dlgDone) return;
    const cur = dlgLines[dlgIdx];
    if (!cur) return;
    if (!dlgLine) { setDlgChars(cur.text.length); setDlgLine(true); return; }
    if (dlgIdx + 1 >= dlgLines.length) {
      setDlgDone(true);
      if (node.live) setTimeout(() => setLiveOn(true), 900);
    } else {
      setDlgIdx(i => i + 1); setDlgChars(0); setDlgLine(false);
    }
  }, [dlgIdx, dlgLine, dlgDone, dlgLines, node]);

  // Skip narration
  const skipText = useCallback(() => {
    if (textDone) return;
    setRevealed(paras.length); setChars(0); setTextDone(true);
  }, [textDone, paras]);

  // Live flash
  useEffect(() => {
    if (!liveOn) return;
    const t = setInterval(() => setFlash(f => !f), 220);
    return () => clearInterval(t);
  }, [liveOn]);

  if (screen === "boot") return <Boot onDone={() => setScreen("game")} />;

  const ecgColor = { FINE:C.FINE, CAUTION:C.CAUTION, DANGER:C.DANGER }[ecg] ?? C.FINE;
  const ecgLabel = { FINE:"🟢 FINE", CAUTION:"🟡 CAUTION", DANGER:"🔴 DANGER" }[ecg];
  const ecgDesc  = { FINE:"Linha temporal estável", CAUTION:"Instabilidade detectada", DANGER:"Colapso iminente" }[ecg];
  const bgInfo   = BG[node.bg] ?? BG.default;
  const inDialogue = dlgIdx >= 0 && !dlgDone;
  const showChoices = (dlgLines.length > 0 ? dlgDone : textDone) && !node.live;

  // SIDEBAR COMPONENT
  const Sidebar = () => (
    <div style={{ width:isMobile?"100%":215, flexShrink:0, fontFamily:"'Courier New',monospace" }}>
      {/* ECG */}
      <div style={{ background:"#08090F", border:`1px solid ${C.border}`, marginBottom:3 }}>
        <div style={{ padding:"5px 10px", background:"#0D0F1C", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9, color:"#7890B0", letterSpacing:3 }}>MONITOR DE STATUS</span>
        </div>
        <div style={{ padding:"10px 14px" }}>
          <ECGLine status={ecg} />
          <div style={{ fontSize:11, color:ecgColor, fontWeight:"bold", marginTop:6, letterSpacing:1 }}>{ecgLabel}</div>
          <div style={{ fontSize:9, color:C.dim, marginTop:3 }}>{ecgDesc}</div>
        </div>
      </div>
      {/* Equip slot */}
      <div style={{ background:"#08090F", border:`1px solid ${C.border}`, marginBottom:3 }}>
        <div style={{ padding:"5px 10px", background:"#0D0F1C", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9, color:"#7890B0", letterSpacing:3 }}>EQUIP</span>
        </div>
        <div style={{ padding:"10px 12px" }}>
          {(() => { const it = inv[inv.length-1] ? ITEMS[inv[inv.length-1]] : null;
            return (
              <div style={{ background:"#0A0C1E", border:`1px solid #18203A`, padding:"8px 10px", display:"flex", gap:10, alignItems:"center", minHeight:46 }}>
                <span style={{ fontSize:20 }}>{it ? it.icon : "░"}</span>
                <div>
                  <div style={{ fontSize:11, color:it?C.text:C.ghost, letterSpacing:1 }}>{it ? it.label : "——"}</div>
                  {it && <div style={{ fontSize:9, color:"#404858", marginTop:1 }}>{it.desc}</div>}
                </div>
              </div>
            );
          })()}
          {/* Condition bar */}
          <div style={{ marginTop:8 }}>
            <div style={{ fontSize:9, color:"#404858", letterSpacing:2, marginBottom:4 }}>condition</div>
            <div style={{ background:"#060810", border:`1px solid ${C.border}`, height:7, overflow:"hidden" }}>
              <div style={{ height:"100%", width:ecg==="FINE"?"85%":ecg==="CAUTION"?"50%":"20%", background:ecgColor, transition:"width .6s ease,background .6s ease" }} />
            </div>
            <div style={{ display:"flex", gap:8, marginTop:5 }}>
              {["FINE","CAUTION","DANGER"].map(s => (
                <span key={s} style={{ fontSize:8, letterSpacing:1, color:ecg===s?{FINE:C.FINE,CAUTION:C.CAUTION,DANGER:C.DANGER}[s]:"#1E2030", fontWeight:ecg===s?"bold":"normal" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Inventory */}
      <div style={{ background:"#08090F", border:`1px solid ${C.border}`, marginBottom:3 }}>
        <div style={{ padding:"5px 10px", background:"#0D0F1C", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:9, color:"#7890B0", letterSpacing:3 }}>INVENTÁRIO</span>
          <span style={{ fontSize:9, color:"#303848" }}>{inv.length}/8</span>
        </div>
        <div style={{ padding:"8px 10px", display:"flex", flexDirection:"column", gap:3 }}>
          {Array.from({ length:Math.max(4,inv.length) }).map((_,i) => {
            const it = inv[i] ? ITEMS[inv[i]] : null;
            return (
              <div key={i} title={it?.desc} style={{ background:it?"#0C0E1E":"#09090F", border:`1px solid ${it?"#1A1E30":"#101018"}`, padding:"6px 8px", display:"flex", gap:7, alignItems:"center" }}>
                <div style={{ width:22, height:22, background:it?"#101428":"#0A0A14", border:`1px solid ${it?"#1E2440":"#121218"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>
                  {it ? it.icon : <span style={{ color:"#181820", fontSize:9 }}>░</span>}
                </div>
                <span style={{ fontSize:10, color:it?C.text:C.ghost, letterSpacing:1 }}>{it ? it.label : "——"}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Files */}
      <div style={{ background:"#08090F", border:`1px solid ${C.border}`, marginBottom:3 }}>
        <div style={{ padding:"5px 10px", background:"#0D0F1C", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:9, color:"#7890B0", letterSpacing:3 }}>FILES</span>
          <span style={{ fontSize:9, color:"#303848" }}>{files.length}/2</span>
        </div>
        <div style={{ padding:"8px 10px", display:"flex", flexDirection:"column", gap:3 }}>
          {[1,2].map(fid => {
            const ok = files.includes(fid);
            return (
              <div key={fid} onClick={() => ok && setFileOpen(fid)} style={{ background:ok?"#0C0E1E":"#09090F", border:`1px solid ${ok?"#1A1E30":"#101018"}`, padding:"6px 8px", display:"flex", gap:7, alignItems:"center", cursor:ok?"pointer":"default" }}>
                <div style={{ width:22, height:22, background:ok?"#101428":"#0A0A14", border:`1px solid ${ok?"#1E2440":"#121218"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>
                  {ok ? "📄" : <span style={{ color:"#181820" }}>🔒</span>}
                </div>
                <div>
                  <div style={{ fontSize:10, color:ok?C.accent:C.ghost, letterSpacing:1 }}>FILE #{String(fid).padStart(2,"0")}</div>
                  {!ok && <div style={{ fontSize:8, color:"#181820" }}>BLOQUEADO</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Characters */}
      <div style={{ background:"#08090F", border:`1px solid ${C.border}` }}>
        <div style={{ padding:"5px 10px", background:"#0D0F1C", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9, color:"#7890B0", letterSpacing:3 }}>STATUS</span>
        </div>
        <div style={{ padding:"8px 10px", display:"flex", flexDirection:"column", gap:6 }}>
          {[["jonathan","JONATHAN","MESQUITA · 31"],["julia","JÚLIA","DARC · 2027 ↗"]].map(([id,n,sub]) => {
            const ch = CHARACTERS[id];
            return (
              <div key={id} style={{ display:"flex", gap:8, alignItems:"center" }}>
                <Portrait charId={id} size={34} />
                <div>
                  <div style={{ fontSize:10, color:id==="julia"?"#707880":C.text, fontWeight:"bold", letterSpacing:2 }}>{n}</div>
                  <div style={{ fontSize:8, color:id==="julia"?"#2A3040":"#405060", letterSpacing:1, marginTop:1 }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, padding:"5px 10px", display:"flex", gap:8 }}>
          {["FILE","MAP","EXIT","AUTO"].map(l => <span key={l} style={{ fontSize:7, color:C.ghost, letterSpacing:2 }}>{l}</span>)}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Courier New',monospace", color:C.text }}>

      {/* CRT scanlines */}
      <div style={{ position:"fixed", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.09) 3px,rgba(0,0,0,0.09) 4px)", pointerEvents:"none", zIndex:99 }} />

      {/* Toast */}
      {notice && (
        <div style={{ position:"fixed", top:14, left:"50%", transform:"translateX(-50%)", background:C.accent, color:"#000", padding:"7px 18px", fontSize:11, fontWeight:"bold", letterSpacing:2, zIndex:200, whiteSpace:"nowrap" }}>
          {notice}
        </div>
      )}

      {/* Live Selection */}
      {liveOn && (
        <div style={{ position:"fixed", inset:0, zIndex:150, background:flash?"#090707":"#100E0E", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Courier New',monospace" }}>
          <div style={{ maxWidth:460, width:"100%", textAlign:"center" }}>
            <div style={{ color:C.DANGER, fontSize:9, letterSpacing:5, marginBottom:6 }}>⚡ LIVE SELECTION</div>
            <div style={{ width:28, height:1, background:C.DANGER, margin:"6px auto 20px" }} />
            {paras.slice(-2).map((p,i) => <p key={i} style={{ color:"#6A6258", fontSize:13, lineHeight:1.9, marginBottom:8 }}>{p}</p>)}
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:28 }}>
              {node.liveChoices.map(ch => (
                <button key={ch.id} onClick={() => go(ch)} style={{ background:"transparent", border:`1px solid ${ch.id==="A"?C.FINE:C.DANGER}`, color:ch.id==="A"?C.FINE:C.DANGER, padding:"16px 22px", fontFamily:"'Courier New',monospace", fontSize:12, letterSpacing:1, cursor:"pointer", textAlign:"left" }}>
                  <div style={{ fontWeight:"bold", marginBottom:3 }}>[{ch.id}] {ch.text}</div>
                  <div style={{ fontSize:10, opacity:.6 }}>{ch.hint}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* File Modal */}
      {fileOpen && (
        <div onClick={() => setFileOpen(null)} style={{ position:"fixed", inset:0, zIndex:140, background:"rgba(0,0,0,0.93)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#0D0D0D", border:`1px solid ${C.border2}`, maxWidth:460, width:"100%", padding:24, maxHeight:"80vh", overflowY:"auto" }}>
            <div style={{ color:C.accent, fontSize:9, letterSpacing:3, marginBottom:6 }}>ARQUIVO RECUPERADO</div>
            <div style={{ fontSize:13, fontWeight:"bold", letterSpacing:1 }}>{FILES[fileOpen].title}</div>
            <div style={{ color:C.dim, fontSize:10, marginTop:4, marginBottom:14 }}>{FILES[fileOpen].date}</div>
            <div style={{ height:1, background:C.border, marginBottom:14 }} />
            <pre style={{ margin:0, fontSize:12, lineHeight:1.85, color:"#AAA090", whiteSpace:"pre-wrap", fontFamily:"'Courier New',monospace" }}>{FILES[fileOpen].body}</pre>
            <button onClick={() => setFileOpen(null)} style={{ marginTop:18, background:"transparent", border:`1px solid ${C.border2}`, color:C.dim, padding:"7px 14px", fontFamily:"'Courier New',monospace", fontSize:10, cursor:"pointer", letterSpacing:1 }}>
              [FECHAR ARQUIVO]
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth:1060, margin:"0 auto", padding:"0 16px" }}>

        {/* Header */}
        <div style={{ padding:"13px 0", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:C.accent, letterSpacing:3 }}>PROJECT_NEXUS_2027</div>
            <div style={{ fontSize:10, color:C.dim, marginTop:2 }}>{node.chapter}</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ fontSize:9, color:C.ghost }}>16 JUN 2026</div>
            {isMobile && (
              <button onClick={() => setSidebar(s => !s)} style={{ background:"transparent", border:`1px solid ${C.border2}`, color:C.dim, padding:"5px 10px", fontFamily:"'Courier New',monospace", fontSize:10, cursor:"pointer" }}>
                {sidebar?"[× STATUS]":"[≡ STATUS]"}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:20, paddingTop:22, paddingBottom:48 }}>

          {/* SCENE PANEL */}
          <div style={{ flex:1, minWidth:0 }}>

            {/* ── NARRATIVE MODE ── */}
            {!inDialogue && (
              <div onClick={skipText} style={{ cursor:textDone?"default":"pointer" }}>
                <div style={{ minHeight:280 }}>
                  {paras.slice(0,revealed).map((p,i) => (
                    <p key={i} style={{ fontSize:14, lineHeight:2.05, color:C.text, marginBottom:16,
                      fontStyle:p.startsWith('"')||p.startsWith("{")||p.startsWith(">")||p.startsWith("[")?"italic":"normal",
                      opacity:p.startsWith('"')||p.startsWith("{")||p.startsWith(">")||p.startsWith("[")?0.8:1 }}>
                      {p}
                    </p>
                  ))}
                  {revealed < paras.length && (
                    <p style={{ fontSize:14, lineHeight:2.05, color:C.text, marginBottom:16 }}>
                      {paras[revealed].slice(0,chars)}<span style={{ animation:"blink 1s step-end infinite" }}>▋</span>
                    </p>
                  )}
                  {!textDone && <div style={{ fontSize:9, color:C.ghost, marginTop:8, letterSpacing:2 }}>[TOQUE PARA AVANÇAR]</div>}
                </div>
              </div>
            )}

            {/* ── DIALOGUE / SCENE MODE ── */}
            {inDialogue && (
              <div style={{ display:"flex", flexDirection:"column" }}>
                {/* Scene background + location */}
                <div style={{ background:bgInfo.grad, minHeight:180, display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"14px 16px", marginBottom:0, position:"relative", overflow:"hidden" }}>
                  {/* Location bar */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontSize:9, color:"rgba(180,170,150,0.5)", letterSpacing:3 }}>{bgInfo.loc}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:ecgColor, boxShadow:`0 0 6px ${ecgColor}` }} />
                      <span style={{ fontSize:8, color:ecgColor, letterSpacing:2 }}>{ecg}</span>
                    </div>
                  </div>
                  {/* Dimmed narration as scene context */}
                  <div>
                    {paras.slice(-2).map((p,i) => (
                      <p key={i} style={{ fontSize:11, color:"rgba(150,140,120,0.35)", lineHeight:1.7, margin:"0 0 4px", fontStyle:"italic" }}>{p}</p>
                    ))}
                  </div>
                </div>
                {/* Dialogue box */}
                <DialogueBox
                  charId={dlgLines[dlgIdx]?.char}
                  text={dlgLines[dlgIdx]?.text ?? ""}
                  chars={dlgChars}
                  lineDone={dlgLine}
                  isLast={dlgIdx >= dlgLines.length - 1}
                  onAdvance={advanceDlg}
                />
              </div>
            )}

            {/* ── CHOICES ── */}
            {showChoices && (
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:22, marginTop:8 }}>
                {node.ending && <div style={{ textAlign:"center", fontSize:9, color:C.accent, letterSpacing:4, marginBottom:20 }}>── FIM DO CAPÍTULO 1 ──</div>}
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {node.choices.map(ch => (
                    <button key={ch.id} onClick={() => go(ch)} style={{ background:"transparent", border:`1px solid ${C.border2}`, color:C.text, padding:"13px 16px", fontFamily:"'Courier New',monospace", fontSize:13, cursor:"pointer", textAlign:"left", display:"flex", gap:12, alignItems:"flex-start", width:"100%" }}>
                      <span style={{ color:C.accent, fontWeight:"bold", minWidth:22 }}>[{ch.id}]</span>
                      <span style={{ flex:1 }}>
                        <span style={{ display:"block" }}>{ch.text}</span>
                        <span style={{ fontSize:11, color:C.dim, marginTop:3, display:"block" }}>{ch.hint}</span>
                      </span>
                      {ch.live && <span style={{ fontSize:9, color:C.DANGER, letterSpacing:1, alignSelf:"center", whiteSpace:"nowrap" }}>⚡ LIVE</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          {(!isMobile || sidebar) && <Sidebar />}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        button:hover { border-color:${C.accent}!important; }
      `}</style>
    </div>
  );
}
