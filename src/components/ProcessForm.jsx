import React, { useState, useRef } from "react";
import useProcessContext from "../hooks/useProcessContext";

import "./ProcessForm.css"

const ProcessForm = () => {
    const [name, setName] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [burstTime, setBurstTime] = useState("");
    const [priority, setPriority] = useState("");
    const { processes, handleAddProcess } = useProcessContext();

        // Crea refs para cada input
        const nameRef = useRef(null);
        const burstTimeRef = useRef(null);
        const arrivalTimeRef = useRef(null);
        const priorityRef = useRef(null);
        
        const inputsRefs = [nameRef, burstTimeRef, arrivalTimeRef, priorityRef];

        const handleKeyDown = (e, index) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = Math.min(index + 1, inputsRefs.length - 1);
                inputsRefs[nextIndex].current.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = Math.max(index - 1, 0);
                inputsRefs[prevIndex].current.focus();
            }
        };

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
        <form className="form" onSubmit={handleSubmit}>
            <h3>Agregar Proceso</h3>
            <label htmlFor="name">Nombre del proceso:</label>
            <input
                type="text"
                id="name"
                value={name}
                ref={nameRef}
                autoComplete="off"
                onKeyDown={(e) => handleKeyDown(e, 0)}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Proceso 1"
                required
            />
            <label htmlFor="burstTime">Tiempo de ráfaga:</label>
            <input
                type="number"
                id="burstTime"
                value={burstTime}
                ref={burstTimeRef}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                onChange={(e) => setBurstTime(e.target.value)}
                placeholder="Ej. 10"
                required
            />
            <label htmlFor="arrivalTime">Tiempo de llegada:</label>
            <input
                type="number"
                id="arrivalTime"
                value={arrivalTime}
                ref={arrivalTimeRef}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                onChange={(e) => setArrivalTime(e.target.value)}
                placeholder="Ej. 5"
                required
            />
            <label htmlFor="priority">Prioridad:</label>
            <input
                type="number"
                id="priority"
                value={priority}
                ref={priorityRef}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Ej. 1"
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