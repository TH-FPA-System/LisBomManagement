import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import PartForm from "./PartForm";

const PartList = () => {
    const [parts, setParts] = useState([]);
    const [selectedPart, setSelectedPart] = useState(null);
    const [showForm, setShowForm] = useState(false);
    //const [newPartCode, setNewPartCode] = useState(null);
    //const [showIssueForm, setShowIssueForm] = useState(false);

    const fetchParts = async () => {
        try {
            const response = await axios.get("https://localhost:7079/api/Parts");
            setParts(response.data);
        } catch (error) {
            console.error("Error fetching parts:", error);
            alert("Error fetching parts. Check your API.");
        }
    };
    //TST
    useEffect(() => {
        fetchParts();
    }, []);

    const handleEdit = (part) => {
        setSelectedPart(part);
        setShowForm(true);
    };

    const handleDelete = async (partCode) => {
        if (window.confirm("Are you sure you want to delete this part?")) {
            try {
                await axios.delete(`https://localhost:7079/api/Parts/${partCode}`);
                fetchParts();
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting part.");
            }
        }
    };

    const handleFormClose = () => {
        setSelectedPart(null);
        setShowForm(false);
        fetchParts();
    };

    const handlePartSaved = (partCode) => {
        setShowForm(false);
        setSelectedPart(null);
        fetchParts();
    };



    return (
        <div>
            <h2>Parts List</h2>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
            >
                Add Part
            </Button>

            {showForm && (
                <PartForm
                    part={selectedPart}
                    onClose={handleFormClose}
                    onSaved={handlePartSaved}
                />
            )}

            {/*{showIssueForm && (*/}
            {/*    <PartIssueForm*/}
            {/*        partCode={newPartCode}*/}
            {/*        onClose={() => setShowIssueForm(false)}*/}
            {/*    />*/}
            {/*)}*/}

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Unit Measure</TableCell>
                            <TableCell>Primary Role</TableCell>
                            <TableCell>Date Added</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {parts.map((part) => (
                            <TableRow key={part.partCode}>
                                <TableCell>{part.partCode}</TableCell>
                                <TableCell>{part.description}</TableCell>
                                <TableCell>{part.class}</TableCell>
                                <TableCell>{part.unitMeasure}</TableCell>
                                <TableCell>{part.primaryRole}</TableCell>
                                <TableCell>
                                    {new Date(part.dateAdded).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleEdit(part)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(part.partCode)}
                                    >
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

export default PartList;
