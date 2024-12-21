import api from "../configs/api";

export const register = async (data) => {
  const response = await api.post("/registration", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/login", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); 
  }

  return response.data;
};

export const logout = async () => {
  const response = await api.get("/logout");
  localStorage.removeItem("token");

  return response.data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
