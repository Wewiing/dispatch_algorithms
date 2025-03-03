import useProcessContext from "../hooks/useProcessContext";

import "./ProcessTable.css";

const ProcessTable = () => {
    const { processes, handleRemoveProcess } = useProcessContext();

    return (
        <table className="process-table">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Tiempo de Ráfaga</th>
                <th>Tiempo de Llegada</th>
                <th>Prioridad</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {processes.length === 0 ? (
                <tr>
                    <td colSpan="5" className="no-processes">No hay procesos</td>
                </tr>
                ) : (
                processes.map((process, index) => (
                    <tr key={index}>
                    <td>{process.name}</td>
                    <td>{process.burstTime}</td>
                    <td>{process.arrivalTime}</td>
                    <td>{process.priority}</td>
                    <td className="button-cell">
                        <button 
                        onClick={() => handleRemoveProcess(index)}
                        className="delete-btn"
                        >
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
    );
};

export default ProcessTable;