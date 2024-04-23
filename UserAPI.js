import bcrypt from 'bcryptjs';

const BASE_URL = 'http://52.158.32.0:5000/api/users'; // Update with your server's base URL

const UserAPI = {
  loginUser: async (email, password) => {
    try {
      // Make a POST request to the login endpoint of your server's API
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      // Parse the response JSON
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      // Make a GET request to the user endpoint with the user ID
      const response = await fetch(`${BASE_URL}/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      // Parse the response JSON
      const user = await response.json();
      return user; // Return the user object
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
};

export default UserAPI;
