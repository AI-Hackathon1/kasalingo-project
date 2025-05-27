import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiPlus, FiEye, FiEdit, FiTrash2, FiArrowLeft, FiSave, FiRefreshCw } from 'react-icons/fi';
import { getQuestions, createQuestion } from '../../../service/question';

const Lessons = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    language: 'en',
    type: 'multiple-choice',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
    explanation: '',
    points: 1,
    difficultyLevel: 'beginner',
    ageRange: { min: 4, max: 12 },
    category: 'vocabulary',
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle age range changes
  const handleAgeRangeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      ageRange: {
        ...prev.ageRange,
        [field]: Number.parseInt(value),
      },
    }));
  };

  // Handle option changes
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: field === 'isCorrect' ? value : value,
    };

    if (field === 'isCorrect' && value) {
      newOptions.forEach((option, i) => {
        if (i !== index) option.isCorrect = false;
      });
    }

    setFormData(prev => ({
      ...prev,
      options: newOptions,
    }));
  };

  // Add new option
  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }],
    }));
  };

  // Remove option
  const removeOption = (index) => {
    if (formData.options.length > 2) { // Keep at least 2 options
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.text.trim()) return 'Question text is required';
    if (!formData.category.trim()) return 'Category is required';
    if (formData.options.some(opt => !opt.text.trim())) return 'All options must have text';
    if (!formData.options.some(opt => opt.isCorrect)) return 'At least one option must be marked as correct';
    if (formData.ageRange.min >= formData.ageRange.max) return 'Minimum age must be less than maximum age';
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: 'error', message: validationError });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: 'pending', message: 'Creating question...' });
      
      // Prepare the question data according to the API requirements
      const questionData = {
        text: formData.text,
        language: formData.language,
        type: formData.type,
        options: formData.options,
        explanation: formData.explanation,
        points: formData.points,
        difficultyLevel: formData.difficultyLevel,
        category: formData.category,
        ageRange: formData.ageRange
      };
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      // Create the question using our service
      const response = await createQuestion(questionData, token);
      
      // Handle the response
      if (response && response.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: response.message || 'Question created successfully!',
          data: response.data
        });
        
        // Switch back to list view and refresh questions
        setActiveTab('list');
        await fetchQuestions();
        
        // Reset form
        setFormData({
          text: '',
          language: 'en',
          type: 'multiple-choice',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
          explanation: '',
          points: 1,
          difficultyLevel: 'beginner',
          ageRange: { min: 5, max: 18 },
          category: '',
        });
      } else {
        throw new Error('Failed to create question');
      }
      // Optionally, refresh the questions list
      // fetchQuestions();
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      let errorMessage = 'An error occurred while creating the question';
      
      // More specific error messages based on error type
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
        
        // Handle specific HTTP status codes
        if (error.response.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          // Optionally redirect to login
          // navigate('/login');
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid data. Please check your inputs.';
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message) {
        // Something happened in setting up the request
        errorMessage = error.message;
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage,
        details: error.response?.data?.details || null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the question creation form
  const renderCreateQuestion = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Create New Question</h2>
        </div>

        {/* Status Message */}
        {submitStatus && (
          <div className={`p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
            placeholder="Enter your question here..."
            required
          />
        </div>

        {/* Language and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="en">English</option>
              <option value="twi">Twi</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="matching">Matching</option>
              <option value="fill-blank">Fill in the Blank</option>
            </select>
          </div>
        </div>

        {/* Options - Only show for relevant question types */}
        {['multiple-choice', 'true-false', 'matching'].includes(formData.type) && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Options <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(Mark the correct answer)</span>
              </label>
              <button
                type="button"
                onClick={addOption}
                disabled={formData.options.length >= 6}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 disabled:opacity-50"
              >
                <FiPlus size={16} /> Add Option
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type={formData.type === 'multiple-choice' ? 'radio' : 'checkbox'}
                    name="correct-option"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                    className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remove option"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Explanation
            <span className="text-xs text-gray-500 ml-2">(Optional but recommended)</span>
          </label>
          <textarea
            value={formData.explanation}
            onChange={(e) => handleInputChange('explanation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
            placeholder="Provide an explanation for the correct answer..."
          />
        </div>

        {/* Points and Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.points}
              onChange={(e) => handleInputChange('points', Math.min(100, Math.max(1, e.target.value)))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.difficultyLevel}
              onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum Age</label>
              <input
                type="number"
                min="4"
                max="17"
                value={formData.ageRange.min}
                onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum Age</label>
              <input
                type="number"
                min={Number(formData.ageRange.min) + 1}
                max="18"
                value={formData.ageRange.max}
                onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="vocabulary">Vocabulary</option>
            <option value="grammar">Grammar</option>
            <option value="pronunciation">Pronunciation</option>
            <option value="reading">Reading</option>
            <option value="writing">Writing</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <FiSave size={16} />
                Create Question
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

  // Fetch questions from the API
  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      const response = await getQuestions(token);
      console.log('Questions data received:', response);
      
      // Handle the paginated response structure
      if (response && response.success && response.data && Array.isArray(response.data.questions)) {
        setQuestions(response.data.questions);
        // You might want to store pagination info as well
        // setPagination(response.data.pagination);
      } else {
        console.warn('Unexpected response format:', response);
        setQuestions([]);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err.message || 'Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  // Load questions when component mounts
  useEffect(() => {
    if (activeTab === 'list') {
      fetchQuestions();
    }
  }, [activeTab]);

  // Handle refresh
  const handleRefresh = () => {
    fetchQuestions();
  };

  // Render the questions list
  const renderQuestionsList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
          <p className="text-gray-600">Manage and review all questions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} size={18} />
            Refresh
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            <FiPlus size={18} />
            New Question
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center space-x-2">
                      <FiRefreshCw className="animate-spin h-5 w-5" />
                      <span>Loading questions...</span>
                    </div>
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiBook className="h-12 w-12 text-gray-300" />
                      <p className="text-lg font-medium">No questions found</p>
                      <p>Get started by creating a new question</p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="mt-2 px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 inline-flex items-center"
                      >
                        <FiPlus className="mr-2" />
                        Create Question
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                questions.map((question, index) => {
                  // Handle different possible question structures
                  const questionData = question.question || question;
                  const questionId = question._id || question.id || `temp-${index}`;
                  
                  console.log('Rendering question:', { question, questionData, questionId });
                  
                  return (
                    <tr key={questionId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {questionData.text || 'No question text'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {questionData.type?.replace('-', ' ') || 'unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {questionData.category || 'uncategorized'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          (questionData.difficultyLevel || 'beginner') === 'beginner' ? 'bg-green-100 text-green-800' :
                          (questionData.difficultyLevel || 'beginner') === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {questionData.difficultyLevel || 'beginner'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEye size={18} />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <FiEdit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {activeTab === 'list' ? renderQuestionsList() : renderCreateQuestion()}
    </div>
  );
};

export default Lessons;
