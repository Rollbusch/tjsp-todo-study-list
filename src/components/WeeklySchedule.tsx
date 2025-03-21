import React from 'react';
import { Todo, WeekDay } from '../types';
import DayContainer from './DayContainer';

interface WeeklyScheduleProps {
  todos: Todo[];
  currentDay: WeekDay;
  setCurrentDay: (day: WeekDay) => void;
  updateTodo: (todo: Todo) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  todos,
  currentDay,
  setCurrentDay,
  updateTodo,
}) => {
  // Lista dos dias da semana + dias adicionais
  const weekDays: WeekDay[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'segunda31', 'terca01'];

  // Números dos dias para cada dia da semana
  const dayNumbers: Record<WeekDay, string> = {
    'domingo': '',
    'segunda': '24',
    'terca': '25',
    'quarta': '26',
    'quinta': '27',
    'sexta': '28',
    'sabado': '',
    'segunda31': '31',
    'terca01': '01',
  };

  // Nomes dos dias para exibição
  const dayNames: Record<WeekDay, string> = {
    'domingo': 'Dom',
    'segunda': 'Seg',
    'terca': 'Ter',
    'quarta': 'Qua',
    'quinta': 'Qui',
    'sexta': 'Sex',
    'sabado': 'Sáb',
    'segunda31': 'Seg',
    'terca01': 'Ter',
  };

  // Filtra os todos para o dia atual
  const currentDayTodos = todos.filter(todo => todo.day === currentDay);

  // Calcula o progresso semanal
  const calculateWeeklyProgress = () => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.status === 'completed').length;
    return totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  };

  // Retorna cores diferentes com base na porcentagem de progresso
  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-yellow-500';
    if (percentage < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const weeklyProgress = calculateWeeklyProgress();

  return (
    <div>
      {/* Progresso Semanal */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Progresso Semanal</h2>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Completado: {weeklyProgress}%</span>
          <span className="text-sm text-gray-500">
            {todos.filter(todo => todo.status === 'completed').length} de {todos.length} tarefas
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(weeklyProgress)}`} 
            style={{ width: `${weeklyProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Legenda dos Blocos */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Legenda</h3>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
            Bloco I - Língua Portuguesa
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-pink-600 border border-pink-100">
            Bloco II - Conhecimentos Específicos
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100">
            Revisão
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600 border border-yellow-100">
            Avaliação
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
            Prática
          </span>
        </div>
      </div>

      {/* Navegação dos dias da semana */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {weekDays.map((day) => {
            // Calcula o progresso para o dia
            const dayTodos = todos.filter(todo => todo.day === day);
            const completedDayTodos = dayTodos.filter(todo => todo.status === 'completed').length;
            const dayProgress = dayTodos.length > 0 ? Math.round((completedDayTodos / dayTodos.length) * 100) : 0;
            
            // Determina se o botão deve ter estilo ativo
            const isActive = day === currentDay;
            
            return (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`relative px-4 py-2 flex flex-col items-center justify-center rounded-md focus:outline-none transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span>{dayNames[day]}</span>
                  {dayNumbers[day] && (
                    <span className="ml-1 text-xs">{dayNumbers[day]}</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
                  <div 
                    className={`h-1 rounded-full ${getProgressColor(dayProgress)}`} 
                    style={{ width: `${dayProgress}%` }}
                  ></div>
                </div>
                {/* Indicador de número de tarefas */}
                {dayTodos.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs bg-gray-200 text-gray-700 rounded-full">
                    {dayTodos.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Container do dia atual */}
      <DayContainer
        dayName={currentDay}
        todos={currentDayTodos}
        updateTodo={updateTodo}
        isCurrentDay={true}
      />
    </div>
  );
};

export default WeeklySchedule; 