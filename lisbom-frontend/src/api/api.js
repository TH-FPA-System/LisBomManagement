import axios from "axios";

const API_BASE = "https://localhost:7079/api";

// Parts only for now
export const getParts = () => axios.get(`${API_BASE}/Parts`);
export const createPart = (data) => axios.post(`${API_BASE}/Parts`, data);
export const updatePart = (id, data) => axios.put(`${API_BASE}/Parts/${id}`, data);
export const deletePart = (id) => axios.delete(`${API_BASE}/Parts/${id}`);
