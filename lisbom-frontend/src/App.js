import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

// Import pages/components
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";

import PartList from "./components/Parts/PartList";
import PartStructureList from "./components/PartStructure/PartStructureList";
import PartTestList from "./components/PartTest/PartTestList";
import PartPropertyDataList from "./components/PartPropertyData/PartPropertyDataList";
import PartMapList from "./components/PartMap/PartMapList";


// ------------------ Auth helpers ------------------
const getToken = () => localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role");
const isAdmin = () => getUserRole() === "Admin";

// ------------------ Nav Button ------------------
function NavButton({ to, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Button
                variant={isActive ? "contained" : "outlined"}
                sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 14,
                    minWidth: 140,
                    transition: "0.3s",
                    bgcolor: isActive ? "#1976d2" : "transparent",
                    color: isActive ? "#fff" : "#1976d2",
                    borderColor: "#1976d2",
                    "&:hover": {
                        bgcolor: isActive ? "#1565c0" : "rgba(25, 118, 210, 0.1)",
                        borderColor: "#1565c0"
                    }
                }}
            >
                {label}
            </Button>
        </Link>
    );
}

// ------------------ Protected Route ------------------
function ProtectedRoute({ children, adminOnly = false }) {
    const token = getToken();
    const role = getUserRole();

    if (!token) return <Navigate to="/login" replace />;
    if (adminOnly && role !== "Admin") return <Navigate to="/parts" replace />;

    return children;
}

// ------------------ App Component ------------------
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

    // Listen for changes to localStorage from other tabs/windows
    useEffect(() => {
        const handleStorageChange = () => setIsLoggedIn(!!getToken());
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        window.location.href = "/LISBOMManagement/login";
    };

    return (
        //<BrowserRouter>
            <BrowserRouter basename="/LISBOMManagement">
            <div style={{ padding: "20px" }}>
                {isLoggedIn && (
                    <>
                        {/* Navigation */}
                        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 3 }}>
                            <Stack direction="row" spacing={2}>
                                <NavButton to="/parts" label="Parts" />
                                <NavButton to="/part-structure" label="Part Structure" />
                                <NavButton to="/part-test" label="Part Test" />
                                <NavButton to="/part-property" label="Part Property" />
                                <NavButton to="/part-map" label="Part Map" />                             
                                {isAdmin() && <NavButton to="/admin" label="Admin Panel" />}
                            </Stack>

                            {/* Logout button */}
                            <Button variant="outlined" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Stack>
                    </>
                )}

                {/* Routes */}
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected */}
                    <Route path="/parts" element={<ProtectedRoute><PartList /></ProtectedRoute>} />
                    <Route path="/part-structure" element={<ProtectedRoute><PartStructureList /></ProtectedRoute>} />
                    <Route path="/part-test" element={<ProtectedRoute><PartTestList /></ProtectedRoute>} />
                    <Route path="/part-property" element={<ProtectedRoute><PartPropertyDataList /></ProtectedRoute>} />
                    <Route path="/part-map" element={<ProtectedRoute><PartMapList /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route
                        path="*"
                        element={isLoggedIn ? <Navigate to="/parts" /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
