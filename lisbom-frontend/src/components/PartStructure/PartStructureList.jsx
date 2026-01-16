import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import PartStructureForm from "./PartStructureForm";

const PartStructureList = () => {
    const [structures, setStructures] = useState([]);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchStructures = async () => {
        try {
            const res = await axios.get("https://localhost:7079/api/PartStructures");
            setStructures(res.data);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartStructures.");
        }
    };

    useEffect(() => { fetchStructures(); }, []);

    const handleEdit = (structure) => {
        setSelectedStructure(structure);
        setShowForm(true);
    };

    const handleDelete = async (s) => {
        if (!window.confirm("Are you sure you want to delete this structure?")) return;

        try {
            await axios.delete(
                `https://localhost:7079/api/PartStructures/${s.part}/${s.task}/${s.component}`
            );
            fetchStructures();
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Error deleting structure.");
        }
    };

    const handleFormClose = () => {
        setSelectedStructure(null);
        setShowForm(false);
        fetchStructures();
    };

    return (
        <div>
            <h2>Part Structure</h2>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>Add Structure</Button>

            {showForm && (
                <PartStructureForm
                    structure={selectedStructure}
                    onClose={handleFormClose}
                    onSaved={fetchStructures}
                />
            )}

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
                        {structures.map(s => (
                            <TableRow key={`${s.part}-${s.task}-${s.component}`}>
                                <TableCell>{s.part}</TableCell>
                                <TableCell>{s.task}</TableCell>
                                <TableCell>{s.taskReference}</TableCell>
                                <TableCell>{s.component}</TableCell>
                                <TableCell>{s.quantity}</TableCell>
                                <TableCell>{s.ecnStart}</TableCell>
                                <TableCell>{s.ecnStatus}</TableCell>
                                <TableCell>{new Date(s.effStart).toLocaleString()}</TableCell>
                                <TableCell>{new Date(s.effClose).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="outlined" onClick={() => handleEdit(s)} sx={{ mr: 1 }}>Edit</Button>
                                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(s)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartStructureList;
