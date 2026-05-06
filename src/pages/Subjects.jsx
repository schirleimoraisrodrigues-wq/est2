import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SubjectForm } from '../components/CrudForms';
import { Badge, Button, Card, Progress } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { subjectPerformance } from '../utils/performance';

const blank = { name: '', color: '#6366f1', description: '', priority: 'Média', contents: [] };

export default function Subjects() {
  const { data, updateData } = useStudyData();
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  function save(event) {
    event.preventDefault();
    updateData((current) => ({ ...current, subjects: editing ? current.subjects.map((s) => s.id === editing ? { ...s, ...form } : s) : [...current.subjects, { ...form, id: crypto.randomUUID(), contents: [] }] }));
    setForm(blank); setEditing(null);
  }

  function edit(subject) { setEditing(subject.id); setForm(subject); }
  function remove(id) { updateData((current) => ({ ...current, subjects: current.subjects.filter((s) => s.id !== id) })); }

  return <div className="space-y-6"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">Matérias</h2><Badge>{data.subjects.length} cadastradas</Badge></div>
    <Card><SubjectForm form={form} setForm={setForm} onSubmit={save} onCancel={editing ? () => { setEditing(null); setForm(blank); } : null} /></Card>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{data.subjects.map((subject) => {
      const pending = data.tasks.filter((task) => task.subjectId === subject.id && task.status !== 'concluída').length;
      const perf = subjectPerformance(subject.id, data.questions, data.answers).score;
      return <Card key={subject.id} className="space-y-4"><Link to={`/materias/${subject.id}`}><div className="h-2 rounded-full" style={{ background: subject.color }} /><h3 className="mt-4 text-2xl font-black">{subject.name}</h3><p className="text-slate-500 dark:text-slate-400">{subject.description}</p></Link><div className="grid grid-cols-2 gap-2 text-sm"><Badge>Prioridade {subject.priority}</Badge><Badge>{subject.contents.length} conteúdos</Badge><Badge>{pending} tarefas pendentes</Badge><Badge>{perf}% desempenho</Badge></div><Progress value={perf} /><div className="flex gap-2"><Button variant="secondary" onClick={() => edit(subject)}>Editar</Button><Button variant="danger" onClick={() => remove(subject.id)}>Excluir</Button></div></Card>;
    })}</div>
  </div>;
}
