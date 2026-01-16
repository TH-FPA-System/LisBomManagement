import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import PartList from "./components/Parts/PartList";
import PartStructureList from "./components/PartStructure/PartStructureList";
import PartTestList from "./components/PartTest/PartTestList";
import PartPropertyDataList from "./components/PartPropertyData/PartPropertyDataList";

function NavButton({ to, label }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Button
                variant={isActive ? "contained" : "outlined"}
                sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 14,
                    minWidth: 140,
                    transition: "0.3s",
                    bgcolor: isActive ? "#1976d2" : "transparent",
                    color: isActive ? "#fff" : "#1976d2",
                    borderColor: "#1976d2",
                    "&:hover": {
                        bgcolor: isActive ? "#1565c0" : "rgba(25, 118, 210, 0.1)",
                        borderColor: "#1565c0"
                    }
                }}
            >
                {label}
            </Button>
        </Link>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: "20px" }}>
                {/* Navigation */}
                <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
                    <NavButton to="/parts" label="Parts" />
                    <NavButton to="/part-structure" label="Part Structure" />
                    <NavButton to="/part-test" label="Part Test" />
                    <NavButton to="/part-property" label="Part Property" />
                </Stack>

                {/* Routes */}
                <Routes>
                    <Route path="/parts" element={<PartList />} />
                    <Route path="/part-structure" element={<PartStructureList />} />
                    <Route path="/part-test" element={<PartTestList />} />
                    <Route path="/part-property" element={<PartPropertyDataList />} />
                    <Route path="*" element={<PartList />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
