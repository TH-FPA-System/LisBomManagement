import axios from "axios";

// Detect environment
const isDev = window.location.hostname === "localhost";

// API base URL
const API_BASE = isDev
    ? "https://localhost:7079/api"
    : "/LISBOMManagement/api";

// Ensure returned data is always an array
const ensureArray = (data) => Array.isArray(data) ? data : [];

// Axios instance with JWT token
const apiClient = axios.create({
    baseURL: API_BASE,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ===== Part =====
export const getParts = async () => ensureArray((await apiClient.get("/Parts")).data);
export const getPart = async (partCode) => (await apiClient.get(`/Parts/${partCode}`)).data;
export const createPart = async (data) => (await apiClient.post("/Parts", data)).data;
export const updatePart = async (partCode, data) => (await apiClient.put(`/Parts/${partCode}`, data)).data;
export const deletePart = async (partCode) => (await apiClient.delete(`/Parts/${partCode}`)).data;

// ===== PartIssue =====
export const getPartIssues = async () => ensureArray((await apiClient.get("/PartIssues")).data);
export const createPartIssue = async (data) => (await apiClient.post("/PartIssues", data)).data;
export const updatePartIssue = async (part, partIssueCode, data) => (await apiClient.put(`/PartIssues/${part}/${partIssueCode}`, data)).data;
export const deletePartIssue = async (part, partIssueCode) => (await apiClient.delete(`/PartIssues/${part}/${partIssueCode}`)).data;

// ===== PartStructure =====
export const getPartStructures = async () => ensureArray((await apiClient.get("/PartStructures")).data);
export const createPartStructure = async (data) => (await apiClient.post("/PartStructures", data)).data;
export const updatePartStructure = async (part, task, component, data) => (await apiClient.put(`/PartStructures/${part}/${task}/${component}`, data)).data;
export const deletePartStructure = async (part, task, component) => (await apiClient.delete(`/PartStructures/${part}/${task}/${component}`)).data;

// ===== PartTest =====
export const getPartTests = async () => ensureArray((await apiClient.get("/PartTests")).data);
export const createPartTest = async (data) => (await apiClient.post("/PartTests", data)).data;
export const updatePartTest = async (part, partIssue, data) => (await apiClient.put(`/PartTests/${part}/${partIssue}`, data)).data;
export const deletePartTest = async (part, partIssue) => (await apiClient.delete(`/PartTests/${part}/${partIssue}`)).data;

// ===== PartPropertyData =====
export const getPartPropertyDatas = async () => ensureArray((await apiClient.get("/PartPropertyDatas")).data);
export const createPartPropertyData = async (data) => (await apiClient.post("/PartPropertyDatas", data)).data;
export const updatePartPropertyData = async (part, property, data) => (await apiClient.put(`/PartPropertyDatas/${part}/${property}`, data)).data;
export const deletePartPropertyData = async (part, property) => (await apiClient.delete(`/PartPropertyDatas/${part}/${property}`)).data;

// ===== PartMap =====
export const getPartMaps = async () => ensureArray((await apiClient.get("/PartMap")).data);
export const createPartMap = async (data) => (await apiClient.post("/PartMap", data)).data;
export const updatePartMap = async (mapId, data) => (await apiClient.put(`/PartMap/${mapId}`, data)).data;
export const deletePartMap = async (mapId) => (await apiClient.delete(`/PartMap/${mapId}`)).data;

// ===== Auth =====
export const login = async (data) => (await apiClient.post("/Auth/Login", data)).data;
export const register = async (data) => (await apiClient.post("/Auth/Register", data)).data;

// ===== User Management (Admin) =====
export const getUsers = async () => {
    const res = await apiClient.get("/Auth/Users");
    return ensureArray(res.data);
};

// roleData should be { role: "User" | "Admin" }
export const updateUserRole = async (userId, role) => {
    return (await apiClient.put(`/Auth/Users/${userId}/role`, { role })).data;
};

export const deleteUser = async (userId) => {
    return (await apiClient.delete(`/Auth/Users/${userId}`)).data;
};
