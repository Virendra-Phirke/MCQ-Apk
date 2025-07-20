import React, { createContext, useContext, useState } from 'react';
import { questionBank } from '../data/questionBank';

export interface Question {
  id: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface QuizConfig {
  language: string;
  difficulty: string;
  questionCount: number;
  timeLimit: number; // in minutes, 0 for no limit
  categories: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  flaggedQuestions: Set<number>;
  startTime: number;
  endTime?: number;
  timeRemaining?: number;
}

interface QuizContextType {
  config: QuizConfig | null;
  quizState: QuizState | null;
  setConfig: (config: QuizConfig) => void;
  startQuiz: () => void;
  answerQuestion: (questionIndex: number, answer: number) => void;
  flagQuestion: (questionIndex: number) => void;
  unflagQuestion: (questionIndex: number) => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const startQuiz = () => {
    if (!config) return;

    const availableQuestions = questionBank.filter(q => 
      q.language === config.language &&
      (config.difficulty === 'mixed' || q.difficulty === config.difficulty)
    );

    const shuffledQuestions = [...availableQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.questionCount);

    setQuizState({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      answers: new Array(shuffledQuestions.length).fill(null),
      flaggedQuestions: new Set(),
      startTime: Date.now(),
      timeRemaining: config.timeLimit > 0 ? config.timeLimit * 60 : undefined,
    });
  };

  const answerQuestion = (questionIndex: number, answer: number) => {
    if (!quizState) return;

    const newAnswers = [...quizState.answers];
    newAnswers[questionIndex] = answer;

    setQuizState({
      ...quizState,
      answers: newAnswers,
    });
  };

  const flagQuestion = (questionIndex: number) => {
    if (!quizState) return;

    const newFlagged = new Set(quizState.flaggedQuestions);
    newFlagged.add(questionIndex);

    setQuizState({
      ...quizState,
      flaggedQuestions: newFlagged,
    });
  };

  const unflagQuestion = (questionIndex: number) => {
    if (!quizState) return;

    const newFlagged = new Set(quizState.flaggedQuestions);
    newFlagged.delete(questionIndex);

    setQuizState({
      ...quizState,
      flaggedQuestions: newFlagged,
    });
  };

  const goToQuestion = (index: number) => {
    if (!quizState || index < 0 || index >= quizState.questions.length) return;

    setQuizState({
      ...quizState,
      currentQuestionIndex: index,
    });
  };

  const submitQuiz = () => {
    if (!quizState) return;

    setQuizState({
      ...quizState,
      endTime: Date.now(),
    });
  };

  const resetQuiz = () => {
    setQuizState(null);
    setConfig(null);
  };

  return (
    <QuizContext.Provider value={{
      config,
      quizState,
      setConfig,
      startQuiz,
      answerQuestion,
      flagQuestion,
      unflagQuestion,
      goToQuestion,
      submitQuiz,
      resetQuiz,
    }}>
      {children}
    </QuizContext.Provider>
  );
};