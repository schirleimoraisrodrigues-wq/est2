import { useState } from 'react';
import { TaskForm } from '../components/CrudForms';
import { Badge, Button, Card } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';

const blank = (subjectId = '') => ({ title: '', description: '', subjectId, date: '2026-05-20', time: '18:00', type: 'tarefa', priority: 'Média', status: 'pendente' });
export default function Tasks() {
  const { data, updateData, completeTask } = useStudyData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank(data.subjects[0]?.id));
  function save(event) { event.preventDefault(); updateData((current) => ({ ...current, tasks: editing ? current.tasks.map((item) => item.id === editing ? { ...form, id: editing } : item) : [...current.tasks, { ...form, id: crypto.randomUUID() }] })); setEditing(null); setForm(blank(data.subjects[0]?.id)); }
  function remove(id) { updateData((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== id) })); }
  return <div className="space-y-6"><h2 className="text-3xl font-black">Tarefas, trabalhos, revisões e eventos</h2><Card><TaskForm form={form} setForm={setForm} subjects={data.subjects} onSubmit={save} onCancel={editing ? () => { setEditing(null); setForm(blank(data.subjects[0]?.id)); } : null} /></Card><div className="grid gap-5 lg:grid-cols-2">{data.tasks.map((task) => <Card key={task.id}><div className="flex items-start justify-between"><div><h3 className="text-xl font-black">{task.title}</h3><p className="text-slate-500">{data.subjects.find((s) => s.id === task.subjectId)?.name} • {task.date} às {task.time}</p></div><Badge>{task.type}</Badge></div><p className="mt-2">{task.description}</p><p className="text-sm text-slate-500">Prioridade {task.priority} • status {task.status}</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="secondary" onClick={() => { setEditing(task.id); setForm(task); }}>Editar</Button><Button variant="danger" onClick={() => remove(task.id)}>Excluir</Button>{task.status !== 'concluída' && <Button onClick={() => completeTask(task.id)}>Concluir +XP</Button>}</div></Card>)}</div></div>;
}
