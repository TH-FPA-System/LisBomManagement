import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { createPartPropertyData, updatePartPropertyData } from "../../api/api"; // use centralized API

const PartPropertyDataForm = ({ propertyData, onClose, onSaved }) => {
    const isEditMode = Boolean(propertyData?.part && propertyData?.property);

    const [formData, setFormData] = useState({
        part: propertyData?.part || "",
        property: propertyData?.property || "",
        propertyValue: propertyData?.propertyValue || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await updatePartPropertyData(formData.part, formData.property, formData);
            } else {
                await createPartPropertyData(formData);
            }
            onSaved();
            onClose();
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Error saving PartPropertyData.");
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? "Edit Part Property" : "Add Part Property"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Part"
                    name="part"
                    value={formData.part}
                    onChange={handleChange}
                    InputProps={{ readOnly: isEditMode }}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    InputProps={{ readOnly: isEditMode }}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Property Value"
                    name="propertyValue"
                    value={formData.propertyValue}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PartPropertyDataForm;
