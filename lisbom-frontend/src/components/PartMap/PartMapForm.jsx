import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { getPartMaps, createPartMap, updatePartMap, deletePartMap } from "../../api/api";


const PartMapForm = ({ map, onClose, onSaved }) => {
    const isEditMode = Boolean(map);

    const [formData, setFormData] = useState({
        mapId: 0,
        lisBOMPart: "",
        part: "",
        storeLocation: "",
        isActive: true,
        effectiveDate: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (map) {
            setFormData({
                mapId: map.mapId || 0,
                lisBOMPart: map.lisBOMPart || "",
                part: map.part || "",
                storeLocation: map.storeLocation || "",
                isActive: map.isActive ?? true,
                effectiveDate: map.effectiveDate
                    ? new Date(map.effectiveDate).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
            });
        }
    }, [map]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await updatePartMap(formData.mapId, formData);
            } else {
                await createPartMap(formData);
            }
            onSaved?.(); // refresh list if parent provides callback
            onClose();
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Error saving PartMap");
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditMode ? "Edit Mapping" : "Add Mapping"}</DialogTitle>

            <DialogContent>
                {isEditMode && (
                    <TextField
                        margin="dense"
                        label="Map ID"
                        name="mapId"
                        value={formData.mapId}
                        fullWidth
                        disabled
                    />
                )}
                <TextField
                    margin="dense"
                    label="LISBOM Part"
                    name="lisBOMPart"
                    value={formData.lisBOMPart}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Part"
                    name="part"
                    value={formData.part}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Store Location"
                    name="storeLocation"
                    value={formData.storeLocation}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.isActive}
                            onChange={handleChange}
                            name="isActive"
                        />
                    }
                    label="Active"
                />
                <TextField
                    margin="dense"
                    label="Effective Date"
                    name="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PartMapForm;
