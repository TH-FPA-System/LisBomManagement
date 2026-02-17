import React, { useState, useEffect } from "react";
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
import { getPartTests, deletePartTest } from "../../api/api";
import PartTestForm from "./PartTestForm";

const PartTestList = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchTests = async () => {
        setLoading(true);
        try {
            const data = await getPartTests();
            setTests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartTests.");
            setTests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const handleEdit = (test) => {
        setSelectedTest(test);
        setShowForm(true);
    };

    const handleDelete = async (t) => {
        if (!window.confirm("Delete this Part Test?")) return;

        try {
            await deletePartTest(t.part, t.partIssue);
            fetchTests();
        } catch (error) {
            console.error(error);
            alert("Error deleting Part Test.");
        }
    };

    const handleFormClose = () => {
        setSelectedTest(null);
        setShowForm(false);
        fetchTests();
    };

    return (
        <Box sx={{ p: 2 }}>
            <h2>Part Tests</h2>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => {
                    setSelectedTest(null);
                    setShowForm(true);
                }}
            >
                Add Part Test
            </Button>

            {showForm && (
                <PartTestForm
                    test={selectedTest}
                    onClose={handleFormClose}
                    onSaved={fetchTests}
                />
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Part</TableCell>
                                <TableCell>Part Issue</TableCell>
                                <TableCell>Test Type</TableCell>
                                <TableCell>Logical Function</TableCell>
                                <TableCell>Test Tag</TableCell>
                                <TableCell>Lower Limit</TableCell>
                                <TableCell>Upper Limit</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(tests) && tests.length > 0 ? (
                                tests.map((t) => (
                                    <TableRow key={`${t.part}-${t.partIssue}`}>
                                        <TableCell>{t.part}</TableCell>
                                        <TableCell>{t.partIssue}</TableCell>
                                        <TableCell>{t.testType}</TableCell>
                                        <TableCell>{t.logicalFunction}</TableCell>
                                        <TableCell>{t.testTag}</TableCell>
                                        <TableCell>{t.lowerLimitValue}</TableCell>
                                        <TableCell>{t.upperLimitValue}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleEdit(t)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(t)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No Part Tests found
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

export default PartTestList;
