import axios from "axios";

// Create a dedicated axios instance for GNLP
const gnlpClient = axios.create({
  baseURL: import.meta.env.VITE_GNLP_BASE_URL || 'https://translation-api.ghananlp.org/v1'
});

// Add request interceptor to include headers with each request
gnlpClient.interceptors.request.use(config => {
  config.headers = config.headers || {};
  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Ocp-Apim-Subscription-Key'] = import.meta.env.VITE_GNLP_API_KEY || '';
  return config;
});

/**
 * Fetches available languages from GNLP API
 * @returns {Promise<Object>} Object with language codes as keys and names as values
 */
export const fetchLanguages = async () => {
  try {
    const response = await gnlpClient.get('/languages');
    return response.data?.languages || {};
  } catch (error) {
    console.error('Error fetching languages:', error);
    // Return default languages if API call fails
    return {
      en: 'English',
      tw: 'Twi',
      ee: 'Ewe',
      gaa: 'Ga',
      fat: 'Fante',
      yo: 'Yoruba',
      dag: 'Dagbani',
      ki: 'Kikuyu',
      gur: 'Gurune',
      luo: 'Luo',
      mer: 'Kimeru',
      kus: 'Kusaal'
    };
  }
};

/**
 * Translates text using GNLP API
 * @param {string} text - The text to translate
 * @param {string} sourceLang - Source language code (e.g., 'en')
 * @param {string} targetLang - Target language code (e.g., 'tw')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, sourceLang, targetLang) => {
  if (!text?.trim()) return '';
  
  try {
    const response = await gnlpClient.post('/translate', {
      in: text,
      lang: `${sourceLang}-${targetLang}`
    });
    
    // Handle different response formats (string or object)
    const result = response.data;
    return typeof result === 'string' ? result : result?.translation || '';
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation failed. Please try again.');
  }
};
