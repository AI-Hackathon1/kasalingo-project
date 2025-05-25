import { apiClient } from "./config";

export const apiRegister = (payload) => {
  return apiClient.post("/api/user/register", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const apiRegisterAdmin = (payload) => {
  return apiClient.post("/api/admin/register", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const apiLogin = async (payload) => {
  return apiClient.post("/api/user/login", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const apiAdminLogin = async (payload) => {
  return apiClient.post("/api/admin/login", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};