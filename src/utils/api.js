import axios from 'axios';

// Assuming your backend API is hosted at this URL.
// **IMPORTANT**: Replace with your actual backend API URL.
const API_BASE_URL = 'https://api.moveride.co.za'; // Example URL, replace as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // 'Accept': 'application/json', // Often implicit
  },
});

// Interceptor for Add Authorization Token (if using JWT or similar)
// This assumes you store the token in AsyncStorage or a similar persistent storage
// and retrieve it when needed.
/*
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken'); // Replace with your token retrieval key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
*/

// Interceptor for Handling Responses (e.g., for global error handling)
api.interceptors.response.use(
  (response) => {
    // Any status code from 2xx is treated as a success
    // You can add logic here to handle specific success responses if needed
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
      // You could use a global error handler or Alert here
      // For example, to log out user on 401 Unauthorized
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., navigate to Auth screen
        // alert('Your session has expired. Please log in again.');
        // NavigationService.navigate('Auth'); // Assuming you have a navigation service
      } else {
        // Display a generic error message to the user
        // alert(error.response.data.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
      // alert('Could not connect to the server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Message:', error.message);
      // alert(`An error occurred: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
