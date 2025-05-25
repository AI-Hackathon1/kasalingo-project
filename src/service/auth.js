import { apiClient } from "./config";

export const apiRegister = async (payload) => {
  try {
    const response = await apiClient.post("/api/user/register", payload, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: status => status < 500 // Don't throw for 4xx errors
    });
    
    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Registration failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Register Error:', error);
    throw error;
  }
};

export const apiRegisterAdmin = async (payload) => {
  try {
    const response = await apiClient.post("/api/admin/register", payload, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: status => status < 500 // Don't throw for 4xx errors
    });
    
    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Admin registration failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Admin Register Error:', error);
    throw error;
  }
};

export const apiLogin = async (payload) => {
  try {
    const response = await apiClient.post("/api/user/login", payload, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: status => status < 500
    });

    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Login failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Login Error:', error);
    throw error;
  }
};

export const apiAdminLogin = async (payload) => {
  try {
    const response = await apiClient.post("/api/admin/login", payload, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: status => status < 500
    });

    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Admin login failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Admin Login Error:', error);
    throw error;
  }
};