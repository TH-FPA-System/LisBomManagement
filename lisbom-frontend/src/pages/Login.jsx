import React, { useState } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = window.location.hostname === "localhost"
    ? "https://localhost:7079/api"
    : "/LISBOMManagement/api";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE}/Auth/Login`, { username, password });

            const { token, username: userName, role } = response.data;

            // Save JWT token and role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", userName);
            localStorage.setItem("role", role);

            // Notify App that user is logged in
            onLogin();

            // Redirect to Parts page
            navigate("/parts", { replace: true });

        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Invalid username or password");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 10,
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                bgcolor: "#fafafa",
            }}
        >
            <Typography variant="h5" mb={2} align="center">Login</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>

                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </Stack>
            </form>
        </Box>
    );
}
