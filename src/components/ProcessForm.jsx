import React, { useState } from "react";
import useProcessContext from "../hooks/useProcessContext";

import "./ProcessForm.css"

const ProcessForm = () => {
    const [name, setName] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [burstTime, setBurstTime] = useState("");
    const [priority, setPriority] = useState("");
    const { processes, handleAddProcess } = useProcessContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de entrada
        if (!name || arrivalTime === "" || burstTime === "" || priority === "") {
            showAlert("Por favor, complete todos los campos.");
            return;
        }

        if (burstTime == 0) {
            showAlert("El tiempo de rafaga no puede ser cero!!")
            return;
        }

        if (arrivalTime < 0 || burstTime <= 0 || priority < 0) {
            showAlert("Los valores numéricos deben ser positivos.");
            return;
        }

        // Validación de nombre duplicado
        if (processes.some(process => process.name === name)) {
            showAlert("Ya existe un proceso con este nombre.");
            return;
        }

        // Crear el objeto del proceso
        const newProcess = {
            name,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime),
            priority: parseInt(priority),
        };

        // Enviar el proceso al componente padre (App.jsx)
        handleAddProcess(newProcess);

        // Limpiar el formulario
        setName("");
        setArrivalTime("");
        setBurstTime("");
        setPriority("");
    };

    return (
        <form className="Form" onSubmit={handleSubmit}>
            <h3>Agregar Proceso</h3>
            <input
                type="text"
                placeholder="Nombre del proceso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Tiempo de ráfaga"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Tiempo de llegada"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Prioridad"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            />
            <button type="submit">Agregar</button>
        </form>
    );
};


const showAlert = (message) => {
    alert(message);
};

export default ProcessForm;