import React, { useEffect, useState } from "react";
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
import PartStructureForm from "./PartStructureForm";
import { getPartStructures, deletePartStructure } from "../../api/api";
import { isAdmin } from "../../auth"; // ✅ import role helper

const PartStructureList = () => {
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchStructures = async () => {
        setLoading(true);
        try {
            const data = await getPartStructures();
            setStructures(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartStructures.");
            setStructures([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStructures();
    }, []);

    const handleEdit = (structure) => {
        setSelectedStructure(structure);
        setShowForm(true);
    };

    const handleDelete = async (s) => {
        if (!window.confirm("Are you sure you want to delete this structure?")) return;

        try {
            await deletePartStructure(s.part, s.task, s.component);
            fetchStructures();
        } catch (error) {
            console.error(error);
            alert("Error deleting structure.");
        }
    };

    const handleFormClose = () => {
        setSelectedStructure(null);
        setShowForm(false);
        fetchStructures();
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Part Structure</h2>

            {/* Only admin can add */}
            {isAdmin() && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => {
                        setSelectedStructure(null);
                        setShowForm(true);
                    }}
                >
                    Add Structure
                </Button>
            )}

            {showForm && isAdmin() && (
                <PartStructureForm
                    structure={selectedStructure}
                    onClose={handleFormClose}
                    onSaved={fetchStructures}
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
                                <TableCell>Part</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Task Ref</TableCell>
                                <TableCell>Component</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>ECN Start</TableCell>
                                <TableCell>ECN Status</TableCell>
                                <TableCell>Eff Start</TableCell>
                                <TableCell>Eff Close</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(structures) && structures.length > 0 ? (
                                structures.map((s) => (
                                    <TableRow key={`${s.part}-${s.task}-${s.component}`}>
                                        <TableCell>{s.part}</TableCell>
                                        <TableCell>{s.task}</TableCell>
                                        <TableCell>{s.taskReference}</TableCell>
                                        <TableCell>{s.component}</TableCell>
                                        <TableCell>{s.quantity}</TableCell>
                                        <TableCell>{s.ecnStart}</TableCell>
                                        <TableCell>{s.ecnStatus || ""}</TableCell>
                                        <TableCell>
                                            {s.effStart ? new Date(s.effStart).toLocaleString() : ""}
                                        </TableCell>
                                        <TableCell>
                                            {s.effClose ? new Date(s.effClose).toLocaleString() : ""}
                                        </TableCell>
                                        <TableCell>
                                            {isAdmin() ? (
                                                <>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ mr: 1 }}
                                                        onClick={() => handleEdit(s)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleDelete(s)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            ) : (
                                                <span style={{ color: "#888" }}>No actions</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        No structures found
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

export default PartStructureList;
