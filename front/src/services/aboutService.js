import api from "./api"; // הכוונה לקובץ שכתבת קודם

export const getPage = async (key) => {
  const res = await api.get(`/api/about/${key}`);
  return res.data;
};

export const updatePage = async (key, data) => {
  const res = await api.put(`/api/about/${key}`, data);
  return res.data;
};
