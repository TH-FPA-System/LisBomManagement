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
} from "@mui/material";
import PartMapForm from "./PartMapForm";
import { getPartMaps, deletePartMap } from "../../api/api";
import { isAdmin } from "../../auth"; // ✅ import role helper

const PartMapList = () => {
    const [maps, setMaps] = useState([]);
    const [selectedMap, setSelectedMap] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Fetch all PartMap records
    const fetchMaps = async () => {
        try {
            const data = await getPartMaps();
            setMaps(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            alert("Error fetching PartMap data.");
        }
    };

    useEffect(() => {
        fetchMaps();
    }, []);

    // Open form to edit
    const handleEdit = (map) => {
        setSelectedMap(map);
        setShowForm(true);
    };

    // Delete mapping
    const handleDelete = async (map) => {
        if (!window.confirm("Are you sure you want to delete this mapping?")) return;

        try {
            await deletePartMap(map.mapId);
            fetchMaps();
        } catch (error) {
            console.error(error);
            alert("Error deleting mapping.");
        }
    };

    const handleFormClose = () => {
        setSelectedMap(null);
        setShowForm(false);
        fetchMaps();
    };

    return (
        <div>
            <h2>LISBOM Part Map</h2>

            {/* Only admin can Add Mapping */}
            {isAdmin() && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => setShowForm(true)}
                >
                    Add Mapping
                </Button>
            )}

            {showForm && (
                <PartMapForm
                    map={selectedMap}
                    onClose={handleFormClose}
                    onSaved={fetchMaps}
                />
            )}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>MapId</TableCell>
                            <TableCell>LISBOM Part</TableCell>
                            <TableCell>Part</TableCell>
                            <TableCell>Store Location</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Effective Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maps.length > 0 ? (
                            maps.map((m) => (
                                <TableRow key={m.mapId}>
                                    <TableCell>{m.mapId}</TableCell>
                                    <TableCell>{m.lisBOMPart}</TableCell>
                                    <TableCell>{m.part}</TableCell>
                                    <TableCell>{m.storeLocation}</TableCell>
                                    <TableCell>{m.isActive ? "Yes" : "No"}</TableCell>
                                    <TableCell>
                                        {m.effectiveDate
                                            ? new Date(m.effectiveDate).toLocaleDateString()
                                            : ""}
                                    </TableCell>
                                    <TableCell>
                                        {isAdmin() ? (
                                            <>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleEdit(m)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(m)}
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
                                <TableCell colSpan={7} align="center">
                                    No mappings found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartMapList;
