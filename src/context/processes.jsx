import React, { createContext, useState } from "react";

// Crear el contexto
const ProcessContext = createContext();

// Crear un proveedor de contexto
export const ProcessProvider = ({ children }) => {
    const [processes, setProcesses] = useState([]);

    const handleAddProcess = (process) => {
        setProcesses([...processes, process]);
    };

    const handleRemoveProcess = (index) => {
        setProcesses(processes.filter((_, i) => i !== index));
    };

    return (
        <ProcessContext.Provider value={{ processes, handleAddProcess, handleRemoveProcess }}>
            {children}
        </ProcessContext.Provider>
    );
};

export default ProcessContext;