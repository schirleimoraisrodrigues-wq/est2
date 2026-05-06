const confidenceWeight = {
  Chutei: 0.2,
  'Estava muito incerta': 0.4,
  'Estava em dúvida entre alternativas': 0.6,
  'Estava confiante': 0.85,
  'Sabia com certeza': 1,
};

export function calculatePerformance(answers = []) {
  if (!answers.length) return { score: 50, correct: 0, wrong: 0, total: 0, confidence: 0.5 };
  const correct = answers.filter((answer) => answer.correct).length;
  const wrong = answers.length - correct;
  const accuracy = correct / answers.length;
  const confidence = answers.reduce((sum, answer) => sum + (confidenceWeight[answer.confidence] || 0.5), 0) / answers.length;
  const score = Math.round((accuracy * 0.7 + confidence * 0.3) * 100);
  return { score, correct, wrong, total: answers.length, confidence };
}

export function subjectPerformance(subjectId, questions, answers) {
  const questionIds = questions.filter((question) => question.subjectId === subjectId).map((question) => question.id);
  return calculatePerformance(answers.filter((answer) => questionIds.includes(answer.questionId)));
}
