import api from "./api";

// файлы пользователя
export const showMyFiles = async () => {
  const response = await api.get("/files/disk");

  return response.data;
};

// выгрузка файла в облако
export const upload = async (data) => {
  const response = await api.post("/files", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// скачивание файла
export const download = async (file_id, file_name) => {
  const response = await api.get(`/files/${file_id}`, {
    responseType: "blob", // Указываем, что ожидаем бинарные данные
  });

  const url = URL.createObjectURL(response.data); // Создаем ссылку для скачивания
  const link = document.createElement("a");
  link.href = url;
  link.download = file_name; // Простое имя файла
  link.click(); // Автоматический клик по ссылке
  URL.revokeObjectURL(url); // Убираем временный URL
};

// удаление файла
export const deleteFile = async (file_id) => {
  const response = await api.delete(`/files/${file_id}`);

  return response;
};

// переименование файла
export const renameFile = async (file_id, data) => {
  const response = await api.patch(`/files/${file_id}`, data);

  return response;
};

export const showAllFiles = async () => {
  const response = await api.get("/shared");

  return response.data;
};
