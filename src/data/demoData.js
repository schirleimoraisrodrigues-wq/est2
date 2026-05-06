export const confidenceOptions = [
  'Chutei',
  'Estava muito incerta',
  'Estava em dúvida entre alternativas',
  'Estava confiante',
  'Sabia com certeza',
];

export const demoUser = {
  id: 'demo-user',
  name: 'Estudante Terminal engenharia',
  email: 'demo@terminalengenharia.app',
  password: '123456',
  xp: 760,
  streak: 8,
  dailyGoalDone: false,
  achievements: ['Primeira sessão', 'Sequência de 7 dias', 'Mestre dos flashcards'],
};

export const demoSubjects = [
  {
    id: 'calculo-ii',
    name: 'Cálculo II',
    color: '#8b5cf6',
    description: 'Integrais múltiplas, séries e campos vetoriais.',
    priority: 'Alta',
    contents: [
      { id: 'int-duplas', title: 'Integrais duplas', difficulty: 'alta', lastReview: '2026-04-18', progress: 54 },
      { id: 'series', title: 'Séries de Taylor', difficulty: 'média', lastReview: '2026-04-28', progress: 68 },
      { id: 'green', title: 'Teorema de Green', difficulty: 'alta', lastReview: '2026-03-30', progress: 42 },
    ],
  },
  {
    id: 'fluidos',
    name: 'Mecânica dos Fluidos',
    color: '#06b6d4',
    description: 'Hidrostática, escoamentos e conservação de energia.',
    priority: 'Alta',
    contents: [
      { id: 'bernoulli', title: 'Equação de Bernoulli', difficulty: 'alta', lastReview: '2026-04-20', progress: 48 },
      { id: 'reynolds', title: 'Número de Reynolds', difficulty: 'média', lastReview: '2026-05-01', progress: 72 },
    ],
  },
  {
    id: 'materiais',
    name: 'Ciência dos Materiais',
    color: '#f97316',
    description: 'Estruturas, propriedades e ensaios mecânicos.',
    priority: 'Média',
    contents: [
      { id: 'metais', title: 'Propriedades mecânicas dos metais', difficulty: 'média', lastReview: '2026-04-24', progress: 66 },
      { id: 'diagramas', title: 'Diagramas de fase', difficulty: 'alta', lastReview: '2026-04-10', progress: 38 },
    ],
  },
  {
    id: 'fisica',
    name: 'Física',
    color: '#22c55e',
    description: 'Leis de Newton, energia, ondas e eletromagnetismo.',
    priority: 'Baixa',
    contents: [
      { id: 'ondas', title: 'Ondas mecânicas', difficulty: 'média', lastReview: '2026-05-02', progress: 78 },
      { id: 'energia', title: 'Conservação de energia', difficulty: 'baixa', lastReview: '2026-04-29', progress: 84 },
    ],
  },
];

export const demoExams = [
  { id: 'exam-calc', title: 'Prova de Cálculo II', subjectId: 'calculo-ii', date: '2026-05-12', time: '08:00', contents: ['Integrais duplas', 'Séries de Taylor'], difficulty: 'alta', weight: 9, status: 'estudando', notes: 'Refazer listas 3 e 4.' },
  { id: 'exam-fluidos', title: 'Prova de Mecânica dos Fluidos', subjectId: 'fluidos', date: '2026-05-16', time: '10:00', contents: ['Bernoulli', 'Reynolds'], difficulty: 'alta', weight: 10, status: 'não iniciado', notes: 'Levar formulário.' },
  { id: 'exam-mat', title: 'Prova de Ciência dos Materiais', subjectId: 'materiais', date: '2026-05-23', time: '14:00', contents: ['Metais', 'Diagramas de fase'], difficulty: 'média', weight: 8, status: 'quase pronto', notes: 'Revisar ensaios de tração.' },
];

export const demoTasks = [
  { id: 'task-calc-lista', title: 'Resolver lista de Cálculo', description: 'Lista de integrais múltiplas.', subjectId: 'calculo-ii', date: '2026-05-07', time: '19:00', type: 'tarefa', priority: 'Alta', status: 'pendente' },
  { id: 'task-bernoulli', title: 'Estudar Equação de Bernoulli', description: 'Revisão ativa com exercícios.', subjectId: 'fluidos', date: '2026-05-08', time: '18:00', type: 'revisão', priority: 'Alta', status: 'em andamento' },
  { id: 'task-relatorio', title: 'Entregar relatório de Ciência dos Materiais', description: 'Relatório sobre ensaio de tração.', subjectId: 'materiais', date: '2026-05-05', time: '23:59', type: 'trabalho', priority: 'Alta', status: 'pendente' },
  { id: 'task-metais', title: 'Revisar propriedades mecânicas dos metais', description: 'Resumo + flashcards.', subjectId: 'materiais', date: '2026-05-10', time: '16:00', type: 'revisão', priority: 'Média', status: 'pendente' },
  { id: 'task-apresentacao', title: 'Apresentação de projeto integrador', description: 'Simular apresentação para a turma.', subjectId: 'fisica', date: '2026-05-14', time: '09:00', type: 'apresentação', priority: 'Média', status: 'pendente' },
  { id: 'task-evento', title: 'Evento acadêmico de engenharia', description: 'Palestra sobre materiais sustentáveis.', subjectId: 'materiais', date: '2026-05-21', time: '15:00', type: 'evento acadêmico', priority: 'Baixa', status: 'pendente' },
];

export const demoQuestions = [
  { id: 'q1', statement: 'Qual técnica é adequada para calcular integrais duplas em regiões não retangulares?', subjectId: 'calculo-ii', content: 'Integrais duplas', type: 'múltipla escolha', alternatives: ['Separar sempre em constantes', 'Descrever a região com limites variáveis', 'Ignorar a ordem de integração', 'Aplicar apenas derivadas parciais'], correctAnswer: 'Descrever a região com limites variáveis', explanation: 'A região determina os limites de integração e pode exigir troca da ordem.' },
  { id: 'q2', statement: 'A equação de Bernoulli relaciona pressão, velocidade e altura em um escoamento ideal.', subjectId: 'fluidos', content: 'Equação de Bernoulli', type: 'verdadeiro ou falso', alternatives: ['Verdadeiro', 'Falso'], correctAnswer: 'Verdadeiro', explanation: 'Ela expressa conservação de energia mecânica por unidade de volume.' },
  { id: 'q3', statement: 'O aumento de discordâncias tende a elevar qual propriedade dos metais?', subjectId: 'materiais', content: 'Propriedades mecânicas dos metais', type: 'múltipla escolha', alternatives: ['Dureza', 'Transparência', 'Massa molar', 'Condutividade perfeita'], correctAnswer: 'Dureza', explanation: 'Mais discordâncias dificultam o movimento plástico e aumentam a resistência.' },
  { id: 'q4', statement: 'Em um sistema conservativo, a energia mecânica total permanece constante.', subjectId: 'fisica', content: 'Conservação de energia', type: 'flashcard', alternatives: ['Verdadeiro', 'Falso'], correctAnswer: 'Verdadeiro', explanation: 'Sem forças dissipativas, energia cinética e potencial se transformam entre si.' },
];

export const initialData = {
  users: [demoUser],
  currentUserId: null,
  subjects: demoSubjects,
  exams: demoExams,
  tasks: demoTasks,
  questions: demoQuestions,
  answers: [],
  theme: 'light',
};
