/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProcessProvider } from "./context/processes";
import Simulation from "./components/Simulation";
import Sidebar from "./components/Sidebar";
import FormPage from "./components/FormPage";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

const App = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("fifo");

    return (
        <ProcessProvider>
            <Router future={{ v7_startTransition: true }}>
                <div className="app-container">
                    <Sidebar />
                    <MainContent selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
                </div>
            </Router>
        </ProcessProvider>
    );
};

const MainContent = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
    const location = useLocation();

    return (
        <div className="main-content">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: '#202124' }} // Asegúrate de que el color de fondo coincida con el de tu aplicación
                >
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Navigate to="/form" replace />} />
                        <Route path="/form" element={<FormPage />} />
                        <Route
                            path="/simulation"
                            element={<Simulation selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />}
                        />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default App;
