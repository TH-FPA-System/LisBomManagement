import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import PartPropertyDataForm from "./PartPropertyDataForm";

const PartPropertyDataList = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProperties = async () => {
        try {
            const res = await axios.get("https://localhost:7079/api/PartPropertyDatas");
            setProperties(res.data);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartPropertyDatas.");
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleEdit = (p) => {
        setSelectedProperty(p);
        setShowForm(true);
    };

    const handleDelete = async (p) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        try {
            await axios.delete(`https://localhost:7079/api/PartPropertyDatas/${p.part}/${p.property}`);
            fetchProperties();
        } catch (error) {
            console.error(error);
            alert("Error deleting property.");
        }
    };

    const handleFormClose = () => {
        setSelectedProperty(null);
        setShowForm(false);
        fetchProperties();
    };

    return (
        <div>
            <h2>Part Property Data</h2>
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                Add Property
            </Button>

            {showForm && (
                <PartPropertyDataForm
                    propertyData={selectedProperty}
                    onClose={handleFormClose}
                    onSaved={fetchProperties}
                />
            )}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Part</TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Property Value</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map(p => (
                            <TableRow key={`${p.part}-${p.property}`}>
                                <TableCell>{p.part}</TableCell>
                                <TableCell>{p.property}</TableCell>
                                <TableCell>{p.propertyValue}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="outlined" onClick={() => handleEdit(p)} sx={{ mr: 1 }}>
                                        Edit
                                    </Button>
                                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(p)}>
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

export default PartPropertyDataList;
