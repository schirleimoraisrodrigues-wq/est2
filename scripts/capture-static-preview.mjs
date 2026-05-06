import { mkdir, writeFile } from 'node:fs/promises';

const outDir = 'screenshots';
const outFile = `${outDir}/terminal-engenharia-dark-preview.svg`;
const now = new Date().toISOString().slice(0, 10);

await mkdir(outDir, { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1000" viewBox="0 0 1440 1000" role="img" aria-labelledby="title desc">
  <title id="title">Terminal engenharia - prévia estática do modo noturno</title>
  <desc id="desc">Prévia sem navegador mostrando a interface minimalista preta e laranja do Terminal engenharia.</desc>
  <defs>
    <linearGradient id="hero" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0d0d0d"/>
      <stop offset="1" stop-color="#1a0d04"/>
    </linearGradient>
    <style>
      .bg{fill:#050505}.panel{fill:#0d0d0d;stroke:#2a2118;stroke-width:2}.soft{fill:#17120d;stroke:#2a2118;stroke-width:2}.accent{fill:#f97316}.muted{fill:#c2b8ad}.text{fill:#fff7ed}.line{stroke:#2a2118;stroke-width:2}.small{font:600 22px Inter,Arial,sans-serif}.base{font:700 28px Inter,Arial,sans-serif}.title{font:800 54px Inter,Arial,sans-serif;letter-spacing:-1px}.mini{font:700 18px Inter,Arial,sans-serif}.eyebrow{font:800 16px Inter,Arial,sans-serif;letter-spacing:3px;text-transform:uppercase}.nav{font:700 21px Inter,Arial,sans-serif}.metric{font:800 36px Inter,Arial,sans-serif}.shadow{filter:drop-shadow(0 18px 28px rgba(0,0,0,.28))}
    </style>
  </defs>
  <rect class="bg" width="1440" height="1000"/>
  <rect class="panel" x="24" y="24" width="278" height="952" rx="26"/>
  <rect class="soft" x="50" y="54" width="48" height="48" rx="15"/><text class="accent base" x="64" y="89">∿</text>
  <text class="text base" x="112" y="76">Terminal</text><text class="muted mini" x="112" y="103">engenharia</text>
  <g class="muted nav">
    <text x="58" y="172">⌂  Painel Geral</text><text x="58" y="222">□  Agenda</text><text x="58" y="272">◫  Matérias</text><text x="58" y="322">≡  Central de Estudos</text><text x="58" y="372">◎  Diagnóstico</text><text x="58" y="422">?  Questões</text><text x="58" y="472">◈  Flashcards</text><text x="58" y="522">+  Cadastro</text>
  </g>
  <rect class="soft" x="44" y="140" width="220" height="44" rx="14" opacity=".85"/>
  <line class="line" x1="330" y1="92" x2="1396" y2="92"/>
  <text class="muted eyebrow" x="350" y="58">Olá, Estudante</text><text class="text base" x="350" y="84">Terminal engenharia</text>
  <rect class="soft" x="1128" y="42" width="92" height="34" rx="17"/><text class="muted mini" x="1145" y="65">offline</text>
  <rect class="panel" x="1235" y="34" width="46" height="46" rx="14"/><text class="accent small" x="1247" y="65">⚙</text>
  <rect class="panel" x="1292" y="34" width="46" height="46" rx="14"/><text class="accent small" x="1305" y="65">☀</text>
  <rect class="panel" x="1349" y="34" width="46" height="46" rx="14"/><text class="accent small" x="1360" y="65">↪</text>
  <rect class="panel shadow" x="342" y="126" width="1024" height="224" rx="30" fill="url(#hero)"/>
  <text class="muted eyebrow" x="382" y="176">PAINEL GERAL</text><text class="text title" x="382" y="242">Terminal engenharia</text>
  <text class="muted small" x="382" y="288">Prioridades, provas e revisões em uma rotina de estudo ativa.</text>
  <g>
    <rect class="soft" x="382" y="382" width="180" height="112" rx="22"/><text class="muted mini" x="404" y="420">Próxima prova</text><text class="text metric" x="404" y="462">Cálculo</text>
    <rect class="soft" x="586" y="382" width="180" height="112" rx="22"/><text class="muted mini" x="608" y="420">Fila</text><text class="text metric" x="608" y="462">12</text>
    <rect class="soft" x="790" y="382" width="180" height="112" rx="22"/><text class="muted mini" x="812" y="420">Revisões</text><text class="text metric" x="812" y="462">4</text>
    <rect class="soft" x="994" y="382" width="180" height="112" rx="22"/><text class="muted mini" x="1016" y="420">Tarefas</text><text class="text metric" x="1016" y="462">3</text>
    <rect class="soft" x="1198" y="382" width="168" height="112" rx="22"/><text class="muted mini" x="1220" y="420">Crítica</text><text class="accent metric" x="1220" y="462">2</text>
  </g>
  <rect class="panel" x="342" y="532" width="500" height="360" rx="26"/><text class="muted eyebrow" x="378" y="582">AGENDA</text><text class="text base" x="378" y="620">Maio de 2026</text>
  ${Array.from({length: 35}, (_, i) => {
    const x = 378 + (i % 7) * 62;
    const y = 650 + Math.floor(i / 7) * 42;
    const day = i - 3;
    const active = day === 6;
    return `<rect x="${x}" y="${y}" width="48" height="34" rx="10" fill="${active ? '#241306' : '#0b0b0b'}" stroke="${active ? '#f97316' : '#2a2118'}"/><text class="${active ? 'accent' : 'muted'} mini" x="${x + 14}" y="${y + 23}">${day > 0 && day < 32 ? day : ''}</text>`;
  }).join('\n  ')}
  <rect class="panel" x="874" y="532" width="492" height="360" rx="26"/><text class="muted eyebrow" x="910" y="582">MAPA DE PRIORIDADES</text>
  <rect class="soft" x="910" y="622" width="410" height="52" rx="16"/><text class="accent small" x="932" y="656">Zona crítica · 2 tópicos</text>
  <rect class="soft" x="910" y="692" width="410" height="52" rx="16"/><text class="text small" x="932" y="726">Alta prioridade · 5 tópicos</text>
  <rect class="soft" x="910" y="762" width="410" height="52" rx="16"/><text class="muted small" x="932" y="796">Atenção moderada · 3 tópicos</text>
  <text class="muted mini" x="342" y="950">Gerado em ${now} por scripts/capture-static-preview.mjs — sem depender de Chromium/Firefox.</text>
</svg>
`;

await writeFile(outFile, svg);
console.log(`Static preview generated: ${outFile}`);
