import React, { useState, useEffect } from 'react';
import './App.css';
import WeeklySchedule from './components/WeeklySchedule';
import SearchBar from './components/SearchBar';
import { Todo, WeekDay } from './types';
import { getInitialTodos } from './data/initialData';

// Versão da aplicação para controle de mudanças nos dados
const APP_VERSION = '1.1';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDay, setCurrentDay] = useState<WeekDay>('segunda');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStats, setShowStats] = useState(false);

  // Função para carregar os dados iniciais
  const loadInitialData = () => {
    console.log("Carregando dados iniciais...");
    const initialTodos = getInitialTodos();
    setTodos(initialTodos);
    localStorage.setItem('todos', JSON.stringify(initialTodos));
    localStorage.setItem('app_version', APP_VERSION);
    setCurrentDay('segunda');
  };

  useEffect(() => {
    // Sempre iniciar com a segunda-feira como dia padrão
    setCurrentDay('segunda');
    
    try {
      // Verificar se temos uma versão diferente da aplicação
      const savedVersion = localStorage.getItem('app_version');
      
      // Se a versão mudou ou não existe, forçar a atualização dos dados
      if (savedVersion !== APP_VERSION) {
        console.log(`Versão do app mudou de ${savedVersion} para ${APP_VERSION}. Atualizando dados...`);
        localStorage.removeItem('todos');
        loadInitialData();
        return;
      }
      
      // Carregar dados do localStorage se disponíveis
      const savedTodos = localStorage.getItem('todos');
      
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos) as Todo[];
        
        // Verificar se os dados são válidos e se existem tarefas para segunda-feira
        if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
          const segundaTasks = parsedTodos.filter(todo => todo.day === 'segunda');
          
          if (segundaTasks.length > 0) {
            console.log(`Carregando ${parsedTodos.length} tarefas do localStorage`);
            setTodos(parsedTodos);
            return;
          }
        }
      }
      
      // Se chegamos aqui, significa que não há dados válidos no localStorage
      // ou não há tarefas para segunda-feira, então carregamos os dados iniciais
      loadInitialData();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      loadInitialData();
    }
  }, []);

  // Salvar todos no localStorage sempre que houver alterações
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Filtrar todos com base na pesquisa
  const filteredTodos = searchQuery 
    ? todos.filter(todo => 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.summary && todo.summary.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : todos;

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    );
  };

  const exportSummaries = () => {
    const completedTodos = todos.filter(todo => todo.status === 'completed');
    if (completedTodos.length === 0) {
      alert('Não há resumos para exportar!');
      return;
    }

    const content = completedTodos.map(todo => {
      return `${todo.title}\n\n${todo.summary}\n\n----------------------------\n\n`;
    }).join('');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumos-de-estudos.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Função para resetar todos os dados
  const resetData = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('todos');
      localStorage.removeItem('app_version');
      loadInitialData();
    }
  };

  // Calcular estatísticas de desempenho
  const calculateStats = () => {
    const simulados = todos.filter(todo => 
      todo.title.toLowerCase().includes('simulado') && 
      todo.performance !== undefined
    );
    
    const blocoI = todos.filter(todo => 
      todo.summary && todo.summary.includes('Bloco I')
    );
    
    const blocoII = todos.filter(todo => 
      todo.summary && todo.summary.includes('Bloco II')
    );
    
    const completedBlocoI = blocoI.filter(todo => todo.status === 'completed');
    const completedBlocoII = blocoII.filter(todo => todo.status === 'completed');
    
    const progressBlocoI = blocoI.length > 0 
      ? Math.round((completedBlocoI.length / blocoI.length) * 100) 
      : 0;
    
    const progressBlocoII = blocoII.length > 0 
      ? Math.round((completedBlocoII.length / blocoII.length) * 100) 
      : 0;
    
    const averagePerformance = simulados.length > 0
      ? Math.round(simulados.reduce((acc, todo) => acc + (todo.performance || 0), 0) / simulados.length)
      : 0;
    
    const totalTimeSpent = todos.reduce((acc, todo) => acc + (todo.timeSpent || 0), 0);
    
    return {
      progressBlocoI,
      progressBlocoII,
      averagePerformance,
      totalTimeSpent,
      simulados: simulados.length,
      completedBlocoI: completedBlocoI.length,
      completedBlocoII: completedBlocoII.length,
      totalBlocoI: blocoI.length,
      totalBlocoII: blocoII.length
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciamento de Estudos TJSP
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize suas tarefas de estudo e acompanhe seu progresso
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <SearchBar 
              value={searchQuery} 
              onChange={(value) => setSearchQuery(value)} 
            />
            <div className="space-x-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showStats ? 'Ocultar Estatísticas' : 'Ver Estatísticas'}
              </button>
              <button
                onClick={exportSummaries}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Exportar Resumos
              </button>
              <button
                onClick={resetData}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Resetar Dados
              </button>
            </div>
          </div>

          {showStats && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Estatísticas de Evolução</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Progresso por Bloco</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-blue-600">Bloco I:</span>
                        <span className="text-sm text-gray-500">
                          {stats.completedBlocoI} de {stats.totalBlocoI} tarefas
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-blue-500" 
                          style={{ width: `${stats.progressBlocoI}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-pink-600">Bloco II:</span>
                        <span className="text-sm text-gray-500">
                          {stats.completedBlocoII} de {stats.totalBlocoII} tarefas
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-pink-500" 
                          style={{ width: `${stats.progressBlocoII}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Desempenho em Simulados</h3>
                  {stats.simulados > 0 ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Média de acertos:</span>
                        <span className="text-sm">{stats.averagePerformance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div 
                          className={`h-4 rounded-full flex items-center justify-center text-xs text-white ${
                            stats.averagePerformance < 40 ? 'bg-red-500' : 
                            stats.averagePerformance < 60 ? 'bg-yellow-500' : 
                            stats.averagePerformance < 80 ? 'bg-blue-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${stats.averagePerformance}%` }}
                        >
                          {stats.averagePerformance}%
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Baseado em {stats.simulados} simulados realizados
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Nenhum simulado realizado ainda
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Tempo Total de Estudo</h3>
                <div className="text-3xl font-bold text-indigo-600">
                  {Math.floor(stats.totalTimeSpent / 60)} horas e {stats.totalTimeSpent % 60} minutos
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Tempo registrado em todas as atividades
                </p>
              </div>
            </div>
          )}

          <WeeklySchedule 
            todos={filteredTodos} 
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            updateTodo={handleUpdateTodo} 
          />
        </div>
      </main>
      
      {/* Debug Info */}
      <div className="bg-gray-100 p-4 text-xs text-gray-500">
        <p>Total de tarefas: {todos.length}</p>
        <p>Dia atual: {currentDay}</p>
        <p>Tarefas para o dia atual: {todos.filter(todo => todo.day === currentDay).length}</p>
        <p>Versão do app: {APP_VERSION}</p>
      </div>
    </div>
  );
}

export default App;
