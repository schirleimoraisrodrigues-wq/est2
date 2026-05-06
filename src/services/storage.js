import { initialData } from '../data/demoData';

const STORAGE_KEY = 'studyquest:data:v1';

export function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveData(initialData);
    return initialData;
  }
  return { ...initialData, ...JSON.parse(stored) };
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData() {
  saveData(initialData);
  return initialData;
}
