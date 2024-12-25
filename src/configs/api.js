import axios from "axios";

// настройка аксиос
const api = axios.create({
  baseURL: "https://disk-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// интерсептор для добавления токена к запросу перед отправкой
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      alert("Your session has been completed");
    }
    return Promise.reject(error); // Прокидываем ошибку дальше, если она не связана с 401
  }
);

export default api;
