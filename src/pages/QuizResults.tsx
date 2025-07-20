import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Flag, 
  ArrowRight, 
  RefreshCw,
  BarChart3,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';

const QuizResults: React.FC = () => {
  const navigate = useNavigate();
  const { quizState, config, resetQuiz } = useQuiz();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (!quizState || !config) {
      navigate('/configure');
      return;
    }

    const calculateResults = () => {
      const totalQuestions = quizState.questions.length;
      const correctAnswers = quizState.answers.reduce((count, answer, index) => {
        return count + (answer === quizState.questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const totalPoints = quizState.questions.reduce((sum, question, index) => {
        return sum + (quizState.answers[index] === question.correctAnswer ? question.points : 0);
      }, 0);
      
      const maxPoints = quizState.questions.reduce((sum, question) => sum + question.points, 0);
      const percentage = (correctAnswers / totalQuestions) * 100;
      const timeSpent = quizState.endTime ? (quizState.endTime - quizState.startTime) / 1000 : 0;
      
      const difficultyBreakdown = quizState.questions.reduce((acc, question, index) => {
        const isCorrect = quizState.answers[index] === question.correctAnswer;
        if (!acc[question.difficulty]) {
          acc[question.difficulty] = { total: 0, correct: 0 };
        }
        acc[question.difficulty].total++;
        if (isCorrect) acc[question.difficulty].correct++;
        return acc;
      }, {} as Record<string, { total: number; correct: number }>);

      return {
        totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
        percentage,
        totalPoints,
        maxPoints,
        timeSpent,
        difficultyBreakdown,
        flaggedCount: quizState.flaggedQuestions.size,
        unansweredCount: quizState.answers.filter(answer => answer === null).length,
      };
    };

    setResults(calculateResults());
  }, [quizState, config, navigate]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Calculating results...</p>
        </div>
      </div>
    );
  }

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    return { level: 'Needs Improvement', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' };
  };

  const performance = getPerformanceLevel(results.percentage);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const handleRetake = () => {
    resetQuiz();
    navigate('/configure');
  };

  const handleNewQuiz = () => {
    resetQuiz();
    navigate('/languages');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Results
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {config?.language} • {config?.difficulty} • {results.totalQuestions} questions
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-500 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.percentage.toFixed(1)}%
                </h2>
                <p className={`text-lg font-medium ${performance.color}`}>
                  {performance.level}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {results.correctAnswers}/{results.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Correct Answers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {results.totalPoints}/{results.maxPoints}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Points Earned
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatTime(results.timeSpent)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Time Spent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Breakdown
            </h3>
            
            <div className="space-y-4">
              {Object.entries(results.difficultyBreakdown).map(([difficulty, stats]: [string, any]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      difficulty === 'beginner' ? 'bg-green-500' :
                      difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {stats.correct}/{stats.total}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {((stats.correct / stats.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Quiz Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Correct Answers</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {results.correctAnswers}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Incorrect Answers</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {results.incorrectAnswers}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Flagged Questions</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {results.flaggedCount}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Unanswered</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {results.unansweredCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetake}
            className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retake Quiz
          </button>
          
          <button
            onClick={handleNewQuiz}
            className="flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            New Quiz
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults; 