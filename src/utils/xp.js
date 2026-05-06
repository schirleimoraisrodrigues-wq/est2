export function calculateLevel(xp = 0) {
  return Math.floor(xp / 250) + 1;
}

export function xpForAction(action, correct = false) {
  const map = { task: 35, question: 10, correctQuestion: 25, review: 20, dailyGoal: 50 };
  return action === 'question' && correct ? map.question + map.correctQuestion : map[action] || 0;
}

export function addXpToUser(data, userId, amount) {
  return { ...data, users: data.users.map((user) => (user.id === userId ? { ...user, xp: user.xp + amount } : user)) };
}
