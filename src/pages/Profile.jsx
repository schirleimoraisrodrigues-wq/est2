import { Badge, Card } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';

export default function Profile() {
  const { currentUser, data } = useStudyData();
  return <div className="space-y-6"><h2 className="text-3xl font-black">Perfil</h2><Card><div className="flex flex-col gap-5 md:flex-row md:items-center"><div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-4xl font-black text-white">{currentUser?.name?.[0]}</div><div className="flex-1"><h3 className="text-3xl font-black">{currentUser?.name}</h3><p className="text-slate-500">{currentUser?.email}</p><div className="mt-3 flex flex-wrap gap-2"><Badge>🔥 {currentUser?.streak} dias</Badge><Badge>Meta diária: {currentUser?.dailyGoal || 0} questões</Badge></div></div></div></Card><Card><h3 className="text-xl font-black">Conquistas</h3><div className="mt-4 flex flex-wrap gap-2">{currentUser?.achievements.map((item) => <Badge key={item}>🏆 {item}</Badge>)}</div></Card><Card><h3 className="text-xl font-black">Resumo</h3><p>{data.answers.length} respostas registradas • {data.tasks.filter((task) => task.status === 'concluída').length} tarefas concluídas.</p></Card></div>;
}
