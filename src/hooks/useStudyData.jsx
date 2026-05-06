import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadData, saveData } from '../services/storage';
import { applyTheme, toggleThemeValue } from '../utils/theme';

const StudyDataContext = createContext(null);

export function StudyDataProvider({ children }) {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    saveData(data);
    applyTheme(data.theme);
  }, [data]);

  const currentUser = useMemo(() => data.users.find((user) => user.id === data.currentUserId), [data]);

  function updateData(updater) {
    setData((current) => (typeof updater === 'function' ? updater(current) : updater));
  }

  function toggleTheme() {
    setData((current) => ({ ...current, theme: toggleThemeValue(current.theme) }));
  }

  function completeTask(taskId) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) => (task.id === taskId ? { ...task, status: 'concluída' } : task)),
    }));
  }

  const value = { data, currentUser, updateData, toggleTheme, completeTask };
  return <StudyDataContext.Provider value={value}>{children}</StudyDataContext.Provider>;
}

export function useStudyData() {
  const context = useContext(StudyDataContext);
  if (!context) throw new Error('useStudyData deve ser usado dentro de StudyDataProvider.');
  return context;
}
