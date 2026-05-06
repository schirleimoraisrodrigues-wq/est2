import { useState } from 'react';
import { confidenceOptions } from '../data/demoData';
import { Badge, Button, Card, Field, inputClass } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { addXpToUser, xpForAction } from '../utils/xp';

const blank = (subjectId = '') => ({ statement: '', subjectId, content: '', type: 'múltipla escolha', alternativesText: 'A\nB\nC\nD', correctAnswer: '', explanation: '' });

export default function Questions() {
  const { data, updateData } = useStudyData();
  const [form, setForm] = useState(blank(data.subjects[0]?.id));
  const [responses, setResponses] = useState({});

  function saveQuestion(event) {
    event.preventDefault();
    const question = { ...form, id: crypto.randomUUID(), alternatives: form.alternativesText.split('\n').filter(Boolean) };
    delete question.alternativesText;
    updateData((current) => ({ ...current, questions: [...current.questions, question] }));
    setForm(blank(data.subjects[0]?.id));
  }

  function answer(question, selected, confidence) {
    const correct = selected === question.correctAnswer;
    const record = { id: crypto.randomUUID(), questionId: question.id, subjectId: question.subjectId, content: question.content, selected, confidence, correct, answeredAt: new Date().toISOString() };
    updateData((current) => addXpToUser({ ...current, answers: [...current.answers, record] }, current.currentUserId, xpForAction('question', correct)));
    setResponses((current) => ({ ...current, [question.id]: { selected: '', confidence: confidenceOptions[0], saved: record } }));
  }

  return <div className="space-y-6"><h2 className="text-3xl font-black">Questões</h2><Card><form onSubmit={saveQuestion} className="grid gap-3 md:grid-cols-2"><Field label="Enunciado"><textarea className={inputClass} required value={form.statement} onChange={(e) => setForm({ ...form, statement: e.target.value })} /></Field><Field label="Matéria"><select className={inputClass} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>{data.subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field><Field label="Conteúdo"><input className={inputClass} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></Field><Field label="Tipo"><select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>múltipla escolha</option><option>verdadeiro ou falso</option><option>flashcard</option></select></Field><Field label="Alternativas (uma por linha)"><textarea className={inputClass} value={form.alternativesText} onChange={(e) => setForm({ ...form, alternativesText: e.target.value })} /></Field><Field label="Resposta correta"><input className={inputClass} value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} /></Field><Field label="Explicação"><textarea className={inputClass} value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} /></Field><div className="md:col-span-2"><Button>Cadastrar questão</Button></div></form></Card>
    {data.questions.map((question) => { const state = responses[question.id] || { selected: '', confidence: confidenceOptions[0] }; return <Card key={question.id} className="space-y-4"><div className="flex flex-wrap gap-2"><Badge>{data.subjects.find((s) => s.id === question.subjectId)?.name}</Badge><Badge>{question.content}</Badge><Badge>{question.type}</Badge></div><h3 className="text-xl font-black">{question.statement}</h3><div className="grid gap-2 sm:grid-cols-2">{question.alternatives.map((alt) => <label key={alt} className={`rounded-2xl border p-3 ${state.selected === alt ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950' : 'border-slate-200 dark:border-slate-800'}`}><input type="radio" name={question.id} className="mr-2" checked={state.selected === alt} onChange={() => setResponses((current) => ({ ...current, [question.id]: { ...state, selected: alt } }))} />{alt}</label>)}</div><Field label="Como você se sentiu ao responder essa questão?"><select className={inputClass} value={state.confidence} onChange={(e) => setResponses((current) => ({ ...current, [question.id]: { ...state, confidence: e.target.value } }))}>{confidenceOptions.map((option) => <option key={option}>{option}</option>)}</select></Field><Button disabled={!state.selected} onClick={() => answer(question, state.selected, state.confidence)}>Responder e salvar</Button>{state.saved && <div className={`rounded-2xl p-4 ${state.saved.correct ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200' : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200'}`}><strong>{state.saved.correct ? 'Acertou!' : 'Errou.'}</strong><p>{question.explanation}</p><p>Confiança registrada: {state.saved.confidence}</p></div>}</Card>; })}</div>;
}
