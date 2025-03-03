import React from "react";
import Navbar from "./Navbar";
import ChartsPage from "./ChartsPage";

const Simulation = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
    return (
        <div className="simulation">
            <Navbar selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
            <ChartsPage algorithm={selectedAlgorithm}/>
        </div>
    );
};

export default Simulation;
