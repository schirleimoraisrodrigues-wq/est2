import { Button, Field, inputClass } from './ui';

export function SubjectForm({ form, setForm, onSubmit, onCancel }) {
  return <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950 md:grid-cols-2">
    <Field label="Nome"><input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
    <Field label="Cor"><input className={inputClass} type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></Field>
    <Field label="Prioridade"><select className={inputClass} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Alta</option><option>Média</option><option>Baixa</option></select></Field>
    <Field label="Descrição"><textarea className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
    <div className="flex gap-2 md:col-span-2"><Button>Salvar</Button>{onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>}</div>
  </form>;
}

export function ExamForm({ form, setForm, subjects, onSubmit, onCancel }) {
  return <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950 md:grid-cols-2">
    <Field label="Título"><input className={inputClass} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
    <Field label="Matéria"><select className={inputClass} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
    <Field label="Data"><input className={inputClass} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
    <Field label="Horário"><input className={inputClass} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></Field>
    <Field label="Conteúdos"><input className={inputClass} value={form.contentsText} onChange={(e) => setForm({ ...form, contentsText: e.target.value })} /></Field>
    <Field label="Dificuldade"><select className={inputClass} value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}><option>baixa</option><option>média</option><option>alta</option></select></Field>
    <Field label="Peso/importância"><input className={inputClass} type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} /></Field>
    <Field label="Status"><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>não iniciado</option><option>estudando</option><option>quase pronto</option><option>preparado</option></select></Field>
    <Field label="Observações"><textarea className={inputClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
    <div className="flex gap-2 md:col-span-2"><Button>Salvar</Button>{onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>}</div>
  </form>;
}

export function TaskForm({ form, setForm, subjects, onSubmit, onCancel }) {
  return <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950 md:grid-cols-2">
    {['title:Título', 'description:Descrição'].map((item) => { const [key, label] = item.split(':'); return <Field key={key} label={label}><input className={inputClass} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></Field>; })}
    <Field label="Matéria"><select className={inputClass} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
    <Field label="Data"><input className={inputClass} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
    <Field label="Horário"><input className={inputClass} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></Field>
    <Field label="Tipo"><select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>tarefa</option><option>trabalho</option><option>revisão</option><option>apresentação</option><option>evento acadêmico</option></select></Field>
    <Field label="Prioridade"><select className={inputClass} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Alta</option><option>Média</option><option>Baixa</option></select></Field>
    <Field label="Status"><select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>pendente</option><option>em andamento</option><option>concluída</option></select></Field>
    <div className="flex gap-2 md:col-span-2"><Button>Salvar</Button>{onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>}</div>
  </form>;
}
