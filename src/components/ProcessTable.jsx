import useProcessContext from "../hooks/useProcessContext";

const ProcessTable = () => {
    const { processes, handleRemoveProcess } = useProcessContext();

    return (
        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tiempo de Ráfaga</th>
                    <th>Tiempo de Llegada</th>
                    <th>Prioridad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {processes.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No hay procesos</td>
                    </tr>
                ) : (
                    processes.map((process, index) => (
                        <tr key={index}>
                            <td>{process.name}</td>
                            <td>{process.burstTime}</td>
                            <td>{process.arrivalTime}</td>
                            <td>{process.priority}</td>
                            <td>
                                <button onClick={() => handleRemoveProcess(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ProcessTable;