import React, { useEffect, useState } from "react";
import { getParts, deletePart } from "../../api/api";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Box,
} from "@mui/material";
import PartForm from "./PartForm";

const PartList = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchParts = async () => {
        setLoading(true);
        try {
            const data = await getParts();
            setParts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Error fetching parts.");
            setParts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParts();
    }, []);

    const handleEdit = (part) => {
        setSelectedPart(part);
        setShowForm(true);
    };

    const handleDelete = async (part) => {
        if (!window.confirm("Are you sure you want to delete this part?")) return;
        try {
            await deletePart(part.partCode);
            fetchParts();
        } catch (error) {
            console.error(error);
            alert("Error deleting part.");
        }
    };

    const handleFormClose = () => {
        setSelectedPart(null);
        setShowForm(false);
        fetchParts();
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Parts</h2>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                Add Part
            </Button>

            {showForm && (
                <PartForm
                    part={selectedPart}
                    onClose={handleFormClose}
                    onSaved={fetchParts}
                />
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Part Code</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Unit Measure</TableCell>
                                <TableCell>Primary Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(parts) && parts.length > 0 ? (
                                parts.map((p) => (
                                    <TableRow key={p.partCode}>
                                        <TableCell>{p.partCode}</TableCell>
                                        <TableCell>{p.description}</TableCell>
                                        <TableCell>{p.class}</TableCell>
                                        <TableCell>{p.unitMeasure}</TableCell>
                                        <TableCell>{p.primaryRole}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleEdit(p)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(p)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No parts found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default PartList;
