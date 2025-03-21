import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  updateTodo?: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onClick, 
  backgroundColor, 
  textColor, 
  borderColor,
  updateTodo
}) => {
  // Define as classes CSS com base no status da tarefa
  const getStatusClass = () => {
    switch (todo.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return `${backgroundColor || 'bg-white'} ${borderColor || 'border-gray-200'}`;
    }
  };

  // Define o ícone de status
  const getStatusIcon = () => {
    switch (todo.status) {
      case 'completed':
        return (
          <span className="flex-shrink-0 h-5 w-5 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex-shrink-0 h-5 w-5 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="flex-shrink-0 h-5 w-5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </span>
        );
    }
  };

  // Define a classe de texto com base na propriedade
  const getTextClass = () => {
    return textColor || 'text-gray-900';
  };

  // Alternar o status da tarefa
  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o evento de clique se propague para o onClick do item
    if (updateTodo) {
      const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
      updateTodo({
        ...todo,
        status: newStatus
      });
    }
  };

  return (
    <div 
      className={`flex items-center p-4 border rounded-md mb-2 cursor-pointer transition duration-200 ease-in-out shadow-sm hover:shadow ${getStatusClass()}`}
      onClick={() => onClick(todo)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          {getStatusIcon()}
          <div className="ml-3">
            <p className={`text-sm font-medium ${getTextClass()} truncate`}>
              {todo.title}
            </p>
            {todo.duration && (
              <p className="text-xs text-gray-500">
                Duração: {todo.duration}
              </p>
            )}
          </div>
        </div>
        {todo.summary && (
          <div className="mt-2 text-xs text-gray-600 line-clamp-2">
            <p className="font-semibold">{todo.summary}</p>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {updateTodo && (
          <button 
            onClick={toggleStatus} 
            className={`mr-2 px-3 py-1 rounded text-xs font-medium flex items-center ${
              todo.status === 'completed' 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {todo.status === 'completed' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Desmarcar
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Concluir
              </>
            )}
          </button>
        )}
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default TodoItem; 