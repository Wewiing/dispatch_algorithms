import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProcessProvider } from "./context/processes";
import Simulation from "./components/Simulation";
import Sidebar  from "./components/sidebar";
import FormPage from "./components/FormPage";

import "./App.css";

const App = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("fifo");

    return (
        <ProcessProvider>
            <Router>
                <div className="app-container">
                    <Sidebar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/form" element={<FormPage />} />
                            <Route
                                path="/simulation"
                                element={<Simulation selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />}
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ProcessProvider>

    );
};

export default App;
