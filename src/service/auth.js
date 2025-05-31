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
    // Format the payload to match the expected API format
    const adminPayload = {
      userName: payload.userName.startsWith('admin_') 
        ? payload.userName 
        : `admin_${payload.userName}`,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword
    };

    console.log('Sending admin registration request with payload:', adminPayload);
    
    const response = await apiClient.post("/api/admin/register", adminPayload, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: (status) => {
        console.log('Received status:', status);
        return status < 500; // Don't throw for 4xx errors
      }
    });
    
    console.log('Admin registration response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    
    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Admin registration failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Admin Register Error:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status
    });
    throw error;
  }
};

export const apiLogin = async (username, password) => {
  try {
    console.log('Sending login request with:', { username });
    
    const response = await apiClient.post("/api/user/login", {
      userName: username,
      password: password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: (status) => {
        console.log('Received status:', status);
        return status < 500; // Don't throw for 4xx errors
      }
    });

    console.log('Login response:', {
      status: response.status,
      data: response.data
    });

    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Login failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Login Error:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status
    });
    throw error;
  }
};

export const apiAdminLogin = async (username, password) => {
  try {
    console.log('Sending admin login request with:', { username });
    
    const response = await apiClient.post("/api/admin/login", {
      userName: username.startsWith('admin_') 
        ? username 
        : `admin_${username}`,
      password: password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: (status) => {
        console.log('Received status:', status);
        return status < 500; // Don't throw for 4xx errors
      }
    });

    console.log('Admin login response:', {
      status: response.status,
      data: response.data
    });

    if (response.status >= 400) {
      const error = new Error(response.data?.message || 'Admin login failed');
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API Admin Login Error:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status
    });
    throw error;
  }
};