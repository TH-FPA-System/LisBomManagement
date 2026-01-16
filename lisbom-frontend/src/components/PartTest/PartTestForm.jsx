import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import axios from "axios";

const PartTestForm = ({ test, onClose, onSaved }) => {
    const isEditMode = Boolean(test?.part && test?.partIssue);

    const [formData, setFormData] = useState({
        part: test?.part || "",                       // user input
        partIssue: test?.partIssue || "A",           // default = 'A'
        testType: test?.testType || "PR",            // default = 'PR'
        abortOnFail: test?.abortOnFail || "Y",
        numberRetries: test?.numberRetries ?? 0,
        recordResult: test?.recordResult || " A",
        verificationType: test?.verificationType || "A",
        logicalFunction: test?.logicalFunction || "LIS_TESTAPP", // default
        testTag: test?.testTag || "VSCHK",           // default
        testTagValue: test?.testTagValue || "0",
        testTagValueType: test?.testTagValueType || "I",
        lowerLimitTag: test?.lowerLimitTag || "NONE",
        lowerLimitValue: test?.lowerLimitValue || "0",         // default
        upperLimitTag: test?.upperLimitTag || "NONE",
        upperLimitValue: test?.upperLimitValue || "999999",    // default
        limitValueType: test?.limitValueType || "",
        nominalValue: test?.nominalValue || "",
        averageMean: test?.averageMean || "",
        lowerLimitMean: test?.lowerLimitMean || "",
        lowerLimitRange: test?.lowerLimitRange || "",
        upperLimitMean: test?.upperLimitMean || "",
        upperLimitRange: test?.upperLimitRange || "",
        standardDeviation: test?.standardDeviation || "",
        sampleSize: test?.sampleSize || ""
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await axios.put(
                    `https://localhost:7079/api/PartTests/${formData.part}/${formData.partIssue}`,
                    formData
                );
            } else {
                await axios.post("https://localhost:7079/api/PartTests", formData);
            }

            onSaved();
            onClose();
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Error saving PartTest. Check console for details.");
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{isEditMode ? "Edit Part Test" : "Add Part Test"}</DialogTitle>
            <DialogContent>
                {/* User editable fields */}
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
                    label="Part Issue"
                    name="partIssue"
                    value={formData.partIssue}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Test Type"
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Logical Function"
                    name="logicalFunction"
                    value={formData.logicalFunction}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Test Tag"
                    name="testTag"
                    value={formData.testTag}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Lower Limit Tag"
                    name="lowerLimitTag"
                    value={formData.lowerLimitTag}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Lower Limit Value"
                    name="lowerLimitValue"
                    value={formData.lowerLimitValue}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Upper Limit Tag"
                    name="upperLimitTag"
                    value={formData.upperLimitTag}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Upper Limit Value"
                    name="upperLimitValue"
                    value={formData.upperLimitValue}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
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

export default PartTestForm;
