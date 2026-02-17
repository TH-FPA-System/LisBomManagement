import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { createPartTest, updatePartTest } from "../../api/api"; // centralized api

const PartTestForm = ({ test, onClose, onSaved }) => {
    const isEditMode = Boolean(test?.part && test?.partIssue);

    const [formData, setFormData] = useState({
        part: test?.part || "",
        partIssue: test?.partIssue || "A",
        testType: test?.testType || "PR",
        abortOnFail: test?.abortOnFail || "Y",
        numberRetries: test?.numberRetries ?? 0,
        recordResult: test?.recordResult || " A",
        verificationType: test?.verificationType || "A",
        logicalFunction: test?.logicalFunction || "LIS_TESTAPP",
        testTag: test?.testTag || "VSCHK",
        testTagValue: test?.testTagValue || "0",
        testTagValueType: test?.testTagValueType || "I",
        lowerLimitTag: test?.lowerLimitTag || "NONE",
        lowerLimitValue: test?.lowerLimitValue || "0",
        upperLimitTag: test?.upperLimitTag || "NONE",
        upperLimitValue: test?.upperLimitValue || "999999",
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
                await updatePartTest(formData.part, formData.partIssue, formData);
            } else {
                await createPartTest(formData);
            }
            onSaved();
            onClose();
        } catch (error) {
            console.error(error.response?.data || error);
            alert("Error saving PartTest. Check console.");
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{isEditMode ? "Edit Part Test" : "Add Part Test"}</DialogTitle>
            <DialogContent>
                <TextField label="Part" name="part" value={formData.part} onChange={handleChange} fullWidth margin="dense" InputProps={{ readOnly: isEditMode }} />
                <TextField label="Part Issue" name="partIssue" value={formData.partIssue} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Test Type" name="testType" value={formData.testType} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Logical Function" name="logicalFunction" value={formData.logicalFunction} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Test Tag" name="testTag" value={formData.testTag} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Lower Limit Value" name="lowerLimitValue" value={formData.lowerLimitValue} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Upper Limit Value" name="upperLimitValue" value={formData.upperLimitValue} onChange={handleChange} fullWidth margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PartTestForm;
