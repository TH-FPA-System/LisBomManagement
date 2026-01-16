import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import PartTestForm from "./PartTestForm";

const PartTestList = () => {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Fetch all PartTests
    const fetchTests = async () => {
        try {
            const res = await axios.get("https://localhost:7079/api/PartTests");
            setTests(res.data);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartTests.");
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    // Open form to edit
    const handleEdit = (test) => {
        setSelectedTest(test);
        setShowForm(true);
    };

    // Delete test
    const handleDelete = async (t) => {
        if (!window.confirm("Are you sure you want to delete this PartTest?")) return;

        try {
            await axios.delete(`https://localhost:7079/api/PartTests/${t.part}/${t.partIssue}`);
            fetchTests();
        } catch (error) {
            console.error(error);
            alert("Error deleting PartTest.");
        }
    };

    const handleFormClose = () => {
        setSelectedTest(null);
        setShowForm(false);
        fetchTests();
    };

    return (
        <div>
            <h2>Part Test</h2>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                Add PartTest
            </Button>

            {showForm && (
                <PartTestForm
                    test={selectedTest}
                    onClose={handleFormClose}
                    onSaved={fetchTests}
                />
            )}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell>Part Issue</TableCell>
                            <TableCell>Test Tag</TableCell>
                            <TableCell>Lower Limit Value</TableCell>
                            <TableCell>Upper Limit Value</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map(t => (
                            <TableRow key={`${t.part}-${t.partIssue}`}>
                                <TableCell>{t.part}</TableCell>
                                <TableCell>{t.partIssue}</TableCell>
                                <TableCell>{t.testTag}</TableCell>
                                <TableCell>{t.lowerLimitValue}</TableCell>
                                <TableCell>{t.upperLimitValue}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="outlined" onClick={() => handleEdit(t)} sx={{ mr: 1 }}>
                                        Edit
                                    </Button>
                                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(t)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartTestList;
