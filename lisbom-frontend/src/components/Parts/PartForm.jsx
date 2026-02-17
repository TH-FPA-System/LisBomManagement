import React, { useEffect, useState } from "react";
import { createPart, updatePart, createPartIssue } from "../../api/api";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

const PartForm = ({ part, onClose, onSaved }) => {
    const isEditMode = Boolean(part);

    const [formData, setFormData] = useState({
        partCode: "",
        description: "",
        class: "",
        unitMeasure: "",
        primaryRole: ""
    });

    useEffect(() => {
        if (part) {
            setFormData({
                partCode: part.partCode || "",
                description: part.description || "",
                class: part.class || "",
                unitMeasure: part.unitMeasure || "",
                primaryRole: part.primaryRole || ""
            });
        }
    }, [part]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await updatePart(formData.partCode, formData);
            } else {
                await createPart({
                    ...formData,
                    dateAdded: new Date().toISOString()
                });

                const partCode = formData.partCode;

                // Auto-create default PartIssue
                await createPartIssue({
                    part: partCode,
                    partIssueCode: "A",
                    drawing: "A",
                    drawingIssue: "A",
                    ecnStart: 0,
                    effStart: new Date().toISOString(),
                    ecnClose: 0,
                    effClose: "2099-01-01T00:00:00",
                    ecnStatus: "A",
                    lastMaint: new Date().toISOString(),
                    lastMaintLogon: "SYSTEM"
                });

                onSaved(partCode);
            }

            onClose();
        } catch (error) {
            console.error(error);
            alert("Error saving part or part issue.");
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEditMode ? "Edit Part" : "Add Part"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Part Code"
                    name="partCode"
                    value={formData.partCode}
                    onChange={handleChange}
                    fullWidth
                    disabled={isEditMode}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Unit Measure"
                    name="unitMeasure"
                    value={formData.unitMeasure}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Primary Role"
                    name="primaryRole"
                    value={formData.primaryRole}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PartForm;
