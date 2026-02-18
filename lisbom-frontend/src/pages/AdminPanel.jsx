import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { getUsers, updateUserRole, deleteUser } from "../api/api";

export default function AdminPanel() {
    const username = localStorage.getItem("username");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // Load users on mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load users");
        }
    };

    const handleRoleToggle = async (user) => {
        try {
            const newRole = user.role === "Admin" ? "User" : "Admin";
            await updateUserRole(user.userId, newRole);
            fetchUsers();
        } catch (err) {
            console.error(err);
            setError("Failed to update role");
        }
    };

    const handleDelete = async (user) => {
        if (!window.confirm(`Are you sure you want to delete ${user.username}?`)) return;
        try {
            await deleteUser(user.userId);
            fetchUsers();
        } catch (err) {
            console.error(err);
            setError("Failed to delete user");
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" mb={2}>Admin Panel</Typography>
            <Typography>Welcome, {username}! You have admin privileges.</Typography>

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Last Login</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "-"}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleRoleToggle(user)}
                                        sx={{ mr: 1 }}
                                    >
                                        {user.role === "Admin" ? "Revoke Admin" : "Grant Admin"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
