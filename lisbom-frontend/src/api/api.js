import axios from "axios";


// Detect environment
const isDev = window.location.hostname === "localhost";

// API base
const API_BASE = isDev
    ? "https://localhost:7079/api"  // localhost:3000 => proxy to backend
    : "/LISBOMManagement/api"; // production on server subfolder

// Utility to ensure array
const ensureArray = (data) => Array.isArray(data) ? data : [];

// ------------------- Part -------------------
export const getParts = async () => ensureArray((await axios.get(`${API_BASE}/Parts`)).data);
export const getPart = async (partCode) => (await axios.get(`${API_BASE}/Parts/${partCode}`)).data;
export const createPart = async (data) => (await axios.post(`${API_BASE}/Parts`, data)).data;
export const updatePart = async (partCode, data) => (await axios.put(`${API_BASE}/Parts/${partCode}`, data)).data;
export const deletePart = async (partCode) => (await axios.delete(`${API_BASE}/Parts/${partCode}`)).data;

// ------------------- PartIssue -------------------
export const getPartIssues = async () => ensureArray((await axios.get(`${API_BASE}/PartIssues`)).data);
export const createPartIssue = async (data) => (await axios.post(`${API_BASE}/PartIssues`, data)).data;
export const updatePartIssue = async (part, partIssueCode, data) => (await axios.put(`${API_BASE}/PartIssues/${part}/${partIssueCode}`, data)).data;
export const deletePartIssue = async (part, partIssueCode) => (await axios.delete(`${API_BASE}/PartIssues/${part}/${partIssueCode}`)).data;

// ------------------- PartStructure -------------------
export const getPartStructures = async () => ensureArray((await axios.get(`${API_BASE}/PartStructures`)).data);
export const createPartStructure = async (data) => (await axios.post(`${API_BASE}/PartStructures`, data)).data;
export const updatePartStructure = async (part, task, component, data) => (await axios.put(`${API_BASE}/PartStructures/${part}/${task}/${component}`, data)).data;
export const deletePartStructure = async (part, task, component) => (await axios.delete(`${API_BASE}/PartStructures/${part}/${task}/${component}`)).data;

// ------------------- PartTest -------------------
export const getPartTests = async () => ensureArray((await axios.get(`${API_BASE}/PartTests`)).data);
export const createPartTest = async (data) => (await axios.post(`${API_BASE}/PartTests`, data)).data;
export const updatePartTest = async (part, partIssue, data) => (await axios.put(`${API_BASE}/PartTests/${part}/${partIssue}`, data)).data;
export const deletePartTest = async (part, partIssue) => (await axios.delete(`${API_BASE}/PartTests/${part}/${partIssue}`)).data;

// ------------------- PartPropertyData -------------------
export const getPartPropertyDatas = async () => ensureArray((await axios.get(`${API_BASE}/PartPropertyDatas`)).data);
export const createPartPropertyData = async (data) => (await axios.post(`${API_BASE}/PartPropertyDatas`, data)).data;
export const updatePartPropertyData = async (part, property, data) => (await axios.put(`${API_BASE}/PartPropertyDatas/${part}/${property}`, data)).data;
export const deletePartPropertyData = async (part, property) => (await axios.delete(`${API_BASE}/PartPropertyDatas/${part}/${property}`)).data;
// ------------------- PartMap -------------------
export const getPartMaps = async () => ensureArray((await axios.get(`${API_BASE}/PartMap`)).data);
export const createPartMap = async (data) => (await axios.post(`${API_BASE}/PartMap`, data)).data;
export const updatePartMap = async (mapId, data) => (await axios.put(`${API_BASE}/PartMap/${mapId}`, data)).data;
export const deletePartMap = async (mapId) => (await axios.delete(`${API_BASE}/PartMap/${mapId}`)).data;
