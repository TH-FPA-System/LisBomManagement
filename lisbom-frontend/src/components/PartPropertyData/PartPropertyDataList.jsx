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
import PartPropertyDataForm from "./PartPropertyDataForm";
import { getPartPropertyDatas, deletePartPropertyData } from "../../api/api";

const PartPropertyDataList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const data = await getPartPropertyDatas();
            setProperties(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartPropertyDatas.");
            setProperties([]);
        } finally {
            setLoading(false);
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
            await deletePartPropertyData(p.part, p.property);
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
        <Box sx={{ p: 2 }}>
            <h2>Part Property Data</h2>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setSelectedProperty(null);
                    setShowForm(true);
                }}
                sx={{ mb: 2 }}
            >
                Add Property
            </Button>

            {showForm && (
                <PartPropertyDataForm
                    propertyData={selectedProperty}
                    onClose={handleFormClose}
                    onSaved={fetchProperties}
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
                                <TableCell>Property</TableCell>
                                <TableCell>Property Value</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(properties) && properties.length > 0 ? (
                                properties.map((p) => (
                                    <TableRow key={`${p.part}-${p.property}`}>
                                        <TableCell>{p.part}</TableCell>
                                        <TableCell>{p.property}</TableCell>
                                        <TableCell>{p.propertyValue}</TableCell>
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
                                    <TableCell colSpan={4} align="center">
                                        No properties found
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

export default PartPropertyDataList;
