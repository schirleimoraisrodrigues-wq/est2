import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStudyData } from '../hooks/useStudyData';
import { logoutUser } from '../services/auth';

const navItems = [
  ['Dashboard', '/', '🏠'],
  ['Calendário', '/calendario', '📅'],
  ['Matérias', '/materias', '📚'],
  ['Provas', '/provas', '📝'],
  ['Tarefas', '/tarefas', '✅'],
  ['Questões', '/questoes', '❓'],
  ['Flashcards', '/flashcards', '⚡'],
  ['Perfil', '/perfil', '👤'],
  ['Configurações', '/configuracoes', '⚙️'],
];

export default function Layout() {
  const { data, currentUser, updateData, toggleTheme } = useStudyData();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    updateData((current) => logoutUser(current));
    navigate('/login');
  }

  const sidebar = <aside className="flex h-full w-72 flex-col bg-slate-950 p-5 text-white">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Terminal engenharia</p>
        <h1 className="text-2xl font-black">Level up studies</h1>
      </div>
      <button className="lg:hidden text-2xl" onClick={() => setOpen(false)}>×</button>
    </div>
    <nav className="grid gap-2">
      {navItems.map(([label, path, icon]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}>
        <span>{icon}</span> {label}
      </NavLink>)}
    </nav>
    <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-300 hover:bg-rose-500 hover:text-white"><span>🚪</span> Sair</button>
  </aside>;

  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
    <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
    {open && <div className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden"><div className="h-full">{sidebar}</div></div>}
    <main className="lg:pl-72">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/40 bg-white/75 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75 sm:px-8">
        <button className="rounded-2xl bg-slate-100 p-2 dark:bg-slate-800 lg:hidden" onClick={() => setOpen(true)}>☰</button>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Olá, {currentUser?.name?.split(' ')[0]} 👋</p>
          <strong>Organize, revise e ganhe XP</strong>
        </div>
        <button onClick={toggleTheme} className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-amber-200" aria-label="Alternar tema">
          {data.theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>
      <div className="p-4 sm:p-8"><Outlet /></div>
    </main>
  </div>;
}
