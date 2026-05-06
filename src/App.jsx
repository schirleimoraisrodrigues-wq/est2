import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useStudyData } from './hooks/useStudyData';
import Auth from './pages/Auth';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Flashcards from './pages/Flashcards';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import Settings from './pages/Settings';
import SubjectDetails from './pages/SubjectDetails';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';

function Protected({ children }) {
  const { currentUser } = useStudyData();
  return currentUser ? children : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  const { currentUser } = useStudyData();
  return currentUser ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<PublicOnly><Auth mode="login" /></PublicOnly>} />
    <Route path="/cadastro" element={<PublicOnly><Auth mode="register" /></PublicOnly>} />
    <Route element={<Protected><Layout /></Protected>}>
      <Route index element={<Dashboard />} />
      <Route path="calendario" element={<Calendar />} />
      <Route path="materias" element={<Subjects />} />
      <Route path="materias/:id" element={<SubjectDetails />} />
      <Route path="provas" element={<Exams />} />
      <Route path="tarefas" element={<Tasks />} />
      <Route path="questoes" element={<Questions />} />
      <Route path="flashcards" element={<Flashcards />} />
      <Route path="perfil" element={<Profile />} />
      <Route path="configuracoes" element={<Settings />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
