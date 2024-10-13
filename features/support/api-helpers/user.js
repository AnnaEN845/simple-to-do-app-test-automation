import APIBase from './api-base.js';

export default class User extends APIBase {
  constructor(url) {
      super(url);
  }

async createUser(name, email, password) {
  const body = { name, username: email, password };
  try {
      const response = await this.post('/register', body);
      
      if (response.request && response.request.res && response.request.res.responseUrl) {
          const finalUrl = response.request.res.responseUrl;
          if (finalUrl.includes('/todo')) {
              return { success: true, message: 'User registered and logged in' };
          }
      }
      
      if (response.data && response.data.includes('success')) {
          return { success: true, message: 'User registered successfully' };
      }
      
      return { success: false, message: 'Registration failed' };
  } catch (error) {
      console.error('Error during registration:', error.message);
      return { success: false, message: 'Error during registration' };
  }
}

async login(email, password) {
  const body = { username: email, password };
  try {
      const response = await this.post('/login', body);
      if (response.request && response.request.res && response.request.res.responseUrl) {
          const finalUrl = response.request.res.responseUrl;
          if (finalUrl.includes('/todo')) {
              return { success: true, message: 'User logged in' };
          }
      }
      return { success: false, message: 'Login failed' };
  } catch (error) {
      console.error('Error during login:', error.message);
      return { success: false, message: 'Error during login' };
  }
}


async createTodo(title, description, dueDate, priority, category) {
  const body = {
      todotitle: title,
      description,
      dueDate,
      priority,
      category
  };
  try {
      const response = await this.post('/add-todo', body);

      if (response.status === 200 || response.status === 302) {
          return { success: true, message: 'Todo created successfully' };
      }
      return { success: false, message: response.data?.message || 'Failed to create todo' };
  } catch (error) {
      console.error('Error creating todo:', error.message);
      return { success: false, message: 'Error creating todo' };
  }
}
}