import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose, onSave }) => {
  const [summary, setSummary] = useState(todo.summary || '');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [performance, setPerformance] = useState(todo.performance || 0);
  const [notes, setNotes] = useState(todo.notes || '');
  const [materials, setMaterials] = useState<string[]>(todo.materials || []);
  const [newMaterial, setNewMaterial] = useState('');
  const [timeSpent, setTimeSpent] = useState(todo.timeSpent || 0);

  useEffect(() => {
    // Atualiza a contagem de caracteres
    setCharCount(summary.length);
    
    // Atualiza a contagem de palavras
    const words = summary.trim().split(/\s+/);
    setWordCount(summary.trim() === '' ? 0 : words.length);
  }, [summary]);

  const handleSave = () => {
    const updatedTodo: Todo = {
      ...todo,
      summary,
      performance,
      notes,
      materials,
      timeSpent,
      status: summary.trim() !== '' ? 'completed' : todo.status
    };
    onSave(updatedTodo);
    onClose();
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const isSimuladoTodo = 
    todo.title.toLowerCase().includes('simulado') || 
    (todo.summary && todo.summary.toLowerCase().includes('avaliação'));

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{todo.title}</h3>
                <div className="mt-2">
                  <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
                    <span><span className="font-medium">Duração:</span> {todo.duration}</span>
                    
                    <div className="flex items-center">
                      <label htmlFor="timeSpent" className="mr-2 text-sm font-medium text-gray-700">
                        Tempo gasto:
                      </label>
                      <input
                        type="number"
                        id="timeSpent"
                        name="timeSpent"
                        min="0"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md w-20"
                        value={timeSpent}
                        onChange={(e) => setTimeSpent(Number(e.target.value))}
                      />
                      <span className="ml-1 text-xs">min</span>
                    </div>
                  </div>

                  {isSimuladoTodo && (
                    <div className="mb-4">
                      <label htmlFor="performance" className="block text-sm font-medium text-gray-700 mb-1">
                        Desempenho no simulado (0-100%):
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="performance"
                          name="performance"
                          min="0"
                          max="100"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          value={performance}
                          onChange={(e) => setPerformance(Number(e.target.value))}
                        />
                        <span className="ml-2 text-sm font-medium">{performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            performance < 40 ? 'bg-red-500' : 
                            performance < 60 ? 'bg-yellow-500' : 
                            performance < 80 ? 'bg-blue-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${performance}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Resumo do seu estudo:
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    rows={6}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Digite aqui seu resumo sobre o conteúdo estudado..."
                  />
                  <div className="mt-1 text-xs text-gray-500 flex justify-between">
                    <span>{charCount} caracteres</span>
                    <span>{wordCount} palavras</span>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Anotações de pontos críticos:
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anote aqui pontos importantes ou dificuldades encontradas..."
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Materiais recomendados:
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Adicionar novo material..."
                      />
                      <button
                        type="button"
                        onClick={handleAddMaterial}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        +
                      </button>
                    </div>
                    
                    {materials.length > 0 && (
                      <ul className="mt-2 divide-y divide-gray-200 bg-gray-50 rounded-md p-2">
                        {materials.map((material, index) => (
                          <li key={index} className="py-2 flex justify-between items-center">
                            <span className="text-sm text-gray-800">{material}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMaterial(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
            >
              Salvar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal; 