import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Card, Progress } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { subjectPerformance } from '../utils/performance';
import { calculateSubjectPriority } from '../utils/priority';

const tabs = ['Conteúdos', 'Tarefas', 'Provas', 'Questões', 'Desempenho'];

export default function SubjectDetails() {
  const { id } = useParams();
  const { data } = useStudyData();
  const [tab, setTab] = useState('Conteúdos');
  const subject = data.subjects.find((item) => item.id === id);
  if (!subject) return <Card>Matéria não encontrada.</Card>;
  const tasks = data.tasks.filter((item) => item.subjectId === id);
  const exams = data.exams.filter((item) => item.subjectId === id);
  const questions = data.questions.filter((item) => item.subjectId === id);
  const perf = subjectPerformance(id, data.questions, data.answers);
  const priority = calculateSubjectPriority(subject, data);
  const progress = subject.contents.length ? Math.round(subject.contents.reduce((sum, content) => sum + content.progress, 0) / subject.contents.length) : 0;

  return <div className="space-y-6"><Card><div className="h-2 rounded-full" style={{ background: subject.color }} /><h2 className="mt-4 text-4xl font-black">{subject.name}</h2><p className="text-slate-500 dark:text-slate-400">{subject.description}</p><div className="mt-4 grid gap-3 md:grid-cols-4"><Badge>Prioridade {priority.label}</Badge><Badge>Desempenho {perf.score}%</Badge><Badge>Progresso {progress}%</Badge><Badge>{questions.length} questões</Badge></div><div className="mt-4"><Progress value={progress} /></div></Card>
    <div className="flex flex-wrap gap-2">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-2xl px-4 py-2 font-bold ${tab === item ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900'}`}>{item}</button>)}</div>
    <Card>{tab === 'Conteúdos' && subject.contents.map((content) => <div key={content.id} className="mb-4"><strong>{content.title}</strong><p className="text-sm text-slate-500">Dificuldade {content.difficulty} • última revisão {content.lastReview}</p><Progress value={content.progress} /></div>)}
      {tab === 'Tarefas' && tasks.map((task) => <p key={task.id} className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">{task.title} • {task.status}</p>)}
      {tab === 'Provas' && exams.map((exam) => <p key={exam.id} className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">{exam.title} • {exam.date} • {exam.status}</p>)}
      {tab === 'Questões' && questions.map((question) => <p key={question.id} className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">{question.statement}</p>)}
      {tab === 'Desempenho' && <div><h3 className="text-xl font-black">Resumo</h3><p>Acertos: {perf.correct} • Erros: {perf.wrong} • Respondidas: {perf.total} • Confiança média: {Math.round(perf.confidence * 100)}%</p><Progress value={perf.score} /></div>}
    </Card></div>;
}
