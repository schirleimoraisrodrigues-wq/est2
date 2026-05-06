export function loginUser(data, email, password) {
  const user = data.users.find((item) => item.email === email && item.password === password);
  if (!user) throw new Error('E-mail ou senha inválidos. Use demo@terminalengenharia.app / 123456 para testar.');
  return { ...data, currentUserId: user.id };
}

export function registerUser(data, { name, email, password }) {
  if (data.users.some((user) => user.email === email)) throw new Error('Este e-mail já está cadastrado.');
  const user = { id: crypto.randomUUID(), name, email, password, streak: 1, dailyGoalDone: false, achievements: ['Conta criada'] };
  return { ...data, users: [...data.users, user], currentUserId: user.id };
}

export function logoutUser(data) {
  return { ...data, currentUserId: null };
}
