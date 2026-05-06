import { useMemo, useState } from 'react';
import { Badge, Card } from './ui';

const typeColors = {
  prova: 'bg-rose-500',
  trabalho: 'bg-amber-500',
  tarefa: 'bg-indigo-500',
  revisão: 'bg-emerald-500',
  apresentação: 'bg-fuchsia-500',
  'evento acadêmico': 'bg-cyan-500',
};

function normalizeActivities(exams, tasks) {
  return [
    ...exams.map((exam) => ({ ...exam, type: 'prova', label: exam.title })),
    ...tasks.map((task) => ({ ...task, label: task.title })),
  ];
}

export default function ActivityCalendar({ exams, tasks, compact = false }) {
  const [selectedDay, setSelectedDay] = useState('2026-05-06');
  const activities = useMemo(() => normalizeActivities(exams, tasks), [exams, tasks]);
  const days = Array.from({ length: 31 }, (_, index) => `2026-05-${String(index + 1).padStart(2, '0')}`);
  const selectedActivities = activities.filter((activity) => activity.date === selectedDay);

  return <Card className={compact ? 'p-4' : ''}>
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Maio 2026</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Provas, tarefas, revisões, apresentações e eventos.</p>
      </div>
      <Badge>{selectedActivities.length} no dia</Badge>
    </div>
    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500">
      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      {days.map((day) => {
        const daily = activities.filter((activity) => activity.date === day);
        return <button key={day} onClick={() => setSelectedDay(day)} className={`min-h-14 rounded-2xl border p-1 text-left transition hover:border-indigo-400 ${selectedDay === day ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950'}`}>
          <span className="font-black text-slate-800 dark:text-slate-100">{Number(day.slice(-2))}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {daily.slice(0, compact ? 2 : 4).map((activity) => <span key={activity.id} title={activity.label} className={`h-2 w-2 rounded-full ${typeColors[activity.type] || 'bg-slate-400'}`} />)}
          </div>
        </button>;
      })}
    </div>
    <div className="mt-4 space-y-2">
      <h4 className="font-bold text-slate-900 dark:text-white">Atividades de {selectedDay.split('-').reverse().join('/')}</h4>
      {selectedActivities.length ? selectedActivities.map((activity) => <div key={activity.id} className="rounded-2xl bg-slate-50 p-3 text-sm dark:bg-slate-950">
        <strong className="text-slate-900 dark:text-white">{activity.label}</strong>
        <p className="text-slate-500 dark:text-slate-400">{activity.time} • {activity.type}</p>
      </div>) : <p className="text-sm text-slate-500">Nenhuma atividade cadastrada neste dia.</p>}
    </div>
  </Card>;
}
