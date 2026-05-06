import ActivityCalendar from '../components/ActivityCalendar';
import { useStudyData } from '../hooks/useStudyData';

export default function Calendar() {
  const { data } = useStudyData();
  return <div className="space-y-6"><h2 className="text-3xl font-black">Calendário principal</h2><ActivityCalendar exams={data.exams} tasks={data.tasks} /></div>;
}
