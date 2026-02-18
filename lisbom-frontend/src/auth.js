// auth.js
export const getUserRole = () => localStorage.getItem("role");
export const isAdmin = () => getUserRole() === "Admin";
