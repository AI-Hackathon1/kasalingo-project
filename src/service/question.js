import { apiClient } from "./config";

/**
 * Create a new question
 * @param {Object} questionData - The question data to be created
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} The created question data
 */
export const createQuestion = async (questionData, token) => {
  try {
    console.log('Creating question with data:', questionData);
    const response = await apiClient.post("/api/", questionData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Create question response:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error.response?.data || error.message;
  }
};

/**
 * Get all questions
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} List of questions
 */
export const getQuestions = async (token) => {
  try {
    console.log('Fetching questions with token:', token ? 'Token exists' : 'No token');
    const response = await apiClient.get("/api/", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Questions API response:', response);
    // Return the full response data which includes success, message, and data
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error.response?.data || error.message;
  }
};

/**
 * Get a single question by ID
 * @param {string} id - Question ID
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Question data
 */
export const getQuestionById = async (id, token) => {
  try {
    const response = await apiClient.get(`/questions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching question ${id}:`, error);
    throw error.response?.data || error.message;
  }
};

/**
 * Update a question
 * @param {string} id - Question ID
 * @param {Object} questionData - Updated question data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated question data
 */
export const updateQuestion = async (id, questionData, token) => {
  try {
    const response = await apiClient.put(`/questions/${id}`, questionData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating question ${id}:`, error);
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a question
 * @param {string} id - Question ID
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Deletion status
 */
export const deleteQuestion = async (id, token) => {
  try {
    const response = await apiClient.delete(`/questions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting question ${id}:`, error);
    throw error.response?.data || error.message;
  }
};
