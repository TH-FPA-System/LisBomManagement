import React, { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

const PartIssueForm = ({ partCode, onClose }) => {
    const [data, setData] = useState({
        partIssueCode: "",
        drawing: "",
        drawingIssue: "",
        ecnStart: 0,
        effStart: new Date().toISOString(),
        ecnClose: 0,
        effClose: "2099-01-01T00:00:00.000Z",
        ecnStatus: "A",
        lastMaint: new Date().toISOString(),
        lastMaintLogon: "SYSTEM"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.post("https://localhost:7079/api/PartIssues", {
                part: partCode,
                ...data
            });

            // allow add multiple issues
            setData({
                ...data,
                partIssueCode: "",
                drawing: "",
                drawingIssue: ""
            });
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Error saving Part Issue");
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Part Issue ({partCode})</DialogTitle>

            <DialogContent>
                <TextField
                    label="Issue Code"
                    name="partIssueCode"
                    value={data.partIssueCode}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />

                <TextField
                    label="Drawing"
                    name="drawing"
                    value={data.drawing}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />

                <TextField
                    label="Drawing Issue"
                    name="drawingIssue"
                    value={data.drawingIssue}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Done</Button>
                <Button variant="contained" onClick={handleSave}>
                    Add Issue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PartIssueForm;
