import axios from 'axios';

// Create axios instances for different services
const sttV1Client = axios.create({
  baseURL: import.meta.env.VITE_GNLP_STT_V1_URL || 'https://asr-v1.ghananlp.org/v1',
  headers: {
    'Ocp-Apim-Subscription-Key': import.meta.env.VITE_GNLP_API_KEY,
    'Content-Type': 'audio/wav'
  }
});

const ttsClient = axios.create({
  baseURL: import.meta.env.VITE_GNLP_TTS_URL || 'https://tts.ghananlp.org/v1',
  headers: {
    'Ocp-Apim-Subscription-Key': import.meta.env.VITE_GNLP_API_KEY,
    'Content-Type': 'application/json'
  },
  responseType: 'blob'
});

/**
 * Convert speech to text using GhanaNLP ASR API
 * @param {Blob} audioBlob - The recorded audio blob
 * @param {string} language - Language code (e.g., 'tw' for Twi)
 * @returns {Promise<string>} - Transcribed text
 */
/**
 * Transcribe audio using the browser's built-in Web Speech API
 * @returns {Promise<string>} - Transcribed text
 */
const transcribeWithWebSpeech = () => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported in this browser'));
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let timeout;

    recognition.onresult = (event) => {
      clearTimeout(timeout);
      const transcript = Array.from(event.results)
        .map(result => result[0]?.transcript || '')
        .join('')
        .trim();
      
      if (transcript) {
        resolve(transcript);
      } else {
        reject(new Error('No speech was detected. Please try again.'));
      }
    };

    recognition.onerror = (event) => {
      clearTimeout(timeout);
      console.error('Web Speech API error:', event.error);
      reject(new Error('Speech recognition failed. Please try again.'));
    };

    recognition.onend = () => {
      clearTimeout(timeout);
    };

    // Start listening
    recognition.start();
    
    // Set a timeout to stop listening after 10 seconds
    timeout = setTimeout(() => {
      recognition.stop();
      reject(new Error('Listening timed out. Please try again.'));
    }, 10000);
  });
};

/**
 * Transcribe audio using available methods
 * @param {Blob} audioBlob - The recorded audio blob (not used in current implementation)
 * @param {string} language - Language code (e.g., 'en' for English)
 * @returns {Promise<string>} - Transcribed text
 */
export const transcribeAudio = async (audioBlob, language = 'en') => {
  try {
    // First try Web Speech API directly
    return await transcribeWithWebSpeech();
  } catch (error) {
    console.error('Speech recognition failed:', error);
    throw new Error('Could not transcribe audio. Please try again.');
  }
};

/**
 * Convert text to speech using GhanaNLP TTS API
 * @param {string} text - Text to convert to speech
 * @param {string} language - Language code (e.g., 'tw' for Twi)
 * @returns {Promise<string>} - URL of the generated audio
 */
export const textToSpeech = async (text, language = 'tw') => {
  if (!text?.trim()) return '';
  
  try {
    const response = await ttsClient.post('', { 
      text: text.substring(0, 500), // Limit text length
      language 
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('TTS failed:', error);
    throw new Error('Could not generate speech. Please try again.');
  }
};

/**
 * Start audio recording
 * @returns {Promise<MediaRecorder>} - MediaRecorder instance
 */
export const startRecording = () => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition is not supported in your browser'));
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let timeout;

    recognition.onresult = (event) => {
      clearTimeout(timeout);
      const transcript = Array.from(event.results)
        .map(result => result[0]?.transcript || '')
        .join('')
        .trim();
      
      if (transcript) {
        resolve({
          transcript,
          stop: () => recognition.stop()
        });
      } else {
        reject(new Error('No speech was detected. Please try again.'));
      }
    };

    recognition.onerror = (event) => {
      clearTimeout(timeout);
      console.error('Speech recognition error:', event.error);
      reject(new Error('Speech recognition failed. Please try again.'));
    };

    recognition.onend = () => {
      clearTimeout(timeout);
    };

    // Start listening
    recognition.start();
    
    // Set a timeout to stop listening after 10 seconds
    timeout = setTimeout(() => {
      recognition.stop();
      reject(new Error('Listening timed out. Please try again.'));
    }, 10000);
  });
};
