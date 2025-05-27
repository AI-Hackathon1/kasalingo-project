import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Lessons = () => {
  // State for lessons list and form
  const [lessons, setLessons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    level: 'beginner',
    category: 'vocabulary',
    questions: [
      {
        id: Date.now(),
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]
  });

  // Fetch lessons from API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/lessons');
        // const data = await response.json();
        // setLessons(data);
        
        // Mock data for now
        setTimeout(() => {
          setLessons([
            {
              id: '1',
              title: 'Basic Greetings',
              description: 'Learn basic greetings in Spanish',
              level: 'beginner',
              category: 'vocabulary',
              questions: [
                {
                  id: 'q1',
                  question: 'How do you say "Hello" in Spanish?',
                  options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
                  correctAnswer: 0,
                  explanation: '\"Hola\" is the Spanish word for \"Hello\".'
                }
              ]
            },
            {
              id: '2',
              title: 'Numbers 1-10',
              description: 'Learn to count from 1 to 10',
              level: 'beginner',
              category: 'numbers',
              questions: []
            }
          ]);
        }, 500);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
      }
    };

    fetchLessons();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle question input changes
  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  // Handle option changes
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  // Add a new question
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    }));
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      toast.error('Please enter a title for the lesson');
      return;
    }

    if (formData.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Validate all questions
    for (const question of formData.questions) {
      if (!question.question.trim()) {
        toast.error('Please enter text for all questions');
        return;
      }
      
      if (question.options.some(opt => !opt.trim())) {
        toast.error('Please fill in all options for each question');
        return;
      }
    }

    try {
      // TODO: Replace with actual API call
      // const method = isEditing ? 'PUT' : 'POST';
      // const url = isEditing ? `/api/lessons/${formData.id}` : '/api/lessons';
      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing) {
        // Update existing lesson
        setLessons(lessons.map(lesson => 
          lesson.id === formData.id ? formData : lesson
        ));
        toast.success('Lesson updated successfully');
      } else {
        // Add new lesson
        const newLesson = { ...formData, id: Date.now().toString() };
        setLessons([...lessons, newLesson]);
        toast.success('Lesson created successfully');
      }
      
      // Reset form
      setFormData({
        id: '',
        title: '',
        description: '',
        level: 'beginner',
        category: 'vocabulary',
        questions: [{
          id: Date.now(),
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }]
      });
      setShowForm(false);
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast.error('Failed to save lesson');
    }
  };

  // Edit a lesson
  const editLesson = (lesson) => {
    setFormData({
      ...lesson,
      questions: lesson.questions.length > 0 
        ? lesson.questions 
        : [{
            id: Date.now(),
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            explanation: ''
          }]
    });
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete a lesson
  const deleteLesson = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/lessons/${id}`, { method: 'DELETE' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLessons(lessons.filter(lesson => lesson.id !== id));
      toast.success('Lesson deleted successfully');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson');
    }
  };

  // Toggle lesson expansion
  const toggleLesson = (id) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  // Add a new question to an existing lesson
  const addQuestionToLesson = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    const updatedLesson = {
      ...lesson,
      questions: [
        ...lesson.questions,
        {
          id: Date.now(),
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    };
    
    setLessons(lessons.map(l => l.id === lessonId ? updatedLesson : l));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lesson Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setIsEditing(false);
              setFormData({
                id: '',
                title: '',
                description: '',
                level: 'beginner',
                category: 'vocabulary',
                questions: [{
                  id: Date.now(),
                  question: '',
                  options: ['', '', '', ''],
                  correctAnswer: 0,
                  explanation: ''
                }]
              });
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus /> {showForm ? 'Cancel' : 'Create New Lesson'}
        </button>
      </div>

      {/* Lesson Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Lesson' : 'Create New Lesson'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter lesson title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="vocabulary">Vocabulary</option>
                  <option value="grammar">Grammar</option>
                  <option value="pronunciation">Pronunciation</option>
                  <option value="conversation">Conversation</option>
                  <option value="numbers">Numbers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter lesson description"
              />
            </div>
            
            {/* Questions Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  <FiPlus size={16} /> Add Question
                </button>
              </div>
              
              {formData.questions.map((q, qIndex) => (
                <div key={q.id} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-700">Question {qIndex + 1}</h4>
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove question"
                      >
                        <FiX size={20} />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Text <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter question text"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                            required
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={`Option ${oIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Explanation
                    </label>
                    <textarea
                      value={q.explanation}
                      onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Explanation for the correct answer"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {isEditing ? 'Update Lesson' : 'Create Lesson'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Lessons</h2>
        
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No lessons found. Create your first lesson to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lesson.questions.length} {lesson.questions.length === 1 ? 'Question' : 'Questions'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editLesson(lesson);
                      }}
                      className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-purple-50"
                      title="Edit lesson"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLesson(lesson.id);
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                      title="Delete lesson"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-purple-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLesson(lesson.id);
                      }}
                    >
                      {expandedLesson === lesson.id ? (
                        <FiChevronUp size={20} />
                      ) : (
                        <FiChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
                
                {expandedLesson === lesson.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {lesson.questions.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-800">Questions</h4>
                          <button
                            type="button"
                            onClick={() => addQuestionToLesson(lesson.id)}
                            className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                          >
                            <FiPlus size={16} /> Add Question
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {lesson.questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-start">
                                <h5 className="font-medium text-gray-900">{q.question}</h5>
                              </div>
                              
                              <div className="mt-3 space-y-2">
                                {q.options.map((option, oIndex) => (
                                  <div 
                                    key={oIndex}
                                    className={`p-2 rounded ${q.correctAnswer === oIndex ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className={`h-4 w-4 rounded-full flex items-center justify-center ${q.correctAnswer === oIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        {q.correctAnswer === oIndex && (
                                          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                                        )}
                                      </div>
                                      <span className={q.correctAnswer === oIndex ? 'font-medium text-green-800' : 'text-gray-700'}>
                                        {option}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {q.explanation && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
                                  <span className="font-medium">Explanation:</span> {q.explanation}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500 mb-3">No questions added yet.</p>
                        <button
                          onClick={() => addQuestionToLesson(lesson.id)}
                          className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 mx-auto"
                        >
                          <FiPlus size={16} /> Add Your First Question
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
