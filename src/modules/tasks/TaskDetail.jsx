import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

export default function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock task data based on the ID
        const taskData = {
          id: parseInt(taskId),
          title: 'Website Testing & Feedback',
          reward: 10.00,
          estimatedTime: '20 min',
          category: 'Testing',
          description: 'Visit a website, complete specific actions, and provide detailed feedback about your experience and any issues found.',
          instructions: `
            1. Visit the website at the link below.
            2. Create a test account using your email.
            3. Navigate through the main sections of the site.
            4. Complete the purchase process (using the test credit card provided).
            5. Answer the questions below with your detailed feedback.
          `,
          website: 'https://example-test-site.com',
          requirements: [
            'Must complete all steps within 30 minutes',
            'Provide detailed answers to all questions',
            'Take at least one screenshot of any issues found'
          ],
          questions: [
            {
              id: 'q1',
              type: 'text',
              question: 'How easy was it to navigate through the website?'
            },
            {
              id: 'q2',
              type: 'text',
              question: 'Did you encounter any issues during the account creation process?'
            },
            {
              id: 'q3',
              type: 'text',
              question: 'How was your experience with the checkout process?'
            },
            {
              id: 'q4',
              type: 'text',
              question: 'Did you find any bugs or usability issues? Please describe them in detail.'
            },
            {
              id: 'q5',
              type: 'rating',
              question: 'On a scale of 1-5, how would you rate the overall user experience?'
            }
          ]
        };
        
        setTask(taskData);
        // Initialize answers object
        const initialAnswers = {};
        taskData.questions.forEach(q => {
          initialAnswers[q.id] = q.type === 'rating' ? 0 : '';
        });
        setAnswers(initialAnswers);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };
    
    fetchTaskDetails();
  }, [taskId]);

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that all questions are answered
    const unansweredQuestions = task.questions.filter(q => {
      if (q.type === 'rating') {
        return answers[q.id] === 0;
      }
      return !answers[q.id];
    });
    
    if (unansweredQuestions.length > 0) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, this would be an API call to submit the task
      console.log('Submitting task answers:', answers);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTaskCompleted(true);
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting task:', error);
      setSubmitting(false);
      alert('There was an error submitting your task. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading task details..." />;
  }

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
        <Link to="/tasks" className="btn-primary cursor-pointer">
          Back to Tasks
        </Link>
      </div>
    );
  }

  if (taskCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Completed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing this task. Your submission has been received and is being reviewed.
            You will receive ${task.reward.toFixed(2)} once approved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/tasks')}
              className="btn-primary cursor-pointer"
            >
              Find More Tasks
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-outline cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Task Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {task.estimatedTime}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {task.category}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-lg font-medium">
              ${task.reward.toFixed(2)}
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{task.description}</p>
      </div>
      
      {/* Task Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{task.instructions}</p>
        </div>
        
        {task.website && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Website to Test:</h3>
            <a 
              href={task.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 break-all"
            >
              {task.website}
            </a>
          </div>
        )}
        
        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Requirements:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {task.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      {/* Task Questions Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Complete the Task</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {task.questions.map((question) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-2">
                  {question.question}
                </label>
                
                {question.type === 'text' && (
                  <textarea
                    id={question.id}
                    value={answers[question.id]}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    rows={4}
                    className="input box-border"
                    placeholder="Enter your answer here..."
                  />
                )}
                
                {question.type === 'rating' && (
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleInputChange(question.id, rating)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          answers[question.id] >= rating
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        } cursor-pointer transition-colors`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/tasks" className="btn-outline cursor-pointer">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary cursor-pointer flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}