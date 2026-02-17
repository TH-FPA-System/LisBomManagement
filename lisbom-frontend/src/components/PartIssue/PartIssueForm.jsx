//import React, { useState } from "react";
//import {
//    Dialog,
//    DialogTitle,
//    DialogContent,
//    DialogActions,
//    TextField,
//    Button
//} from "@mui/material";
//import { createPartIssue } from "../../api/api"; // <-- use api.js helper

//const PartIssueForm = ({ partCode, onClose }) => {
//    const [data, setData] = useState({
//        partIssueCode: "",
//        drawing: "",
//        drawingIssue: "",
//        ecnStart: 0,
//        effStart: new Date().toISOString(),
//        ecnClose: 0,
//        effClose: "2099-01-01T00:00:00.000Z",
//        ecnStatus: "A",
//        lastMaint: new Date().toISOString(),
//        lastMaintLogon: "SYSTEM"
//    });

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setData(prev => ({ ...prev, [name]: value }));
//    };

//    const handleSave = async () => {
//        try {
//            // Use API helper to create PartIssue
//            await createPartIssue({
//                part: partCode,
//                ...data
//            });

//            // Reset fields for adding multiple issues
//            setData(prev => ({
//                ...prev,
//                partIssueCode: "",
//                drawing: "",
//                drawingIssue: ""
//            }));
//        } catch (err) {
//            console.error(err.response?.data || err);
//            alert("Error saving Part Issue");
//        }
//    };

//    return (
//        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
//            <DialogTitle>Add Part Issue ({partCode})</DialogTitle>

//            <DialogContent>
//                <TextField
//                    label="Issue Code"
//                    name="partIssueCode"
//                    value={data.partIssueCode}
//                    onChange={handleChange}
//                    fullWidth
//                    margin="dense"
//                />

//                <TextField
//                    label="Drawing"
//                    name="drawing"
//                    value={data.drawing}
//                    onChange={handleChange}
//                    fullWidth
//                    margin="dense"
//                />

//                <TextField
//                    label="Drawing Issue"
//                    name="drawingIssue"
//                    value={data.drawingIssue}
//                    onChange={handleChange}
//                    fullWidth
//                    margin="dense"
//                />
//            </DialogContent>

//            <DialogActions>
//                <Button onClick={onClose}>Done</Button>
//                <Button variant="contained" onClick={handleSave}>
//                    Add Issue
//                </Button>
//            </DialogActions>
//        </Dialog>
//    );
//};

//export default PartIssueForm;
