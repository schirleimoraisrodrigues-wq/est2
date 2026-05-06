const confidenceOptions = ['Chutei', 'Estava muito incerta', 'Estava em dúvida', 'Estava confiante', 'Sabia com certeza'];
const eventTypes = ['prova', 'trabalho', 'tarefa', 'revisão', 'aula', 'apresentação', 'simulado', 'evento acadêmico', 'outro'];
const storageKey = 'plantao-engenharia:v6';
const accessKey = 'plantao-engenharia:access-mode';
const usersKey = 'plantao-engenharia:users';
const sessionKey = 'plantao-engenharia:session';
const today = '2026-05-06';
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const seed = {
  user: { id: 'user-demo', name: 'Estudante', xp: 920, dailyGoal: 12, weeklyGoal: 60, theme: 'light' },
  subjects: [
    { id: 'sub-fluidos', name: 'Mecânica dos Fluidos', description: 'Escoamentos, pressão, vazão e conservação de energia.', color: '#0f766e', createdAt: '2026-05-01' },
    { id: 'sub-calculo', name: 'Cálculo II', description: 'Integrais múltiplas, séries e campos vetoriais.', color: '#334155', createdAt: '2026-05-01' },
    { id: 'sub-materiais', name: 'Ciência dos Materiais', description: 'Estrutura, propriedades e ensaios mecânicos.', color: '#64748b', createdAt: '2026-05-01' },
  ],
  topics: [
    { id: 'top-bernoulli', subjectId: 'sub-fluidos', title: 'Equação de Bernoulli', description: 'Energia mecânica em escoamento ideal.', difficulty: 'média', status: 'estudando', priority: 'alta' },
    { id: 'top-orificios', subjectId: 'sub-fluidos', title: 'Orifícios e vazão', description: 'Aplicações de Bernoulli em saídas e reservatórios.', difficulty: 'alta', status: 'revisando', priority: 'alta' },
    { id: 'top-integrais', subjectId: 'sub-calculo', title: 'Integrais Duplas', description: 'Regiões, troca de ordem e aplicações.', difficulty: 'alta', status: 'não iniciado', priority: 'alta' },
    { id: 'top-metais', subjectId: 'sub-materiais', title: 'Propriedades dos metais', description: 'Dureza, ductilidade, tensão e deformação.', difficulty: 'média', status: 'revisando', priority: 'média' },
  ],
  contents: [
    { id: 'cont-bern-intro', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', title: 'Introdução à Equação de Bernoulli', type: 'resumo', description: 'Conservação de energia no fluido ideal.', body: 'Bernoulli relaciona pressão, velocidade e altura em escoamento ideal e incompressível.', fileUrl: '', externalLink: '', status: 'estudado', lastReviewedAt: '2026-04-20', createdAt: '2026-05-01' },
    { id: 'cont-bern-orificios', subjectId: 'sub-fluidos', topicId: 'top-orificios', title: 'Aplicações em orifícios', type: 'PDF', description: 'Aplicações de Torricelli.', body: '', fileUrl: 'https://exemplo.com/bernoulli.pdf', externalLink: '', status: 'revisar depois', lastReviewedAt: '2026-04-10', createdAt: '2026-05-01' },
    { id: 'cont-pressao', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', title: 'Relação entre pressão, velocidade e altura', type: 'texto escrito', description: 'Interpretação física dos termos.', body: 'Em uma linha de corrente ideal, as parcelas de pressão, energia cinética e energia potencial se equilibram.', fileUrl: '', externalLink: '', status: 'estudando', lastReviewedAt: '2026-04-28', createdAt: '2026-05-01' },
    { id: 'cont-int-duplas', subjectId: 'sub-calculo', topicId: 'top-integrais', title: 'Regiões de integração', type: 'link externo', description: 'Como definir limites variáveis.', body: 'O desenho da região define a ordem de integração e os limites.', fileUrl: '', externalLink: 'https://exemplo.com/integrais', status: 'estudando', lastReviewedAt: '2026-04-16', createdAt: '2026-05-01' },
  ],
  questions: [
    { id: 'q-bern-1', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', contentId: 'cont-bern-intro', statement: 'O que a Equação de Bernoulli conserva em um escoamento ideal?', type: 'múltipla escolha', alternatives: ['Energia mecânica', 'Massa molar', 'Temperatura absoluta', 'Viscosidade dinâmica'], correctAnswer: 'Energia mecânica', explanation: 'A equação representa conservação de energia mecânica por unidade de volume.', difficulty: 'média', tags: ['energia', 'conceito'], source: 'Demo', status: 'ativa' },
    { id: 'q-bern-2', subjectId: 'sub-fluidos', topicId: 'top-orificios', contentId: 'cont-bern-orificios', statement: 'Ao aumentar a altura da coluna de fluido, a velocidade teórica de saída em um orifício tende a aumentar.', type: 'verdadeiro ou falso', alternatives: ['Verdadeiro', 'Falso'], correctAnswer: 'Verdadeiro', explanation: 'Pela relação de Torricelli, a velocidade cresce com a raiz da altura.', difficulty: 'média', tags: ['vazão'], source: 'Demo', status: 'ativa' },
    { id: 'q-pressao-1', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', contentId: 'cont-pressao', statement: 'Se a velocidade aumenta em uma linha de corrente ideal horizontal, a pressão estática tende a:', type: 'múltipla escolha', alternatives: ['Diminuir', 'Aumentar sempre', 'Ficar infinita', 'Não se relacionar'], correctAnswer: 'Diminuir', explanation: 'Em altura constante, aumento da energia cinética reduz a parcela de pressão.', difficulty: 'alta', tags: ['pressão'], source: 'Demo', status: 'ativa' },
    { id: 'q-calc-1', subjectId: 'sub-calculo', topicId: 'top-integrais', contentId: 'cont-int-duplas', statement: 'Em regiões não retangulares, os limites de integração podem depender da variável externa.', type: 'verdadeiro ou falso', alternatives: ['Verdadeiro', 'Falso'], correctAnswer: 'Verdadeiro', explanation: 'A descrição geométrica da região define limites variáveis.', difficulty: 'média', tags: ['integrais'], source: 'Demo', status: 'ativa' },
  ],
  attempts: [],
  flashcards: [
    { id: 'fc-bern-1', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', contentId: 'cont-bern-intro', front: 'O que a Equação de Bernoulli conserva?', back: 'A energia mecânica do fluido em escoamento ideal.', difficulty: 'média', lastReviewedAt: '2026-04-19', mastery: 'revisar' },
    { id: 'fc-pressao-1', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', contentId: 'cont-pressao', front: 'O que ocorre com a pressão quando a velocidade aumenta em escoamento horizontal ideal?', back: 'A pressão estática tende a diminuir.', difficulty: 'alta', lastReviewedAt: '2026-04-12', mastery: 'fraco' },
  ],
  flashcardReviews: [],
  events: [
    { id: 'ev-aula', title: 'Aula de Bernoulli', description: 'Revisar anotações antes da aula.', date: '2026-05-07', time: '10:00', type: 'aula', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', priority: 'média', status: 'pendente', notes: 'Levar resumo.' },
    { id: 'ev-simulado', title: 'Simulado de Fluidos', description: 'Lista de 10 questões.', date: '2026-05-10', time: '15:00', type: 'simulado', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', priority: 'alta', status: 'pendente', notes: '' },
  ],
  exams: [
    { id: 'exam-fluidos', title: 'Prova de Mecânica dos Fluidos', subjectId: 'sub-fluidos', date: '2026-05-16', time: '08:00', topics: ['top-bernoulli', 'top-orificios'], contents: ['cont-bern-intro', 'cont-bern-orificios', 'cont-pressao'], difficulty: 'alta', importance: 10, preparationStatus: 'em andamento', notes: 'Priorizar Bernoulli e vazão.' },
    { id: 'exam-calculo', title: 'Prova de Cálculo II', subjectId: 'sub-calculo', date: '2026-05-22', time: '10:00', topics: ['top-integrais'], contents: ['cont-int-duplas'], difficulty: 'média', importance: 8, preparationStatus: 'comecei', notes: 'Refazer exemplos.' },
  ],
  tasks: [
    { id: 'task-lista', title: 'Resolver lista de Bernoulli', description: 'Questões 1 a 8.', date: '2026-05-08', time: '19:00', type: 'tarefa', subjectId: 'sub-fluidos', topicId: 'top-bernoulli', priority: 'alta', status: 'pendente', notes: '' },
  ],
};

let state = loadState();
let hasOfflineAccess = localStorage.getItem(accessKey) === 'offline';
let authSession = readSession();
let session = null;
let ui = { route: location.hash.replace('#', '') || '/', calendarMonth: '2026-05', selectedDay: today, modal: null, registryTab: 'subjects', contentTab: 'theory', subjectTab: 'overview', message: '', accessMode: 'login', accessMessage: '', accessMessageType: 'info', eventDetails: null };

function loadState() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return structuredClone(seed);
  const parsed = JSON.parse(stored);
  return { ...structuredClone(seed), ...parsed };
}
function save() { localStorage.setItem(storageKey, JSON.stringify(state)); }
function uid(prefix) { return `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`; }
function byId(list, id) { return list.find((item) => item.id === id); }
function subjectName(id) { return byId(state.subjects, id)?.name || 'Sem matéria'; }
function topicName(id) { return byId(state.topics, id)?.title || 'Sem tópico'; }
function contentName(id) { return byId(state.contents, id)?.title || 'Sem conteúdo'; }
function esc(value = '') { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function formatDate(date) { return date ? date.split('-').reverse().join('/') : 'Sem data'; }
function daysUntil(date) { return Math.ceil((new Date(`${date}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000); }
function setTheme(theme) { state.user.theme = theme; document.documentElement.dataset.theme = theme; save(); }
setTheme(state.user.theme || 'light');

function readUsers() {
  try { return JSON.parse(localStorage.getItem(usersKey) || '[]'); }
  catch { return []; }
}
function saveUsers(users) { localStorage.setItem(usersKey, JSON.stringify(users)); }
function readSession() {
  try { return JSON.parse(localStorage.getItem(sessionKey) || 'null'); }
  catch { return null; }
}
function currentUserName() { return authSession?.name || state.user.name || 'Estudante'; }
function hasAccess() { return hasOfflineAccess || Boolean(authSession); }

function accessPage() {
  const isRegister = ui.accessMode === 'register';
  return `<main class="access-page">
    <section class="access-copy">
      <div class="brand-mark access-mark">∿</div>
      <span class="eyebrow">Plataforma de estudos de engenharia</span>
      <h1>Plantão da Engenharia</h1>
      <p>Organize matérias, tópicos, conteúdos, eventos e sessões de questões em uma rotina minimalista de estudo ativo.</p>
      <div class="access-highlights"><span>✓ Questões por conteúdo</span><span>✓ Agenda mensal</span><span>✓ Modo offline</span></div>
    </section>
    <section class="access-card">
      ${isRegister ? registerForm() : loginForm()}
    </section>
  </main>`;
}
function loginForm() {
  return `<h2>Entrar</h2>
    <p class="muted access-subtitle">Use seu cadastro local ou entre offline para acessar agora.</p>
    <form onsubmit="loginUser(event)" class="access-form">
      <label>E-mail<input class="input" name="email" type="email" placeholder="seu@email.com" autocomplete="email" required></label>
      <label>Senha<input class="input" name="password" type="password" placeholder="Sua senha" autocomplete="current-password" required></label>
      <button class="btn primary" type="submit">Entrar</button>
    </form>
    ${accessNotice()}
    <div class="access-links">
      <button class="link-button" onclick="showRegisterForm()">Fazer cadastro</button>
      <button class="link-button strong" onclick="enterOfflineMode()">Entrar offline</button>
    </div>`;
}
function registerForm() {
  return `<h2>Fazer cadastro</h2>
    <p class="muted access-subtitle">Cadastro temporário salvo somente neste navegador.</p>
    <form onsubmit="registerUser(event)" class="access-form">
      <label>Nome<input class="input" name="name" type="text" placeholder="Seu nome" autocomplete="name" required></label>
      <label>E-mail<input class="input" name="email" type="email" placeholder="seu@email.com" autocomplete="email" required></label>
      <label>Senha<input class="input" name="password" type="password" placeholder="Crie uma senha" autocomplete="new-password" required></label>
      <label>Confirmar senha<input class="input" name="confirmPassword" type="password" placeholder="Repita a senha" autocomplete="new-password" required></label>
      <button class="btn primary" type="submit">Cadastrar</button>
      <button class="btn" type="button" onclick="showLoginForm()">Voltar para entrada</button>
    </form>
    ${accessNotice()}`;
}
function accessNotice() { return ui.accessMessage ? `<div class="notice access-notice ${ui.accessMessageType}">${esc(ui.accessMessage)}</div>` : ''; }
function showAccessMessage(message, type = 'info') { ui.accessMessage = message; ui.accessMessageType = type; render(); }
function showRegisterForm() { ui.accessMode = 'register'; ui.accessMessage = ''; render(); }
function showLoginForm(message = '', type = 'info') { ui.accessMode = 'login'; ui.accessMessage = message; ui.accessMessageType = type; render(); }
function normalizedEmail(value) { return String(value || '').trim().toLowerCase(); }
function loginUser(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const email = normalizedEmail(form.get('email'));
  const password = String(form.get('password') || '');
  const user = readUsers().find((candidate) => candidate.email === email && candidate.password === password);
  if (!user) { showAccessMessage('Cadastro incorreto ou usuário não encontrado.', 'error'); return; }
  authSession = { id: user.id, name: user.name, email: user.email, mode: 'local' };
  hasOfflineAccess = false;
  state.user.name = user.name;
  localStorage.setItem(sessionKey, JSON.stringify(authSession));
  localStorage.removeItem(accessKey);
  save();
  ui.accessMessage = '';
  go('/');
}
function registerUser(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const name = String(form.get('name') || '').trim();
  const email = normalizedEmail(form.get('email'));
  const password = String(form.get('password') || '');
  const confirmPassword = String(form.get('confirmPassword') || '');
  if (!name || !email || !password || !confirmPassword) { showAccessMessage('Preencha todos os campos para continuar.', 'error'); return; }
  if (password !== confirmPassword) { showAccessMessage('As senhas não são iguais.', 'error'); return; }
  const users = readUsers();
  if (users.some((user) => user.email === email)) { showAccessMessage('Este e-mail já está cadastrado.', 'error'); return; }
  users.push({ id: uid('user'), name, email, password, createdAt: today });
  saveUsers(users);
  showLoginForm('Cadastro realizado com sucesso. Entre com seu e-mail e senha.', 'success');
}
function enterOfflineMode() {
  hasOfflineAccess = true;
  authSession = null;
  localStorage.setItem(accessKey, 'offline');
  localStorage.removeItem(sessionKey);
  ui.accessMessage = '';
  go('/');
}
function signOut() {
  hasOfflineAccess = false;
  authSession = null;
  session = null;
  localStorage.removeItem(accessKey);
  localStorage.removeItem(sessionKey);
  ui.route = '/acesso';
  ui.accessMode = 'login';
  ui.accessMessage = '';
  location.hash = '/acesso';
  render();
}

const confidenceScore = { 'Chutei': .1, 'Estava muito incerta': .3, 'Estava em dúvida': .55, 'Estava em dúvida entre alternativas': .55, 'Estava confiante': .8, 'Sabia com certeza': 1 };
function attemptsFor(filter) {
  return state.attempts.filter((attempt) => {
    const question = byId(state.questions, attempt.questionId);
    return question && Object.entries(filter).every(([key, value]) => !value || question[key] === value);
  });
}
function performance(filter = {}) {
  const attempts = attemptsFor(filter);
  if (!attempts.length) return { total: 0, correct: 0, wrong: 0, accuracy: 0, confidence: 0, score: 50 };
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const confidence = attempts.reduce((sum, attempt) => sum + (confidenceScore[attempt.confidenceLevel] || .5), 0) / attempts.length;
  return { total: attempts.length, correct, wrong: attempts.length - correct, accuracy: Math.round((correct / attempts.length) * 100), confidence: Math.round(confidence * 100), score: Math.round(((correct / attempts.length) * .7 + confidence * .3) * 100) };
}
function priorityForContent(content) {
  let score = 30;
  const perf = performance({ contentId: content.id });
  score += Math.max(0, 70 - perf.score);
  state.attempts.filter((attempt) => byId(state.questions, attempt.questionId)?.contentId === content.id).forEach((attempt) => {
    if (attempt.isCorrect && attempt.confidenceLevel === 'Sabia com certeza') score -= 18;
    if (attempt.isCorrect && attempt.confidenceLevel === 'Estava confiante') score -= 10;
    if (attempt.isCorrect && attempt.confidenceLevel === 'Estava em dúvida') score -= 2;
    if (attempt.isCorrect && ['Estava muito incerta', 'Chutei'].includes(attempt.confidenceLevel)) score += 18;
    if (!attempt.isCorrect && attempt.confidenceLevel === 'Chutei') score += 22;
    if (!attempt.isCorrect && ['Estava confiante', 'Sabia com certeza'].includes(attempt.confidenceLevel)) score += 38;
  });
  state.flashcards.filter((card) => card.contentId === content.id && ['fraco', 'revisar'].includes(card.mastery)).forEach(() => { score += 14; });
  if (daysUntil(content.lastReviewedAt) < -10) score += 16;
  state.exams.filter((exam) => exam.contents.includes(content.id)).forEach((exam) => { if (daysUntil(exam.date) <= 14) score += 25 + Number(exam.importance || 0); });
  return Math.max(0, Math.round(score));
}
function topicPriorityScore(topic) {
  const contents = state.contents.filter((content) => content.topicId === topic.id);
  if (!contents.length) return topic.priority === 'alta' ? 65 : 35;
  return Math.round(contents.reduce((sum, content) => sum + priorityForContent(content), 0) / contents.length);
}
function zoneForScore(score) { return score >= 82 ? 'critical' : score >= 62 ? 'high' : score >= 38 ? 'moderate' : 'stable'; }
function zoneLabel(zone) { return ({ critical: 'Zona Crítica', high: 'Alta Prioridade', moderate: 'Atenção Moderada', stable: 'Domínio Estável' })[zone]; }
function recommendedContent(topicId = '') {
  return [...state.contents].filter((content) => !topicId || content.topicId === topicId).sort((a, b) => priorityForContent(b) - priorityForContent(a))[0] || state.contents[0];
}
function nextExamForSubject(subjectId) { return [...state.exams].filter((exam) => exam.subjectId === subjectId).sort((a, b) => a.date.localeCompare(b.date))[0]; }
function allEvents() { return [...state.events, ...state.tasks, ...state.exams.map((exam) => ({ ...exam, type: 'prova', priority: exam.difficulty, status: exam.preparationStatus, description: exam.notes }))]; }
function overdueTasks() { return state.tasks.filter((task) => task.status !== 'concluída' && daysUntil(task.date) < 0); }
function dueReviews() { return state.contents.filter((content) => daysUntil(content.lastReviewedAt) < -10 || content.status === 'revisar depois'); }

function go(route) { ui.route = route; location.hash = route; render(); }
function openModal(type, id = '', defaults = {}) { ui.modal = { type, id, defaults }; render(); }
function closeModal() { ui.modal = null; render(); }
function setMessage(text) { ui.message = text; render(); }
function xpLevel() { return Math.floor(state.user.xp / 250) + 1; }

function layout(content) {
  const nav = [
    ['/', 'Painel Geral', '⌂'], ['/agenda', 'Agenda', '□'], ['/materias', 'Matérias', '◫'], ['/central-estudos', 'Central de Estudos', '≡'], ['/diagnostico', 'Diagnóstico', '◎'], ['/questoes', 'Questões', '?'], ['/flashcards', 'Flashcards', '◈'], ['/provas', 'Provas', '◧'], ['/desempenho', 'Desempenho', '↗'], ['/cadastro', 'Central de Cadastro', '+'], ['/configuracoes', 'Configurações', '⚙'],
  ];
  return `<div class="app">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><div class="brand-mark">∿</div><div><strong>Plantão da Engenharia</strong><span>plantão de estudos</span></div></div>
      <nav class="nav">${nav.map(([route, label, icon]) => `<button class="${ui.route === route ? 'active' : ''}" onclick="go('${route}')"><span>${icon}</span>${label}</button>`).join('')}</nav>
    </aside>
    <main class="main">
      <header class="topbar"><button class="btn ghost mobile-menu" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button><div><span class="eyebrow">Olá, ${esc(currentUserName())}</span><h2>Plantão da Engenharia</h2></div><div class="topbar-actions"><span class="badge">${authSession?.mode === 'local' ? 'Conta local' : 'Modo offline'}</span><button class="btn icon-btn" title="Configurações" onclick="go('/configuracoes')">⚙</button><button class="btn icon-btn" title="Alternar tema" onclick="setTheme(state.user.theme === 'dark' ? 'light' : 'dark'); render()">${state.user.theme === 'dark' ? '☀️' : '🌙'}</button><button class="btn icon-btn" title="Sair" onclick="signOut()">🚪</button></div></header>
      <section class="content">${ui.message ? `<div class="notice">${esc(ui.message)} <button class="btn ghost" onclick="ui.message=''; render()">Fechar</button></div>` : ''}${content}</section>
    </main>
    ${ui.modal ? renderModal() : ''}
    ${ui.eventDetails ? eventDetailsModal() : ''}
  </div>`;
}
function statCard(label, value, helper = '') { return `<div class="card metric"><span class="muted">${label}</span><strong>${value}</strong><small class="muted">${helper}</small></div>`; }
function progress(value) { return `<div class="progress"><span style="width:${Math.max(0, Math.min(100, value))}%"></span></div>`; }
function itemList(items, renderItem) { return `<div class="list">${items.length ? items.map((item) => `<div class="item">${renderItem(item)}</div>`).join('') : '<p class="muted">Nada cadastrado.</p>'}</div>`; }

function dashboard() {
  const nextExam = [...state.exams].sort((a, b) => a.date.localeCompare(b.date))[0];
  const queue = studyQueue();
  const critical = queue.filter((item) => item.zone === 'critical').length;
  return layout(`<section class="hero"><div class="between"><div><span class="eyebrow">Olá, ${esc(currentUserName())}</span><h1>Plantão da Engenharia</h1><h2>Painel Geral</h2><p>${authSession?.mode === 'local' ? 'Conta local ativa.' : 'Modo offline.'} Hoje vale focar nos temas da prova mais próxima e nas revisões pendentes.</p></div><div class="row"><button class="btn icon-btn" title="Configurações" onclick="go('/configuracoes')">⚙</button><button class="btn icon-btn" title="Alternar tema" onclick="setTheme(state.user.theme === 'dark' ? 'light' : 'dark'); render()">${state.user.theme === 'dark' ? '☀️' : '🌙'}</button><button class="btn icon-btn" title="Sair" onclick="signOut()">🚪</button></div></div><div class="grid cols-5">${statCard('Próxima prova', nextExam ? `${nextExam.title} · ${relativeDay(nextExam.date)}` : 'Sem prova')}${statCard('Fila de estudos', `${queue.length} tópicos`)}${statCard('Revisões vencidas', dueReviews().length)}${statCard('Tarefas atrasadas', overdueTasks().length)}${statCard('Prioridade crítica', critical)}</div></section>
  <div class="grid cols-2" style="margin-top:18px"><section class="card"><div class="between"><div><span class="eyebrow">Agenda rápida</span><h2>Calendário de estudos</h2></div><button class="btn" onclick="go('/agenda')">Ver agenda</button></div>${calendar('dash')}<div class="list" style="margin-top:12px">${dayEventsHtml()}</div></section><section class="card"><span class="eyebrow">Mapa de Prioridades</span><h2>Mapa operacional</h2>${priorityMap(true)}</section></div>
  <div class="grid cols-2" style="margin-top:18px"><section class="card"><div class="between"><div><span class="eyebrow">Agenda rápida</span><h2>Provas próximas</h2></div><button class="btn" onclick="go('/provas')">Ver provas</button></div>${upcomingExamsHtml()}</section><section class="card"><div class="between"><div><span class="eyebrow">Revisões Prioritárias</span><h2>Conteúdos para retorno</h2></div><button class="btn" onclick="go('/central-estudos')">Ver central</button></div>${priorityReturnsHtml()}</section></div>
  <section style="margin-top:22px"><div class="between"><div><span class="eyebrow">Fila de Estudos</span><h1>Tópicos para diagnóstico</h1><p class="muted">Conteúdos puxam a fila quando há prova próxima, baixa confiança ou revisão vencida.</p></div><button class="btn" onclick="go('/cadastro')">Ir para Central de Cadastro</button></div>${studyQueueHtml()}</section>`);
}
function relativeDay(date) { const d = daysUntil(date); return d === 0 ? 'hoje' : d === 1 ? 'amanhã' : d > 1 ? `em ${d} dias` : 'atrasada'; }
function studyQueue() {
  return state.topics.map((topic) => {
    const score = topicPriorityScore(topic);
    return { topic, score, zone: zoneForScore(score), exam: nextExamForSubject(topic.subjectId), content: recommendedContent(topic.id) };
  }).sort((a, b) => b.score - a.score);
}
function diagnosisStatus(topicId) {
  const attempts = attemptsFor({ topicId });
  if (!attempts.length) return 'Não avaliado';
  const topic = byId(state.topics, topicId);
  return zoneLabel(zoneForScore(topicPriorityScore(topic)));
}
function upcomingExamsHtml() {
  const exams = [...state.exams].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  return itemList(exams, (exam) => `<strong>${esc(exam.title)}</strong><div class="muted">${esc(subjectName(exam.subjectId))} · ${relativeDay(exam.date)} · ${esc(exam.preparationStatus)}</div>`);
}
function priorityReturnsHtml() {
  const contents = [...state.contents].filter((content) => priorityForContent(content) >= 55 || content.status === 'revisar depois').sort((a, b) => priorityForContent(b) - priorityForContent(a)).slice(0, 4);
  return itemList(contents, (content) => `<strong>${esc(content.title)}</strong><div class="muted">${esc(subjectName(content.subjectId))} · ${esc(topicName(content.topicId))} · ${zoneLabel(zoneForScore(priorityForContent(content)))}</div>`);
}
function studyQueueHtml(items = studyQueue()) {
  return `<div class="queue-grid">${items.map(({ topic, zone, exam, content }) => `<article class="card queue-card"><div><span class="avatar">∑</span></div><div><h2>${esc(topic.title)}</h2><p class="muted">${esc(subjectName(topic.subjectId))}</p><p class="muted">${exam ? `${esc(exam.title)}: ${relativeDay(exam.date)}` : 'Sem prova vinculada'}</p><span class="badge">Status: ${diagnosisStatus(topic.id)}</span><span class="badge">${zoneLabel(zone)}</span><div class="row" style="margin-top:12px"><button class="btn primary" onclick="startDiagnosis('${topic.id}')">Avaliar domínio</button><button class="btn" onclick="go('/conteudo/${content.id}')">Ver teoria</button></div></div></article>`).join('')}</div>`;
}
function priorityMap(compact = false) {
  const zones = [
    ['critical', 'Zona Crítica', 'Dificuldade grave. Precisa estudar teoria completa antes de avançar.'],
    ['high', 'Alta Prioridade', 'Existe alguma base, mas ainda há lacunas importantes.'],
    ['moderate', 'Atenção Moderada', 'Foque nos erros e nos pontos específicos.'],
    ['stable', 'Domínio Estável', 'O domínio parece bom. Continue revisando para manter.'],
  ];
  const queue = studyQueue();
  return `<div class="zones ${compact ? 'compact' : ''}">${zones.map(([key, title, description]) => { const items = queue.filter((item) => item.zone === key); return `<section class="zone zone-${key}"><div class="between"><div><h2>${title}</h2><p>${description}</p></div><span class="badge">${items.length} tópico(s)</span></div>${items.length ? items.slice(0, compact ? 2 : 99).map(({ topic }) => `<div class="item"><strong>${esc(topic.title)}</strong><div class="muted">${esc(subjectName(topic.subjectId))}</div></div>`).join('') : '<div class="empty-zone">Nenhum tópico nesta zona.</div>'}</section>`; }).join('')}</div>`;
}

function calendar(id = 'main') {
  const [year, month] = ui.calendarMonth.split('-').map(Number);
  const first = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0).getDate();
  const offset = first.getDay();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: lastDay }, (_, i) => `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`)];
  return `<div class="calendar-shell"><div class="calendar-head"><button class="btn" onclick="moveMonth(-1)">‹</button><strong>${monthNames[month - 1]} de ${year}</strong><button class="btn" onclick="moveMonth(1)">›</button><button class="btn" onclick="goToday()">Hoje</button></div><div class="weekdays"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div><div class="calendar">${cells.map((day) => day ? calendarDay(day) : '<div></div>').join('')}</div></div>`;
}
function calendarDay(day) {
  const events = allEvents().filter((event) => event.date === day);
  return `<button class="day ${ui.selectedDay === day ? 'active' : ''}" onclick="selectDay('${day}')"><strong>${Number(day.slice(-2))}</strong>${events.slice(0, 3).map((event) => `<span class="event-pill event-${event.type.replaceAll(' ', '-')}">${esc(event.title)}</span>`).join('')}</button>`;
}
function moveMonth(delta) { const [y, m] = ui.calendarMonth.split('-').map(Number); const next = new Date(y, m - 1 + delta, 1); ui.calendarMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`; render(); }
function goToday() { ui.calendarMonth = today.slice(0, 7); ui.selectedDay = today; render(); }
function selectDay(day) { ui.selectedDay = day; render(); }
function dayEventsHtml() {
  const events = allEvents().filter((event) => event.date === ui.selectedDay);
  return events.length ? events.map((event) => `<button class="item event-row" onclick="openEventDetails('${event.id}', '${event.type}')"><strong>${esc(event.title)}</strong><span>${esc(event.time || '--:--')} · ${esc(event.type)} · ${esc(subjectName(event.subjectId))}</span></button>`).join('') : '<p class="muted">Nenhum evento neste dia.</p>';
}
function openEventDetails(id, type) { ui.eventDetails = { id, type }; render(); }
function eventDetailsModal() {
  const item = allEvents().find((event) => event.id === ui.eventDetails.id && event.type === ui.eventDetails.type) || allEvents().find((event) => event.id === ui.eventDetails.id);
  return `<div class="modal-backdrop"><section class="modal"><div class="between"><h2>${esc(item?.title || 'Evento')}</h2><button class="btn" onclick="ui.eventDetails=null; render()">Fechar</button></div><p class="muted">${formatDate(item?.date)} · ${esc(item?.time || '')} · ${esc(item?.type || '')}</p><p>${esc(item?.description || item?.notes || 'Sem descrição.')}</p><p><strong>Matéria:</strong> ${esc(subjectName(item?.subjectId))}</p><p><strong>Tópico:</strong> ${esc(topicName(item?.topicId))}</p></section></div>`;
}

function agendaPage() { return layout(`<div class="between"><div><h1>Agenda</h1><p class="muted">Provas, tarefas, aulas e revisões por mês.</p></div><button class="btn primary" onclick="openModal('event')">Adicionar evento</button></div><div class="grid cols-2"><section class="card">${calendar()}<div class="list" style="margin-top:12px">${dayEventsHtml()}</div></section><section class="card"><h2>Eventos cadastrados</h2>${registryList('events')}</section></div>`); }
function centralStudiesPage() { return layout(`<div class="between"><div><h1>Central de Estudos</h1><p class="muted">Fila, teoria e retornos prioritários em um só lugar.</p></div><button class="btn primary" onclick="go('/diagnostico')">Iniciar diagnóstico</button></div><h2>Fila de Estudos</h2>${studyQueueHtml()}<h2 style="margin-top:24px">Mapa de Prioridades</h2>${priorityMap()}`); }
function diagnosisPage() { if (session) return layout(sessionHtml()); return layout(`<h1>Diagnóstico de Domínio</h1><p class="muted">Escolha um tópico da fila para classificar seu domínio por questões.</p>${studyQueueHtml()}`); }

function subjectsPage() { return layout(`<div class="between"><div><h1>Matérias</h1><p class="muted">Matérias, tópicos, conteúdos e desempenho.</p></div><button class="btn primary" onclick="openModal('subject')">Cadastrar matéria</button></div><div class="grid cols-3">${state.subjects.map(subjectCard).join('')}</div>`); }
function subjectCard(subject) {
  const contents = state.contents.filter((content) => content.subjectId === subject.id);
  const questions = state.questions.filter((question) => question.subjectId === subject.id);
  const nextExam = nextExamForSubject(subject.id);
  const perf = performance({ subjectId: subject.id });
  const score = Math.round(state.topics.filter((topic) => topic.subjectId === subject.id).reduce((sum, topic) => sum + topicPriorityScore(topic), 0) / Math.max(1, state.topics.filter((topic) => topic.subjectId === subject.id).length));
  return `<section class="card"><div class="between"><h2>${esc(subject.name)}</h2><span class="badge">${zoneLabel(zoneForScore(score))}</span></div><p class="muted">${esc(subject.description)}</p>${progress(perf.score)}<p class="row"><span class="badge">${perf.score}% desempenho</span><span class="badge">${contents.length} conteúdos</span><span class="badge">${questions.length} questões</span></p><p class="muted">Próxima prova: ${nextExam ? `${formatDate(nextExam.date)} · ${esc(nextExam.title)}` : 'não cadastrada'}</p><div class="row"><button class="btn primary" onclick="go('/materia/${subject.id}')">Abrir</button><button class="btn" onclick="openModal('subject','${subject.id}')">Editar</button><button class="btn danger" onclick="removeItem('subjects','${subject.id}')">Excluir</button></div></section>`;
}
function subjectDetails(id) {
  const subject = byId(state.subjects, id);
  if (!subject) return layout('<p>Matéria não encontrada.</p>');
  const tabs = [['overview', 'Visão geral'], ['contents', 'Conteúdos'], ['questions', 'Questões'], ['flashcards', 'Flashcards'], ['files', 'Arquivos'], ['exams', 'Provas'], ['performance', 'Desempenho']];
  return layout(`<button class="btn ghost" onclick="go('/materias')">← Voltar</button><div class="between"><div><h1>${esc(subject.name)}</h1><p class="muted">${esc(subject.description)}</p></div><button class="btn" onclick="openModal('topic','', {subjectId:'${subject.id}'})">Novo tópico</button></div><div class="tabs">${tabs.map(([key, label]) => `<button class="${ui.subjectTab === key ? 'active' : ''}" onclick="ui.subjectTab='${key}'; render()">${label}</button>`).join('')}</div>${subjectTab(subject)}`);
}
function subjectTab(subject) {
  if (ui.subjectTab === 'contents') return `<section class="card"><div class="between"><h2>Conteúdos por tópico</h2><button class="btn primary" onclick="openModal('content','',{subjectId:'${subject.id}'})">Adicionar conteúdo</button></div>${topicsHtml(subject.id)}</section>`;
  if (ui.subjectTab === 'questions') return `<section class="card"><div class="between"><h2>Questões</h2><button class="btn" onclick="openModal('question','',{subjectId:'${subject.id}'})">Adicionar questão</button></div>${itemList(state.questions.filter((q) => q.subjectId === subject.id), questionItem)}</section>`;
  if (ui.subjectTab === 'flashcards') return `<section class="card"><div class="between"><h2>Flashcards</h2><button class="btn" onclick="openModal('flashcard','',{subjectId:'${subject.id}'})">Adicionar flashcard</button></div>${itemList(state.flashcards.filter((card) => card.subjectId === subject.id), flashcardItem)}</section>`;
  if (ui.subjectTab === 'files') return `<section class="card"><h2>Arquivos e PDFs</h2>${itemList(state.contents.filter((c) => c.subjectId === subject.id && (c.fileUrl || c.externalLink)), fileItem)}</section>`;
  if (ui.subjectTab === 'exams') return `<section class="card"><h2>Provas e eventos relacionados</h2>${itemList(allEvents().filter((event) => event.subjectId === subject.id), (event) => `${esc(event.title)}<div class="muted">${formatDate(event.date)} · ${esc(event.type)}</div>`)}</section>`;
  if (ui.subjectTab === 'performance') return performanceBlocks(subject.id);
  return `<section class="card"><h2>Visão geral</h2>${topicsHtml(subject.id)}</section>`;
}
function topicsHtml(subjectId) {
  return `<div class="list">${state.topics.filter((topic) => topic.subjectId === subjectId).map((topic) => { const contents = state.contents.filter((content) => content.topicId === topic.id); return `<div class="item"><div class="between"><div><strong>${esc(topic.title)}</strong><div class="muted">${esc(topic.description)}</div></div><span class="badge">${zoneLabel(zoneForScore(topicPriorityScore(topic)))}</span></div><p class="row"><span class="badge">${esc(topic.status)}</span><span class="badge">${esc(topic.difficulty)}</span><span class="badge">${contents.length} conteúdos</span></p><div class="row"><button class="btn" onclick="openModal('topic','${topic.id}')">Editar tópico</button><button class="btn" onclick="openModal('content','',{subjectId:'${subjectId}',topicId:'${topic.id}'})">Adicionar conteúdo</button><button class="btn primary" onclick="startDiagnosis('${topic.id}')">Avaliar domínio</button></div>${contents.map((content) => `<button class="item content-link" onclick="go('/conteudo/${content.id}')"><strong>${esc(content.title)}</strong><span>${esc(content.type)} · ${esc(content.status)} · última revisão ${formatDate(content.lastReviewedAt)}</span></button>`).join('')}</div>`; }).join('')}</div>`;
}
function contentPage(id) {
  const content = byId(state.contents, id);
  if (!content) return layout('<p>Conteúdo não encontrado.</p>');
  const tabs = [['theory', 'Teoria'], ['questions', 'Questões'], ['flashcards', 'Flashcards'], ['files', 'Arquivos'], ['performance', 'Desempenho']];
  return layout(`<button class="btn ghost" onclick="go('/materia/${content.subjectId}')">← Voltar</button><div class="between"><div><h1>${esc(content.title)}</h1><p class="muted">${esc(subjectName(content.subjectId))} · ${esc(topicName(content.topicId))}</p></div><button class="btn" onclick="openModal('content','${content.id}')">Editar conteúdo</button></div><div class="tabs">${tabs.map(([key, label]) => `<button class="${ui.contentTab === key ? 'active' : ''}" onclick="ui.contentTab='${key}'; render()">${label}</button>`).join('')}</div>${contentTab(content)}`);
}
function contentTab(content) {
  if (ui.contentTab === 'questions') return `<section class="card"><div class="between"><h2>Questões vinculadas</h2><div class="row"><button class="btn" onclick="openModal('question','',{subjectId:'${content.subjectId}',topicId:'${content.topicId}',contentId:'${content.id}'})">Adicionar questão</button><button class="btn primary" onclick="startQuestionSession('${content.id}')">Iniciar sessão</button></div></div>${itemList(state.questions.filter((q) => q.contentId === content.id), questionItem)}</section>`;
  if (ui.contentTab === 'flashcards') return `<section class="card"><div class="between"><h2>Flashcards</h2><button class="btn" onclick="openModal('flashcard','',{subjectId:'${content.subjectId}',topicId:'${content.topicId}',contentId:'${content.id}'})">Adicionar flashcard</button></div>${itemList(state.flashcards.filter((card) => card.contentId === content.id), flashcardItem)}</section>`;
  if (ui.contentTab === 'files') return `<section class="card"><h2>Arquivos</h2>${fileItem(content)}</section>`;
  if (ui.contentTab === 'performance') return performanceBlocks('', content.id);
  return `<section class="card"><h2>Teoria</h2><p>${esc(content.description)}</p><div class="notice">${esc(content.body || 'Sem texto cadastrado.')}</div><p class="muted">Tipo: ${esc(content.type)} · Status: ${esc(content.status)} · Última revisão: ${formatDate(content.lastReviewedAt)}</p></section>`;
}
function questionItem(q) { return `<strong>${esc(q.statement)}</strong><div class="muted">${esc(topicName(q.topicId))} · ${esc(contentName(q.contentId))}</div><div class="row"><button class="btn" onclick="openModal('question','${q.id}')">Editar</button><button class="btn danger" onclick="removeItem('questions','${q.id}')">Excluir</button></div>`; }
function flashcardItem(card) { return `<strong>${esc(card.front)}</strong><p class="muted">${esc(contentName(card.contentId))} · domínio: ${esc(card.mastery)}</p><details><summary>Ver verso</summary>${esc(card.back)}</details><div class="row">${['errei', 'lembrei com dificuldade', 'lembrei parcialmente', 'lembrei bem', 'muito fácil'].map((result) => `<button class="btn" onclick="reviewFlashcard('${card.id}','${result}')">${result}</button>`).join('')}</div>`; }
function fileItem(content) { return `<strong>${esc(content.title)}</strong><div class="muted">${esc(content.type)}</div>${content.fileUrl ? `<a class="btn" href="${esc(content.fileUrl)}" target="_blank">Abrir PDF/arquivo</a>` : ''}${content.externalLink ? `<a class="btn" href="${esc(content.externalLink)}" target="_blank">Abrir link</a>` : ''}`; }

function questionsPage() { if (session) return layout(sessionHtml()); return layout(`<div class="between"><div><h1>Questões</h1><p class="muted">Sessão limpa, uma questão por vez.</p></div><button class="btn primary" onclick="startQuestionSession()">Iniciar sessão</button></div>${sessionFilters()}<section class="card" style="margin-top:16px"><h2>Banco de questões</h2>${itemList(state.questions, questionItem)}</section>`); }
function sessionFilters() { return `<section class="card"><div class="form-grid"><label>Matéria<select id="filter-subject" class="input"><option value="">Todas</option>${options(state.subjects, 'id', 'name')}</select></label><label>Tópico<select id="filter-topic" class="input"><option value="">Todos</option>${options(state.topics, 'id', 'title')}</select></label><label>Conteúdo<select id="filter-content" class="input"><option value="">Todos</option>${options(state.contents, 'id', 'title')}</select></label><label>Quantidade<input id="filter-count" class="input" type="number" value="10" min="1"></label><label>Tipo<select id="filter-type" class="input"><option value="">Todos</option><option>múltipla escolha</option><option>verdadeiro ou falso</option><option>flashcard</option></select></label><label>Dificuldade<select id="filter-difficulty" class="input"><option value="">Todas</option><option>baixa</option><option>média</option><option>alta</option></select></label></div></section>`; }
function startQuestionSession(contentId = '') {
  const content = contentId ? byId(state.contents, contentId) : null;
  const subjectId = content?.subjectId || document.getElementById('filter-subject')?.value || '';
  const topicId = content?.topicId || document.getElementById('filter-topic')?.value || '';
  const forcedContentId = contentId || document.getElementById('filter-content')?.value || '';
  const type = document.getElementById('filter-type')?.value || '';
  const difficulty = document.getElementById('filter-difficulty')?.value || '';
  const count = Number(document.getElementById('filter-count')?.value || 10);
  const questions = state.questions.filter((q) => (!subjectId || q.subjectId === subjectId) && (!topicId || q.topicId === topicId) && (!forcedContentId || q.contentId === forcedContentId) && (!type || q.type === type) && (!difficulty || q.difficulty === difficulty)).slice(0, count);
  if (!questions.length) return setMessage('Nenhuma questão encontrada para os filtros selecionados.');
  session = { mode: 'question', topicId, questions, index: 0, selected: '', answered: false, confidence: 'Estava em dúvida', results: [] };
  ui.route = '/questoes'; location.hash = '/questoes'; render();
}
function startDiagnosis(topicId) {
  const questions = state.questions.filter((question) => question.topicId === topicId);
  if (!questions.length) return setMessage('Este tópico ainda não tem questões cadastradas.');
  session = { mode: 'diagnosis', topicId, questions, index: 0, selected: '', answered: false, confidence: 'Estava em dúvida', results: [] };
  ui.route = '/diagnostico'; location.hash = '/diagnostico'; render();
}
function sessionHtml() {
  if (session.index >= session.questions.length) return sessionSummary();
  const q = session.questions[session.index];
  return `<section class="diagnosis-card"><div class="between"><div><span class="eyebrow">${session.mode === 'diagnosis' ? 'Diagnóstico de domínio' : 'Sessão de questões'}</span><h1>Questão ${session.index + 1} de ${session.questions.length}</h1><p class="muted">${esc(subjectName(q.subjectId))} · ${esc(topicName(q.topicId))} · ${esc(contentName(q.contentId))}</p></div><button class="btn" onclick="session=null; render()">Encerrar</button></div><h2>${esc(q.statement)}</h2>${q.alternatives.map((alt) => `<button class="btn answer ${session.selected === alt ? 'selected' : ''}" ${session.answered ? 'disabled' : ''} onclick="session.selected='${esc(alt)}'; render()">${esc(alt)}</button>`).join('')}${session.answered ? answeredBlock(q) : `<button class="btn primary" style="margin-top:14px" onclick="answerCurrent()">Responder</button>`}</section>`;
}
function answerCurrent() { if (!session.selected) return setMessage('Selecione uma alternativa antes de responder.'); session.answered = true; render(); }
function answeredBlock(q) { const correct = session.selected === q.correctAnswer; return `<div class="notice" style="margin-top:14px"><strong>${correct ? 'Você acertou.' : 'Você errou.'}</strong><p>${esc(q.explanation)}</p><p class="muted">Resposta correta: ${esc(q.correctAnswer)}</p></div><label style="margin-top:12px">Como você se sentiu ao responder?<select class="input" onchange="session.confidence=this.value">${confidenceOptions.map((option) => `<option ${session.confidence === option ? 'selected' : ''}>${option}</option>`).join('')}</select></label><button class="btn primary" style="margin-top:14px" onclick="saveAttemptAndNext()">${session.index === session.questions.length - 1 ? 'Finalizar' : 'Próxima questão'}</button>`; }
function saveAttemptAndNext() { const q = session.questions[session.index]; const isCorrect = session.selected === q.correctAnswer; const attempt = { id: uid('att'), questionId: q.id, userId: state.user.id, selectedAnswer: session.selected, isCorrect, confidenceLevel: session.confidence, createdAt: new Date().toISOString() }; state.attempts.push(attempt); session.results.push(attempt); state.user.xp += isCorrect ? 18 : 8; session.index += 1; session.selected = ''; session.answered = false; session.confidence = 'Estava em dúvida'; save(); render(); }
function sessionSummary() { const total = session.results.length; const correct = session.results.filter((r) => r.isCorrect).length; const confidence = total ? Math.round(session.results.reduce((sum, r) => sum + confidenceScore[r.confidenceLevel], 0) / total * 100) : 0; const zone = zoneForScore(topicPriorityScore(byId(state.topics, session.topicId) || state.topics[0])); return `<section class="diagnosis-card"><span class="eyebrow">Relatório</span><h1>Diagnóstico finalizado</h1><div class="grid cols-4">${statCard('Acertos', correct)}${statCard('Erros', total - correct)}${statCard('Aproveitamento', `${total ? Math.round((correct / total) * 100) : 0}%`)}${statCard('Confiança média', `${confidence}%`)}</div><div class="notice"><strong>Classificação: ${zoneLabel(zone)}</strong><p>Recomendação: estude a teoria de ${esc(topicName(session.topicId))} e refaça uma lista curta de questões.</p></div><button class="btn primary" onclick="session=null; render()">Voltar</button></section>`; }

function flashcardsPage() { return layout(`<div class="between"><div><h1>Flashcards</h1><p class="muted">Revisão por conteúdo com domínio atualizado.</p></div><button class="btn primary" onclick="openModal('flashcard')">Criar flashcard</button></div>${itemList(state.flashcards, flashcardItem)}`); }
function reviewFlashcard(id, result) { const card = byId(state.flashcards, id); card.lastReviewedAt = today; card.mastery = result === 'errei' ? 'fraco' : result.includes('dificuldade') ? 'revisar' : result.includes('parcialmente') ? 'médio' : 'dominado'; state.flashcardReviews.push({ id: uid('fcr'), flashcardId: id, userId: state.user.id, reviewResult: result, createdAt: new Date().toISOString() }); state.user.xp += result === 'errei' ? 4 : 10; save(); render(); }
function examsPage() { return layout(`<div class="between"><div><h1>Provas</h1><p class="muted">Provas aumentam a prioridade dos tópicos vinculados.</p></div><button class="btn primary" onclick="openModal('exam')">Adicionar prova</button></div>${registryList('exams')}`); }
function tasksPage() { return layout(`<div class="between"><div><h1>Tarefas</h1><p class="muted">Tarefas e trabalhos ligados à agenda.</p></div><button class="btn primary" onclick="openModal('task')">Adicionar tarefa</button></div>${registryList('tasks')}`); }
function performancePage() { return layout(`<h1>Desempenho</h1>${performanceBlocks()}`); }
function performanceBlocks(subjectId = '', contentId = '') { const filter = contentId ? { contentId } : subjectId ? { subjectId } : {}; const overall = performance(filter); const weak = [...state.contents].filter((c) => !subjectId || c.subjectId === subjectId).sort((a, b) => priorityForContent(b) - priorityForContent(a)).slice(0, 5); return `<div class="grid cols-4">${statCard('Desempenho geral', `${overall.score}%`)}${statCard('Questões', overall.total)}${statCard('Taxa de acerto', `${overall.accuracy}%`)}${statCard('Confiança', `${overall.confidence}%`)}</div><div class="grid cols-2" style="margin-top:16px"><section class="card"><h2>Por matéria</h2>${itemList(state.subjects.filter((s) => !subjectId || s.id === subjectId), (s) => `${esc(s.name)}${progress(performance({ subjectId: s.id }).score)}`)}</section><section class="card"><h2>Por tópico</h2>${itemList(state.topics.filter((t) => !subjectId || t.subjectId === subjectId), (t) => `${esc(t.title)}${progress(performance({ topicId: t.id }).score)}`)}</section><section class="card"><h2>Conteúdos mais fracos</h2>${itemList(weak, (c) => `${esc(c.title)}<div class="muted">${zoneLabel(zoneForScore(priorityForContent(c)))}</div>`)}</section><section class="card"><h2>Evolução semanal</h2>${progress(Math.min(100, Math.round((overall.total / state.user.weeklyGoal) * 100)))}<p class="muted">${overall.total}/${state.user.weeklyGoal} questões da meta semanal.</p></section></div>`; }
function settingsPage() { return layout(`<h1>Configurações</h1><div class="grid cols-2"><section class="card"><h2>Preferências</h2><label>Nome<input class="input" value="${esc(state.user.name)}" onchange="state.user.name=this.value; save()"></label><label>Meta diária de questões<input class="input" type="number" value="${state.user.dailyGoal}" onchange="state.user.dailyGoal=Number(this.value); save()"></label><label>Meta semanal<input class="input" type="number" value="${state.user.weeklyGoal}" onchange="state.user.weeklyGoal=Number(this.value); save()"></label><button class="btn" onclick="setTheme(state.user.theme === 'dark' ? 'light' : 'dark'); render()">Alternar tema</button></section><section class="card"><h2>Dados</h2><button class="btn" onclick="exportData()">Exportar dados</button><button class="btn danger" onclick="resetData()">Restaurar dados demo</button></section></div>`); }
function exportData() { const data = JSON.stringify(state, null, 2); ui.message = 'Exportação preparada. Copie os dados pelo console do navegador se necessário.'; console.log(data); render(); }
function resetData() { state = structuredClone(seed); save(); setTheme(state.user.theme); render(); }

const registryConfig = {
  subjects: { label: 'Matérias', singular: 'subject', list: 'subjects', search: ['name', 'description'] },
  topics: { label: 'Tópicos', singular: 'topic', list: 'topics', search: ['title', 'description'] },
  contents: { label: 'Conteúdos', singular: 'content', list: 'contents', search: ['title', 'description', 'type'] },
  questions: { label: 'Questões', singular: 'question', list: 'questions', search: ['statement', 'tags'] },
  flashcards: { label: 'Flashcards', singular: 'flashcard', list: 'flashcards', search: ['front', 'back'] },
  exams: { label: 'Provas', singular: 'exam', list: 'exams', search: ['title', 'notes'] },
  tasks: { label: 'Tarefas', singular: 'task', list: 'tasks', search: ['title', 'description'] },
  events: { label: 'Eventos', singular: 'event', list: 'events', search: ['title', 'description', 'type'] },
  files: { label: 'Arquivos', singular: 'content', list: 'contents', search: ['title', 'fileUrl', 'externalLink'], fileOnly: true },
};
function registryPage() { const tabs = Object.entries(registryConfig); const cfg = registryConfig[ui.registryTab]; return layout(`<div class="between"><div><h1>Central de Cadastro</h1><p class="muted">Cadastre e edite tudo por formulários completos, sem prompts.</p></div><button class="btn primary" onclick="openModal('${cfg.singular}')">Adicionar ${cfg.label}</button></div><div class="tabs">${tabs.map(([key, value]) => `<button class="${ui.registryTab === key ? 'active' : ''}" onclick="ui.registryTab='${key}'; render()">${value.label}</button>`).join('')}</div><section class="card"><div class="form-grid"><label>Buscar<input id="registry-search" class="input" oninput="renderRegistryList()" placeholder="Digite para filtrar"></label><label>Filtrar por matéria<select id="registry-subject" class="input" onchange="renderRegistryList()"><option value="">Todas</option>${options(state.subjects, 'id', 'name')}</select></label></div><div id="registry-list" style="margin-top:14px">${registryList(ui.registryTab)}</div></section>`); }
function renderRegistryList() { document.getElementById('registry-list').innerHTML = registryList(ui.registryTab); }
function registryList(key) { const cfg = registryConfig[key]; const search = document.getElementById('registry-search')?.value?.toLowerCase() || ''; const subjectId = document.getElementById('registry-subject')?.value || ''; let items = state[cfg.list] || []; if (cfg.fileOnly) items = items.filter((item) => item.fileUrl || item.externalLink); if (subjectId) items = items.filter((item) => item.subjectId === subjectId); if (search) items = items.filter((item) => cfg.search.some((field) => String(Array.isArray(item[field]) ? item[field].join(', ') : item[field] || '').toLowerCase().includes(search))); return itemList(items, (item) => registryItem(cfg, item)); }
function registryItem(cfg, item) { const title = item.name || item.title || item.statement || item.front; return `<div class="between"><div><strong>${esc(title)}</strong><div class="muted">${item.subjectId ? esc(subjectName(item.subjectId)) : 'Geral'} ${item.topicId ? `· ${esc(topicName(item.topicId))}` : ''}</div></div><div class="row"><button class="btn" onclick="openModal('${cfg.singular}','${item.id}')">Editar</button><button class="btn danger" onclick="removeItem('${cfg.list}','${item.id}')">Excluir</button></div></div>`; }

const fieldSchemas = {
  subject: [{ name: 'name', label: 'Nome', required: true }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'color', label: 'Cor', type: 'color' }],
  topic: [{ name: 'subjectId', label: 'Matéria', type: 'subject', required: true }, { name: 'title', label: 'Título', required: true }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'difficulty', label: 'Dificuldade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'status', label: 'Status', type: 'select', options: ['não iniciado', 'estudando', 'revisando', 'dominado'] }, { name: 'priority', label: 'Prioridade', type: 'select', options: ['baixa', 'média', 'alta'] }],
  content: [{ name: 'subjectId', label: 'Matéria', type: 'subject', required: true }, { name: 'topicId', label: 'Tópico', type: 'topic', required: true }, { name: 'title', label: 'Título', required: true }, { name: 'type', label: 'Tipo', type: 'select', options: ['texto escrito', 'resumo', 'anotação', 'PDF', 'link externo', 'imagem', 'vídeo', 'arquivo complementar'] }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'body', label: 'Corpo do texto', type: 'textarea' }, { name: 'fileUrl', label: 'PDF/imagem/arquivo (link temporário)' }, { name: 'externalLink', label: 'Link externo/vídeo' }, { name: 'status', label: 'Status', type: 'select', options: ['não iniciado', 'estudando', 'estudado', 'revisar depois'] }, { name: 'lastReviewedAt', label: 'Última revisão', type: 'date' }],
  question: [{ name: 'subjectId', label: 'Matéria', type: 'subject', required: true }, { name: 'topicId', label: 'Tópico', type: 'topic', required: true }, { name: 'contentId', label: 'Conteúdo', type: 'content', required: true }, { name: 'statement', label: 'Enunciado', type: 'textarea', required: true }, { name: 'type', label: 'Tipo', type: 'select', options: ['múltipla escolha', 'verdadeiro ou falso', 'flashcard'] }, { name: 'alternatives', label: 'Alternativas (uma por linha)', type: 'textarea' }, { name: 'correctAnswer', label: 'Resposta correta', required: true }, { name: 'explanation', label: 'Explicação', type: 'textarea' }, { name: 'difficulty', label: 'Dificuldade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'tags', label: 'Tags (vírgula)' }, { name: 'source', label: 'Fonte opcional' }, { name: 'status', label: 'Status', type: 'select', options: ['ativa', 'rascunho'] }],
  flashcard: [{ name: 'subjectId', label: 'Matéria', type: 'subject', required: true }, { name: 'topicId', label: 'Tópico', type: 'topic', required: true }, { name: 'contentId', label: 'Conteúdo', type: 'content', required: true }, { name: 'front', label: 'Frente', type: 'textarea', required: true }, { name: 'back', label: 'Verso', type: 'textarea', required: true }, { name: 'difficulty', label: 'Dificuldade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'mastery', label: 'Domínio', type: 'select', options: ['novo', 'fraco', 'revisar', 'médio', 'dominado'] }, { name: 'lastReviewedAt', label: 'Última revisão', type: 'date' }],
  exam: [{ name: 'title', label: 'Título da prova', required: true }, { name: 'subjectId', label: 'Matéria', type: 'subject', required: true }, { name: 'date', label: 'Data', type: 'date' }, { name: 'time', label: 'Horário', type: 'time' }, { name: 'topics', label: 'Tópicos que vão cair (IDs separados por vírgula)' }, { name: 'contents', label: 'Conteúdos relacionados (IDs separados por vírgula)' }, { name: 'difficulty', label: 'Dificuldade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'importance', label: 'Peso/importância', type: 'number' }, { name: 'preparationStatus', label: 'Status de preparação', type: 'select', options: ['não comecei', 'comecei', 'em andamento', 'quase pronto', 'preparado'] }, { name: 'notes', label: 'Observações', type: 'textarea' }],
  task: [{ name: 'title', label: 'Título', required: true }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'date', label: 'Data', type: 'date' }, { name: 'time', label: 'Horário', type: 'time' }, { name: 'type', label: 'Tipo', type: 'select', options: eventTypes }, { name: 'subjectId', label: 'Matéria', type: 'subject' }, { name: 'topicId', label: 'Tópico', type: 'topic' }, { name: 'priority', label: 'Prioridade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'status', label: 'Status', type: 'select', options: ['pendente', 'em andamento', 'concluída'] }, { name: 'notes', label: 'Observações', type: 'textarea' }],
  event: [{ name: 'title', label: 'Título', required: true }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'type', label: 'Tipo de evento', type: 'select', options: eventTypes }, { name: 'date', label: 'Data', type: 'date' }, { name: 'time', label: 'Horário', type: 'time' }, { name: 'subjectId', label: 'Matéria', type: 'subject' }, { name: 'topicId', label: 'Tópico', type: 'topic' }, { name: 'priority', label: 'Prioridade', type: 'select', options: ['baixa', 'média', 'alta'] }, { name: 'status', label: 'Status', type: 'select', options: ['pendente', 'em andamento', 'concluído'] }, { name: 'notes', label: 'Observações', type: 'textarea' }],
};
const collectionForType = { subject: 'subjects', topic: 'topics', content: 'contents', question: 'questions', flashcard: 'flashcards', exam: 'exams', task: 'tasks', event: 'events' };
const prefixForType = { subject: 'sub', topic: 'top', content: 'cont', question: 'q', flashcard: 'fc', exam: 'exam', task: 'task', event: 'ev' };
function renderModal() { const { type, id, defaults } = ui.modal; const collection = collectionForType[type]; const current = id ? byId(state[collection], id) : defaultItem(type, defaults); return `<div class="modal-backdrop"><section class="modal"><div class="between"><div><span class="eyebrow">${id ? 'Editar' : 'Adicionar'}</span><h2>${formTitle(type)}</h2></div><button class="btn" onclick="closeModal()">Cancelar</button></div><form onsubmit="submitModal(event, '${type}', '${id}')" class="form-grid">${fieldSchemas[type].map((field) => fieldHtml(field, current)).join('')}<div class="form-actions"><button class="btn" type="button" onclick="closeModal()">Cancelar</button><button class="btn primary" type="submit">Salvar</button></div></form></section></div>`; }
function formTitle(type) { return ({ subject: 'matéria', topic: 'tópico', content: 'conteúdo/arquivo', question: 'questão', flashcard: 'flashcard', exam: 'prova', task: 'tarefa', event: 'evento' })[type]; }
function defaultItem(type, defaults = {}) { const base = { id: uid(prefixForType[type]), subjectId: state.subjects[0]?.id || '', topicId: state.topics[0]?.id || '', contentId: state.contents[0]?.id || '', title: '', date: today, time: '18:00', difficulty: 'média', priority: 'média', status: 'pendente', createdAt: today, lastReviewedAt: today, alternatives: ['Verdadeiro', 'Falso'], tags: [] }; return { ...base, ...defaults }; }
function options(items, valueKey, labelKey, selected = '') { return items.map((item) => `<option value="${esc(item[valueKey])}" ${item[valueKey] === selected ? 'selected' : ''}>${esc(item[labelKey])}</option>`).join(''); }
function fieldHtml(field, item) { const value = Array.isArray(item[field.name]) ? item[field.name].join('\n') : (item[field.name] ?? ''); const required = field.required ? 'required' : ''; if (field.type === 'textarea') return `<label>${field.label}<textarea name="${field.name}" class="input" ${required}>${esc(value)}</textarea></label>`; if (field.type === 'select') return `<label>${field.label}<select name="${field.name}" class="input" ${required}>${field.options.map((option) => `<option ${option === value ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select></label>`; if (field.type === 'subject') return `<label>${field.label}<select name="${field.name}" class="input" ${required}><option value="">Sem matéria</option>${options(state.subjects, 'id', 'name', value)}</select></label>`; if (field.type === 'topic') return `<label>${field.label}<select name="${field.name}" class="input" ${required}><option value="">Sem tópico</option>${options(state.topics, 'id', 'title', value)}</select></label>`; if (field.type === 'content') return `<label>${field.label}<select name="${field.name}" class="input" ${required}><option value="">Sem conteúdo</option>${options(state.contents, 'id', 'title', value)}</select></label>`; return `<label>${field.label}<input name="${field.name}" class="input" type="${field.type || 'text'}" value="${esc(value)}" ${required}></label>`; }
function submitModal(event, type, id) { event.preventDefault(); const collection = collectionForType[type]; const form = new FormData(event.target); const item = id ? byId(state[collection], id) : defaultItem(type, ui.modal.defaults); fieldSchemas[type].forEach((field) => { let value = form.get(field.name) || ''; if (['alternatives'].includes(field.name)) value = String(value).split('\n').map((part) => part.trim()).filter(Boolean); if (['topics', 'contents', 'tags'].includes(field.name)) value = String(value).split(/[\n,]/).map((part) => part.trim()).filter(Boolean); if (field.type === 'number') value = Number(value || 0); item[field.name] = value; }); if (!id) state[collection].push(item); save(); ui.modal = null; render(); }
function removeItem(collection, id) { state[collection] = state[collection].filter((item) => item.id !== id); save(); render(); }

function render() {
  const route = location.hash.replace('#', '') || ui.route || '/'; ui.route = route;
  if (!hasAccess() || route === '/acesso') { document.getElementById('app').innerHTML = accessPage(); return; }
  if (route.startsWith('/materia/')) document.getElementById('app').innerHTML = subjectDetails(route.split('/').pop());
  else if (route.startsWith('/conteudo/')) document.getElementById('app').innerHTML = contentPage(route.split('/').pop());
  else if (route === '/') document.getElementById('app').innerHTML = dashboard();
  else if (route === '/agenda') document.getElementById('app').innerHTML = agendaPage();
  else if (route === '/materias') document.getElementById('app').innerHTML = subjectsPage();
  else if (route === '/central-estudos') document.getElementById('app').innerHTML = centralStudiesPage();
  else if (route === '/diagnostico') document.getElementById('app').innerHTML = diagnosisPage();
  else if (route === '/questoes') document.getElementById('app').innerHTML = questionsPage();
  else if (route === '/flashcards') document.getElementById('app').innerHTML = flashcardsPage();
  else if (route === '/provas') document.getElementById('app').innerHTML = examsPage();
  else if (route === '/tarefas') document.getElementById('app').innerHTML = tasksPage();
  else if (route === '/desempenho') document.getElementById('app').innerHTML = performancePage();
  else if (route === '/cadastro') document.getElementById('app').innerHTML = registryPage();
  else if (route === '/configuracoes') document.getElementById('app').innerHTML = settingsPage();
  else go('/');
}
window.addEventListener('hashchange', render);
render();
