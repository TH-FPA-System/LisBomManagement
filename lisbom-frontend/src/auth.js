// src/auth.js
export const getToken = () => localStorage.getItem("token");

export const getUserRole = () => localStorage.getItem("role");

export const isAdmin = () => getUserRole() === "Admin";

export const isLoggedIn = () => !!getToken();

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/login";
};
