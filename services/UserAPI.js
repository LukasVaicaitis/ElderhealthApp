import bcrypt from 'bcryptjs';

const BASE_URL = 'http://52.158.32.0:5000/api/users';

const UserAPI = {
  loginUser: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Nepavyko prisijungti');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Klaida prisijungiant:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
};

export default UserAPI;
