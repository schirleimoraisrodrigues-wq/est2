import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Card, Field, inputClass } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { loginUser, registerUser } from '../services/auth';

export default function Auth({ mode }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: 'demo@terminalengenharia.app', password: '123456' });
  const [error, setError] = useState('');
  const { updateData } = useStudyData();
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    setError('');
    try {
      updateData((data) => isRegister ? registerUser(data, form) : loginUser(data, form.email, form.password));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return <div className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-4">
    <Card className="w-full max-w-md">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-orange-600">Terminal engenharia</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{isRegister ? 'Crie sua conta' : 'Entre na sua guilda de estudos'}</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Autenticação temporária via LocalStorage até Firebase/Supabase ser conectado.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        {isRegister && <Field label="Nome"><input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>}
        <Field label="E-mail"><input className={inputClass} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Senha"><input className={inputClass} type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
        {error && <p className="rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-600 dark:bg-rose-950 dark:text-rose-200">{error}</p>}
        <Button>{isRegister ? 'Cadastrar' : 'Login'}</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">{isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'} <Link className="font-bold text-indigo-600" to={isRegister ? '/login' : '/cadastro'}>{isRegister ? 'Fazer login' : 'Cadastrar'}</Link></p>
    </Card>
  </div>;
}
