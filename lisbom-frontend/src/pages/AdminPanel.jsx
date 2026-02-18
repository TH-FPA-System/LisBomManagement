import React from "react";
import { Box, Typography } from "@mui/material";

export default function AdminPanel() {
    const username = localStorage.getItem("username");

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" mb={2}>Admin Panel</Typography>
            <Typography>Welcome, {username}! You have admin privileges.</Typography>
            <Typography sx={{ mt: 2 }}>
                Here you can manage users and perform admin-specific tasks.
            </Typography>
        </Box>
    );
}
