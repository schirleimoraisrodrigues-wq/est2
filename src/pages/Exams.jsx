import { useState } from 'react';
import { ExamForm } from '../components/CrudForms';
import { Badge, Button, Card } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';

const blank = (subjectId = '') => ({ title: '', subjectId, date: '2026-05-20', time: '08:00', contentsText: '', difficulty: 'média', weight: 5, status: 'não iniciado', notes: '' });
const toForm = (exam) => ({ ...exam, contentsText: exam.contents.join(', ') });
const fromForm = (form) => ({ ...form, contents: form.contentsText.split(',').map((item) => item.trim()).filter(Boolean), weight: Number(form.weight) });

export default function Exams() {
  const { data, updateData } = useStudyData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank(data.subjects[0]?.id));
  function save(event) { event.preventDefault(); const exam = fromForm(form); updateData((current) => ({ ...current, exams: editing ? current.exams.map((item) => item.id === editing ? { ...exam, id: editing } : item) : [...current.exams, { ...exam, id: crypto.randomUUID() }] })); setEditing(null); setForm(blank(data.subjects[0]?.id)); }
  function remove(id) { updateData((current) => ({ ...current, exams: current.exams.filter((exam) => exam.id !== id) })); }
  return <div className="space-y-6"><h2 className="text-3xl font-black">Provas</h2><Card><ExamForm form={form} setForm={setForm} subjects={data.subjects} onSubmit={save} onCancel={editing ? () => { setEditing(null); setForm(blank(data.subjects[0]?.id)); } : null} /></Card><div className="grid gap-5 lg:grid-cols-2">{data.exams.map((exam) => <Card key={exam.id}><div className="flex items-start justify-between gap-3"><div><h3 className="text-2xl font-black">{exam.title}</h3><p className="text-slate-500">{data.subjects.find((s) => s.id === exam.subjectId)?.name} • {exam.date} às {exam.time}</p></div><Badge>{exam.status}</Badge></div><p className="mt-3">Conteúdos: {exam.contents.join(', ')}</p><p className="text-sm text-slate-500">Dificuldade {exam.difficulty} • peso {exam.weight} • {exam.notes}</p><div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => { setEditing(exam.id); setForm(toForm(exam)); }}>Editar</Button><Button variant="danger" onClick={() => remove(exam.id)}>Excluir</Button></div></Card>)}</div></div>;
}
