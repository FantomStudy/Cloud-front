import api from "../configs/api";

// файлы от других пользователей
export const showAccessFiles = async () => {
  const response = await api.get("/shared");

  return response.data;
};

// предоставить доступ
export const addAccess = async (file_id, data) => {
  const response = await api.post(`/files/${file_id}/accesses`, data);

  return response;
};

// ограничить доступ
export const removeAccess = async (file_id, data) => {
  const response = await api.delete(`/files/${file_id}/accesses`, { data });

  return response;
};
