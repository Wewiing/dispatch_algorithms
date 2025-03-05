import React from "react";
import "./Navbar.css";

const Navbar = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
    return (
        <nav className="navbar">
            <button onClick={() => setSelectedAlgorithm("fifo")} className={selectedAlgorithm === "fifo" ? "active" : ""}>FIFO</button>
            <button onClick={() => setSelectedAlgorithm("sjf")} className={selectedAlgorithm === "sjf" ? "active" : ""}>SJF</button>
            <button onClick={() => setSelectedAlgorithm("priority")} className={selectedAlgorithm === "priority" ? "active" : ""}>Priority</button>
        </nav>
    );
};

export default Navbar;
