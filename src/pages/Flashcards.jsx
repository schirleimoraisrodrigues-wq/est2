import { Card, Badge, Button } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';

export default function Flashcards() {
  const { data, updateData } = useStudyData();
  const cards = data.questions.filter((question) => question.type === 'flashcard' || question.type === 'verdadeiro ou falso');
  function review() { updateData((current) => current); }
  return <div className="space-y-6"><h2 className="text-3xl font-black">Flashcards</h2><div className="grid gap-5 md:grid-cols-2">{cards.map((card) => <Card key={card.id} className="space-y-3"><Badge>{data.subjects.find((s) => s.id === card.subjectId)?.name}</Badge><h3 className="text-xl font-black">{card.statement}</h3><details className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"><summary className="cursor-pointer font-bold">Ver resposta</summary><p className="mt-2">{card.correctAnswer}</p><p className="text-sm text-slate-500">{card.explanation}</p></details><Button onClick={review}>Marcar revisão</Button></Card>)}</div></div>;
}
