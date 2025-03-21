export type WeekDay = 'domingo' | 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'segunda31' | 'terca01';
export type Period = 'manhã' | 'tarde' | 'noite';
export type TodoStatus = 'pending' | 'in-progress' | 'completed';
export type TodoBlock = 'Bloco I' | 'Bloco II' | 'Revisão' | 'Avaliação' | 'Prática' | 'Planejamento';

export interface Todo {
  id: string;
  title: string;
  duration?: string;
  day: WeekDay;
  period: Period;
  status: TodoStatus;
  summary?: string;
  performance?: number; // Desempenho em simulados (0-100)
  materials?: string[]; // Lista de materiais recomendados
  notes?: string; // Anotações de pontos críticos
  timeSpent?: number; // Tempo gasto em minutos
} 