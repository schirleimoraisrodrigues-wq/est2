export function Card({ children, className = '' }) {
  return <section className={`rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm shadow-slate-200/60 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-none ${className}`}>{children}</section>;
}

export function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
    danger: 'bg-rose-500 text-white hover:bg-rose-600',
  };
  return <button className={`rounded-2xl px-4 py-2 font-semibold transition ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

export function Field({ label, children }) {
  return <label className="grid gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300"><span>{label}</span>{children}</label>;
}

export const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-950';

export function Badge({ children, className = '' }) {
  return <span className={`inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200 ${className}`}>{children}</span>;
}

export function Progress({ value, color = 'bg-indigo-500' }) {
  return <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}
