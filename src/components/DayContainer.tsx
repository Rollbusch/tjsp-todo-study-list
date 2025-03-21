import React, { useState } from 'react';
import { Todo, Period } from '../types';
import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import DayProgress from './DayProgress';

interface DayContainerProps {
  dayName: string;
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  isCurrentDay: boolean;
}

const DayContainer: React.FC<DayContainerProps> = ({ 
  dayName, 
  todos,
  updateTodo,
  isCurrentDay
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Tradução dos dias da semana para português com números
  const translateDay = (day: string): string => {
    const translations: { [key: string]: string } = {
      'segunda': 'Segunda-feira (24)',
      'terca': 'Terça-feira (25)',
      'quarta': 'Quarta-feira (26)',
      'quinta': 'Quinta-feira (27)',
      'sexta': 'Sexta-feira (28)',
      'segunda31': 'Segunda-feira (31)',
      'terca01': 'Terça-feira (01)',
    };
    return translations[day] || day;
  };

  // Agrupar tarefas por período
  const groupedTodos: Record<Period, Todo[]> = {
    'manhã': todos.filter(todo => todo.period === 'manhã'),
    'tarde': todos.filter(todo => todo.period === 'tarde'),
    'noite': todos.filter(todo => todo.period === 'noite'),
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleTodoUpdate = (updatedTodo: Todo) => {
    updateTodo(updatedTodo);
    setSelectedTodo(null);
  };

  const hasTodosForPeriod = (period: Period): boolean => {
    return groupedTodos[period].length > 0;
  };

  // Função para determinar a cor de fundo com base no bloco
  const getBackgroundColorByBlock = (summary: string | undefined): string => {
    if (!summary) return 'bg-gray-100';
    
    if (summary.includes('Bloco I')) return 'bg-blue-50';
    if (summary.includes('Bloco II')) return 'bg-pink-50';
    if (summary.includes('Revisão')) return 'bg-purple-50';
    if (summary.includes('Avaliação')) return 'bg-yellow-50';
    if (summary.includes('Prática')) return 'bg-green-50';
    if (summary.includes('Planejamento')) return 'bg-indigo-50';
    
    return 'bg-gray-100';
  };

  // Função para determinar a cor de texto com base no bloco
  const getTextColorByBlock = (summary: string | undefined): string => {
    if (!summary) return 'text-gray-600';
    
    if (summary.includes('Bloco I')) return 'text-blue-600';
    if (summary.includes('Bloco II')) return 'text-pink-600';
    if (summary.includes('Revisão')) return 'text-purple-600';
    if (summary.includes('Avaliação')) return 'text-yellow-600';
    if (summary.includes('Prática')) return 'text-green-600';
    if (summary.includes('Planejamento')) return 'text-indigo-600';
    
    return 'text-gray-600';
  };

  // Função para determinar a cor da borda com base no bloco
  const getBorderColorByBlock = (summary: string | undefined): string => {
    if (!summary) return 'border-gray-200';
    
    if (summary.includes('Bloco I')) return 'border-blue-200';
    if (summary.includes('Bloco II')) return 'border-pink-200';
    if (summary.includes('Revisão')) return 'border-purple-200';
    if (summary.includes('Avaliação')) return 'border-yellow-200';
    if (summary.includes('Prática')) return 'border-green-200';
    if (summary.includes('Planejamento')) return 'border-indigo-200';
    
    return 'border-gray-200';
  };

  // Função auxiliar para formatar o nome do período
  const formatPeriodName = (period: Period): string => {
    const periodTranslations: { [key in Period]: string } = {
      'manhã': 'Manhã',
      'tarde': 'Tarde',
      'noite': 'Noite',
    };
    return periodTranslations[period];
  };

  // Verificar se há tarefas para o dia atual
  const hasTodosForDay = todos.length > 0;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{translateDay(dayName)}</h2>
        <DayProgress todos={todos} />
      </div>
      
      {/* Períodos do dia */}
      {hasTodosForDay ? (
        <div className="p-4 space-y-4">
          {Object.entries(groupedTodos).map(([period, periodTodos]) => (
            hasTodosForPeriod(period as Period) && (
               <>
                  {periodTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onClick={handleTodoClick}
                      backgroundColor={getBackgroundColorByBlock(todo.summary)}
                      textColor={getTextColorByBlock(todo.summary)}
                      borderColor={getBorderColorByBlock(todo.summary)}
                      updateTodo={updateTodo}
                    />
                  ))}
               </>
            )
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-500">Não há tarefas programadas para este dia.</p>
        </div>
      )}

      {/* Modal para editar o todo */}
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleModalClose}
          onSave={handleTodoUpdate}
        />
      )}
    </div>
  );
};

export default DayContainer; 