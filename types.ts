
export enum TaskCategory {
  PENTADBIRAN = 'PENGURUSAN PENTADBIRAN',
  KURIKULUM = 'PENGURUSAN KURIKULUM',
  HEM = 'PENGURUSAN HEM',
  KOKURIKULUM = 'PENGURUSAN KOKURIKULUM',
  ULUL_ALBAB = 'PENGURUSAN ULUL ALBAB'
}

export interface Teacher {
  id: string;
  name: string;
  position: string; // e.g., Guru Akademik Biasa, KP, GKMP
  department: string;
}

export interface Task {
  id: string;
  teacherId: string;
  year: number;
  title: string;
  role: string; // New field for Jawatan/Peranan (e.g., Pengerusi, AJK)
  description: string;
  category: TaskCategory;
  createdAt: string;
}

export type ViewState = 'DASHBOARD' | 'SEARCH' | 'ADD_TASK' | 'STATISTICS' | 'SETTINGS';
