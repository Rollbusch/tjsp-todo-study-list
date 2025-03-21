import React from 'react';
import { Todo } from '../types';

interface DayProgressProps {
  todos: Todo[];
}

const DayProgress: React.FC<DayProgressProps> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.status === 'completed').length;
  const totalTodos = todos.length;
  const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Retorna cores diferentes com base na porcentagem de progresso
  const getProgressColor = () => {
    if (progressPercentage < 25) return 'bg-red-500';
    if (progressPercentage < 50) return 'bg-yellow-500';
    if (progressPercentage < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2 mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">Progresso: {progressPercentage}%</span>
        <span className="text-xs text-gray-500">{completedTodos} de {totalTodos} tarefas</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${getProgressColor()}`} 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {progressPercentage === 100 && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-700">Todas as tarefas concluídas!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayProgress; 