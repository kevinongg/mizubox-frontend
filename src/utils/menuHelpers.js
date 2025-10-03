// utils/menuHelpers.js

export const showMessage = (setMessage, text, delay = 2000) => {
  setMessage(text);
  setTimeout(() => setMessage(""), delay);
};

export const checkAuth = (token, navigate) => {
  if (!token) {
    navigate("/login");
    return false;
  }
  return true;
};
