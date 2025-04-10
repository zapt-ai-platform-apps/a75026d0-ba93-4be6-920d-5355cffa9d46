import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

export default function SurveyDetail() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock survey data based on the ID
        const surveyData = {
          id: parseInt(surveyId),
          title: 'Consumer Shopping Habits',
          reward: 8.50,
          estimatedTime: '15 min',
          category: 'Market Research',
          description: 'Help companies understand consumer shopping preferences and behaviors. Your responses will guide future product development and marketing strategies.',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'How often do you shop online?',
              options: [
                'Daily',
                'Several times a week',
                'Once a week',
                'A few times a month',
                'Rarely or never'
              ]
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              question: 'Which factor most influences your purchase decisions?',
              options: [
                'Price',
                'Quality',
                'Brand reputation',
                'Reviews and ratings',
                'Recommendations from friends/family'
              ]
            },
            {
              id: 'q3',
              type: 'multiple-choice',
              question: 'How do you prefer to pay for online purchases?',
              options: [
                'Credit card',
                'Debit card',
                'Digital wallet (PayPal, Apple Pay, etc.)',
                'Buy now, pay later services',
                'Bank transfer'
              ]
            },
            {
              id: 'q4',
              type: 'text',
              question: 'What improvements would you like to see in online shopping experiences?'
            },
            {
              id: 'q5',
              type: 'rating',
              question: 'How satisfied are you with the current state of e-commerce websites?',
              scale: 5
            }
          ]
        };
        
        setSurvey(surveyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching survey details:', error);
        setLoading(false);
      }
    };
    
    fetchSurveyDetails();
  }, [surveyId]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    const currentQuestion = survey.questions[currentQuestionIndex];
    
    // Check if current question is answered
    if (!answers[currentQuestion.id] && answers[currentQuestion.id] !== 0) {
      alert('Please answer the current question before proceeding.');
      return;
    }
    
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitSurvey();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitSurvey = async () => {
    // Check if all questions are answered
    const unansweredQuestions = survey.questions.filter(q => 
      !answers[q.id] && answers[q.id] !== 0
    );
    
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions before submitting. You have ${unansweredQuestions.length} unanswered questions.`);
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, this would be an API call to submit the survey
      console.log('Submitting survey answers:', answers);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSurveyCompleted(true);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitting(false);
      alert('There was an error submitting your survey. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading survey..." />;
  }

  if (!survey) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Found</h2>
        <p className="text-gray-600 mb-6">The survey you're looking for doesn't exist or has been removed.</p>
        <Link to="/surveys" className="btn-primary cursor-pointer">
          Back to Surveys
        </Link>
      </div>
    );
  }

  if (surveyCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Survey Completed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing this survey. Your responses have been recorded.
            ${survey.reward.toFixed(2)} has been added to your pending balance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/surveys')}
              className="btn-primary cursor-pointer"
            >
              Take Another Survey
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-outline cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = Math.round((currentQuestionIndex / survey.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Survey Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{survey.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {survey.estimatedTime}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {survey.questions.length} Questions
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {survey.category}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-medium">
              ${survey.reward.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {currentQuestionIndex + 1} of {survey.questions.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h2>
        
        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 mr-3 rounded-full border ${
                    answers[currentQuestion.id] === option 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-400'
                  } flex items-center justify-center`}>
                    {answers[currentQuestion.id] === option && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="4" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {currentQuestion.type === 'text' && (
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            rows={4}
            className="input box-border"
            placeholder="Enter your answer here..."
          />
        )}
        
        {currentQuestion.type === 'rating' && (
          <div className="flex items-center justify-center space-x-4 py-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleAnswer(currentQuestion.id, rating)}
                className={`w-12 h-12 text-lg rounded-full flex items-center justify-center cursor-pointer ${
                  answers[currentQuestion.id] === rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`btn ${
            currentQuestionIndex === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'btn-outline cursor-pointer'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={goToNextQuestion}
          disabled={submitting}
          className="btn-primary cursor-pointer"
        >
          {currentQuestionIndex === survey.questions.length - 1 ? (
            submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Survey'
            )
          ) : (
            'Next Question'
          )}
        </button>
      </div>
    </div>
  );
}