import { subjectPerformance } from './performance';

const difficultyPoints = { baixa: 4, média: 10, alta: 18 };
const confidencePriority = {
  Chutei: 24,
  'Estava muito incerta': 18,
  'Estava em dúvida entre alternativas': 10,
  'Estava confiante': -8,
  'Sabia com certeza': -16,
};

function daysUntil(date) {
  const today = new Date('2026-05-06T00:00:00');
  return Math.ceil((new Date(`${date}T00:00:00`) - today) / 86400000);
}

function labelFromScore(score) {
  if (score >= 70) return 'Alta';
  if (score >= 40) return 'Média';
  return 'Baixa';
}

export function calculateSubjectPriority(subject, { exams, tasks, questions, answers }) {
  const performance = subjectPerformance(subject.id, questions, answers).score;
  let score = Math.max(0, 70 - performance);

  exams.filter((exam) => exam.subjectId === subject.id).forEach((exam) => {
    const days = daysUntil(exam.date);
    if (days >= 0 && days <= 7) score += 30;
    if (exam.difficulty === 'alta') score += 12;
    score += Number(exam.weight || 0);
  });

  tasks.filter((task) => task.subjectId === subject.id && task.status !== 'concluída').forEach((task) => {
    const days = daysUntil(task.date);
    if (days < 0) score += 25;
    if (days <= 3) score += 14;
    if (task.priority === 'Alta') score += 10;
  });

  subject.contents.forEach((content) => {
    score += difficultyPoints[content.difficulty] || 8;
    if (daysUntil(content.lastReview) < -10) score += 12;
  });

  answers.filter((answer) => answer.subjectId === subject.id).forEach((answer) => {
    if (answer.correct) score += confidencePriority[answer.confidence] || 0;
    if (!answer.correct && answer.confidence === 'Estava confiante') score += 30;
    if (!answer.correct && answer.confidence === 'Chutei') score += 18;
  });

  return { score: Math.max(0, Math.round(score)), label: labelFromScore(score) };
}

export function calculatePriorities(data) {
  return data.subjects
    .map((subject) => ({ subject, ...calculateSubjectPriority(subject, data) }))
    .sort((a, b) => b.score - a.score);
}
