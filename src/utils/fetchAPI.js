// Base URL for the Open5e API
const BASE_URL = 'https://api.open5e.com/';

/**
 * Fetches data from the Open5e API
 * @param {string} endpoint - The API endpoint to fetch from
 * @returns {Promise<Object|null>} - Returns JSON data or null if error occurs
 */
export async function fetchFromAPI(endpoint) {
  try {
    // Make the API request
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    // Throw error if response is not OK
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    // Return parsed JSON data
    return await response.json();
  } catch (error) {
    // Log error and return null
    console.error(error);
    return null;
  }
}
