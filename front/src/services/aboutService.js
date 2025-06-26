import api from "./api";

// שליפת תוכן דף אודות
export const getPage = (key) => api.get(`/api/about/${key}`);

// עדכון תוכן דף אודות
export const updatePage = (key, data) => api.put(`/api/about/${key}`, data);

// העלאת תמונה ושמירתה במסד עם key (למשל: "about")
export const uploadImageToGallery = async (file, key) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", key);

  const res = await api.post("/api/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.image; // כולל url ו־public_id
};

// מחיקת תמונה לפי public_id מהשרת ומ־Cloudinary
export const deleteImageFromGallery = async (publicId) => {
  const res = await api.delete(`/api/images/${publicId}`);
  return res.data;
};

// שליפת תמונות לפי key
export const getImagesByKey = async (key) => {
  const res = await api.get(`/api/images?key=${key}`);
  return res.data; // מערך של תמונות
};
