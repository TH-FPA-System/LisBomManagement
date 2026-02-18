import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register({ username, password, role });
            alert("User registered successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Error registering user");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
                <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField label="Role (Admin/User)" fullWidth margin="normal" value={role} onChange={e => setRole(e.target.value)} />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
            </form>
        </Box>
    );
}
