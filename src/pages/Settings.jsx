import { Button, Card } from '../components/ui';
import { useStudyData } from '../hooks/useStudyData';
import { resetData } from '../services/storage';

export default function Settings() {
  const { data, updateData, toggleTheme } = useStudyData();
  return <div className="space-y-6"><h2 className="text-3xl font-black">Configurações</h2><Card><h3 className="text-xl font-black">Tema</h3><p className="mb-4 text-slate-500">O tema atual ({data.theme === 'dark' ? 'escuro' : 'claro'}) fica salvo no LocalStorage e permanece após recarregar.</p><Button onClick={toggleTheme}>Alternar tema</Button></Card><Card><h3 className="text-xl font-black">Dados locais</h3><p className="mb-4 text-slate-500">Enquanto Firebase/Supabase não está conectado, tudo é salvo no LocalStorage.</p><Button variant="danger" onClick={() => updateData(resetData())}>Restaurar dados de demonstração</Button></Card></div>;
}
