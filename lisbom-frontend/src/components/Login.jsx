import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = window.location.hostname === "localhost"
    ? "https://localhost:7079/api"
    : "/LISBOMManagement/api";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // for redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${API_BASE}/Auth/Login`, { username, password });
            const data = response.data;

            // Save token in localStorage
            localStorage.setItem("token", data.token);

            // Save role in localStorage
            localStorage.setItem("role", data.role); // <-- important for isAdmin()

            // Notify App.js that user is logged in
            onLogin();

            // Redirect to /parts automatically
            navigate("/parts", { replace: true });

        } catch (err) {
            console.error(err);
            setError("Invalid username or password");
        }
    };

    return (
        <Box
            sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
        >
            <Typography variant="h6" mb={2}>Login</Typography>
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
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
        </Box>
    );
}
