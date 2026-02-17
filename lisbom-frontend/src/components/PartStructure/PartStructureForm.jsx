import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { createPartStructure, updatePartStructure } from "../../api/api"; // <-- use helper

const PartStructureForm = ({ structure, onClose, onSaved }) => {
    const isEditMode = Boolean(structure);

    const [formData, setFormData] = useState({
        part: "",
        task: 0,
        taskReference: "",
        component: "",
        quantity: 1,
        ecnStart: 0,
        effStart: new Date().toISOString(),
        ecnClose: 0,
        effClose: "2099-01-01T00:00:00",
        ecnStatus: "0",
        engConcession: 0,
        lastMaint: new Date().toISOString(),
        lastMaintLogon: "SYSTEM",
        dateAdded: new Date().toISOString()
    });

    useEffect(() => {
        if (structure) {
            setFormData({ ...structure });
        }
    }, [structure]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const payload = { ...formData };

            if (isEditMode) {
                await updatePartStructure(payload.part, payload.task, payload.component, payload);
            } else {
                await createPartStructure(payload);
            }

            onSaved();
            onClose();
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Error saving Part Structure. Check console for details.");
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{isEditMode ? "Edit Part Structure" : "Add Part Structure"}</DialogTitle>
            <DialogContent>
                <TextField label="Part" name="part" value={formData.part} onChange={handleChange} fullWidth margin="dense" disabled={isEditMode} />
                <TextField label="Task" name="task" type="number" value={formData.task} onChange={handleChange} fullWidth margin="dense" disabled={isEditMode} />
                <TextField label="Task Reference" name="taskReference" value={formData.taskReference} onChange={handleChange} fullWidth margin="dense" disabled={isEditMode} />
                <TextField label="Component" name="component" value={formData.component} onChange={handleChange} fullWidth margin="dense" disabled={isEditMode} />
                <TextField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="ECN Start" name="ecnStart" type="number" value={formData.ecnStart} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="ECN Status" name="ecnStatus" value={formData.ecnStatus} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Eng Concession" name="engConcession" type="number" value={formData.engConcession} onChange={handleChange} fullWidth margin="dense" />
                <TextField
                    label="Effective Start"
                    name="effStart"
                    type="datetime-local"
                    value={formData.effStart.slice(0, 16)}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Effective Close"
                    name="effClose"
                    type="datetime-local"
                    value={formData.effClose.slice(0, 16)}
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

export default PartStructureForm;
