import { Link } from 'react-router-dom';
import ActivityCalendar from '../components/ActivityCalendar';
import { Badge, Button, Card, Progress } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { calculatePriorities } from '../utils/priority';
import { subjectPerformance } from '../utils/performance';

export default function Dashboard() {
  const { data, currentUser } = useStudyData();
  const priorities = calculatePriorities(data);
  const upcomingTasks = data.tasks.filter((task) => task.status !== 'concluída').slice(0, 3);
  const upcomingExams = data.exams.slice(0, 3);
  const weakest = data.subjects.map((subject) => ({ subject, perf: subjectPerformance(subject.id, data.questions, data.answers).score })).sort((a, b) => a.perf - b.perf).slice(0, 3);
  return <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
    <section className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
        <p className="text-indigo-100">Bom estudo, {currentUser?.name}!</p>
        <h2 className="text-4xl font-black">Missão diária: priorizar o que mais importa.</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/15 p-4"><p>Sequência</p><strong className="text-3xl">🔥 {currentUser?.streak} dias</strong></div>
          <div className="rounded-3xl bg-white/15 p-4"><p>Meta diária</p><strong className="text-3xl">{currentUser?.dailyGoal || 0} questões</strong></div>
        </div>
        <Link to="/questoes"><Button className="mt-5 bg-white text-indigo-700 hover:bg-indigo-50">Estudar agora</Button></Link>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card><h3 className="mb-3 text-xl font-black">Prioridades de hoje</h3>{priorities.slice(0, 4).map(({ subject, label, score }) => <div key={subject.id} className="mb-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><div className="flex justify-between"><strong>{subject.name}</strong><Badge>{label}</Badge></div><Progress value={score} /></div>)}</Card>
        <Card><h3 className="mb-3 text-xl font-black">Piores desempenhos</h3>{weakest.map(({ subject, perf }) => <div key={subject.id} className="mb-3"><div className="flex justify-between text-sm"><strong>{subject.name}</strong><span>{perf}%</span></div><Progress value={perf} color="bg-rose-500" /></div>)}</Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card><h3 className="mb-3 text-xl font-black">Próximas tarefas</h3>{upcomingTasks.map((task) => <p key={task.id} className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">{task.title}<br /><span className="text-sm text-slate-500">{task.date} às {task.time}</span></p>)}</Card>
        <Card><h3 className="mb-3 text-xl font-black">Próximas provas</h3>{upcomingExams.map((exam) => <p key={exam.id} className="mb-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">{exam.title}<br /><span className="text-sm text-slate-500">{exam.date} • {exam.status}</span></p>)}</Card>
      </div>
    </section>
    <ActivityCalendar exams={data.exams} tasks={data.tasks} compact />
  </div>;
}
