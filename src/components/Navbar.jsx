import React from "react";

const Navbar = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
    return (
        <nav className="navbar">
            <button onClick={() => setSelectedAlgorithm("fifo")} className={selectedAlgorithm === "fifo" ? "active" : ""}>FIFO</button>
            <button onClick={() => setSelectedAlgorithm("sjf")} className={selectedAlgorithm === "sjf" ? "active" : ""}>SJF</button>
            <button onClick={() => setSelectedAlgorithm("priority")} className={selectedAlgorithm === "priority" ? "active" : ""}>Priority Scheduling</button>
        </nav>
    );
};

export default Navbar;
