import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

// Import all components
import PartList from "./components/Parts/PartList";
import PartStructureList from "./components/PartStructure/PartStructureList";
import PartTestList from "./components/PartTest/PartTestList";
import PartPropertyDataList from "./components/PartPropertyData/PartPropertyDataList";
import PartMapList from "./components/PartMap/PartMapList";
import Login from "./components/Login";

// Navigation Button component
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

// Protected Route wrapper
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    // Listen for changes to localStorage from other tabs/windows
    useEffect(() => {
        const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("token"));
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <div style={{ padding: "20px" }}>
                {isLoggedIn && (
                    <>
                        {/* Navigation */}
                        <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
                            <NavButton to="/parts" label="Parts" />
                            <NavButton to="/part-structure" label="Part Structure" />
                            <NavButton to="/part-test" label="Part Test" />
                            <NavButton to="/part-property" label="Part Property" />
                            <NavButton to="/part-map" label="Part Map" />
                        </Stack>

                        {/* Logout button */}
                        <Button
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{ mb: 3 }}
                        >
                            Logout
                        </Button>
                    </>
                )}

                {/* Routes */}
                <Routes>
                    <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* Protected routes */}
                    <Route
                        path="/parts"
                        element={
                            <ProtectedRoute>
                                <PartList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/part-structure"
                        element={
                            <ProtectedRoute>
                                <PartStructureList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/part-test"
                        element={
                            <ProtectedRoute>
                                <PartTestList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/part-property"
                        element={
                            <ProtectedRoute>
                                <PartPropertyDataList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/part-map"
                        element={
                            <ProtectedRoute>
                                <PartMapList />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirect unknown paths */}
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
