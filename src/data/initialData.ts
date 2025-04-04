import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getInitialTodos = (): Todo[] => {
  return [
    // Segunda-feira (24)
    {
      id: uuidv4(),
      title: 'Leitura e interpretação de textos diversos',
      duration: '1h',
      day: 'segunda',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Tipologias textuais',
      duration: '1h',
      day: 'segunda',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Critérios de textualidade (coerência, coesão)',
      duration: '1h',
      day: 'segunda',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Fundamentos teórico-metodológicos do Serviço Social no sociojurídico',
      duration: '2h',
      day: 'segunda',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Ética profissional e Código de ética do assistente social',
      duration: '2h',
      day: 'segunda',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Exercícios práticos de interpretação de texto',
      duration: '1h',
      day: 'segunda',
      period: 'noite',
      status: 'pending',
      summary: 'Bloco I',
    },

    // Terça-feira (25)
    {
      id: uuidv4(),
      title: 'Progressão textual nos diferentes gêneros',
      duration: '40min',
      day: 'terca',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Citação do discurso alheio (direta, indireta)',
      duration: '40min',
      day: 'terca',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Modalização discursiva',
      duration: '40min',
      day: 'terca',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Direitos Humanos',
      duration: '1h20min',
      day: 'terca',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Direitos fundamentais de crianças e adolescentes',
      duration: '1h20min',
      day: 'terca',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Sistema de Garantia de Direitos',
      duration: '1h20min',
      day: 'terca',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Estudo de caso: análise de documentos técnicos do assistente social',
      duration: '2h',
      day: 'terca',
      period: 'noite',
      status: 'pending',
      summary: 'Bloco II',
    },

    // Quarta-feira (26)
    {
      id: uuidv4(),
      title: 'Informações implícitas e inferências textuais',
      duration: '1h',
      day: 'quarta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Linguagem denotativa e conotativa',
      duration: '1h',
      day: 'quarta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Relações semânticas (sinonímia, antonímia, hiponímia, hiperonímia)',
      duration: '1h',
      day: 'quarta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Violências contra crianças e adolescentes',
      duration: '1h20min',
      day: 'quarta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Adolescente em conflito com a lei',
      duration: '1h20min',
      day: 'quarta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Violência doméstica e familiar contra a mulher',
      duration: '1h20min',
      day: 'quarta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Revisão dos conteúdos dos dias 1 e 2',
      duration: '2h',
      day: 'quarta',
      period: 'noite',
      status: 'pending',
      summary: 'Revisão',
    },

    // Quinta-feira (27)
    {
      id: uuidv4(),
      title: 'Ortografia, acentuação e pontuação',
      duration: '1h',
      day: 'quinta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Concordâncias verbal e nominal',
      duration: '1h',
      day: 'quinta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Regências nominal e verbal',
      duration: '1h',
      day: 'quinta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Registro e produção de documentos: Estudo Social, Relatório, Laudo e Parecer',
      duration: '1h20min',
      day: 'quinta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Atuação interdisciplinar do Assistente Social',
      duration: '1h20min',
      day: 'quinta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Exercícios práticos de redação técnica',
      duration: '2h',
      day: 'quinta',
      period: 'noite',
      status: 'pending',
      summary: 'Prática',
    },

    // Sexta-feira (28)
    {
      id: uuidv4(),
      title: 'Emprego de pronomes e colocação pronominal',
      duration: '1h',
      day: 'sexta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Crase',
      duration: '1h',
      day: 'sexta',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Medidas protetivas ao idoso',
      duration: '1h20min',
      day: 'sexta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Políticas Públicas e Seguridade Social',
      duration: '1h20min',
      day: 'sexta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Famílias: transformações e configurações',
      duration: '1h20min',
      day: 'sexta',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Revisão dos conteúdos dos dias 3 e 4',
      duration: '2h',
      day: 'sexta',
      period: 'noite',
      status: 'pending',
      summary: 'Revisão',
    },

    // Segunda-feira (31)
    {
      id: uuidv4(),
      title: 'Revisão completa de Língua Portuguesa',
      duration: '1h30min',
      day: 'segunda31',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Simulado de questões do Bloco I',
      duration: '1h30min',
      day: 'segunda31',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco I',
    },
    {
      id: uuidv4(),
      title: 'Relações de gênero',
      duration: '1h20min',
      day: 'segunda31',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Questões intergeracionais',
      duration: '1h20min',
      day: 'segunda31',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Diversidade étnico-racial',
      duration: '1h20min',
      day: 'segunda31',
      period: 'tarde',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Resolução comentada do simulado',
      duration: '2h',
      day: 'segunda31',
      period: 'noite',
      status: 'pending',
      summary: 'Revisão',
    },

    // Terça-feira (01)
    {
      id: uuidv4(),
      title: 'Revisão dos principais pontos do Bloco II',
      duration: '1h30min',
      day: 'terca01',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Correlação entre os temas do Bloco II',
      duration: '1h30min',
      day: 'terca01',
      period: 'manhã',
      status: 'pending',
      summary: 'Bloco II',
    },
    {
      id: uuidv4(),
      title: 'Simulado completo com questões dos dois blocos',
      duration: '4h',
      day: 'terca01',
      period: 'tarde',
      status: 'pending',
      summary: 'Avaliação',
    },
    {
      id: uuidv4(),
      title: 'Correção do simulado',
      duration: '1h',
      day: 'terca01',
      period: 'noite',
      status: 'pending',
      summary: 'Avaliação',
    },
    {
      id: uuidv4(),
      title: 'Identificação dos pontos fracos',
      duration: '30min',
      day: 'terca01',
      period: 'noite',
      status: 'pending',
      summary: 'Avaliação',
    },
    {
      id: uuidv4(),
      title: 'Planejamento para os próximos ciclos de estudo',
      duration: '30min',
      day: 'terca01',
      period: 'noite',
      status: 'pending',
      summary: 'Planejamento',
    },
  ];
}; 