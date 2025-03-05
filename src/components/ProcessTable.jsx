import useProcessContext from "../hooks/useProcessContext";
import "./ProcessTable.css";

const SquareXIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
      <path d="M9 9l6 6m0 -6l-6 6" />
    </svg>
);

const ProcessTable = () => {
    const { processes, handleRemoveProcess } = useProcessContext();

    return (
        <table className="process-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tiempo Ráfaga</th>
                    <th>Tiempo Llegada</th>
                    <th>Prioridad</th>
                    <th>Borrar</th>
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
                                <div className="button-container">
                                    <button 
                                        onClick={() => handleRemoveProcess(index)}
                                        className="delete-btn"
                                    >
                                    <SquareXIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ProcessTable;