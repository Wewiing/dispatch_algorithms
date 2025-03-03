import React from "react";
import useProcessContext from "../hooks/useProcessContext";
import { fifo, sjf, priorityScheduling } from "../utils/algorithms";
import GanttChart from "./GanttChart";

const ChartsPage = ({ algorithm }) => {
    const { processes } = useProcessContext();
    
    // Calculamos solo el resultado necesario
    const getAlgorithmResult = () => {
        switch(algorithm.toLowerCase()) {
            case 'sjf':
                return sjf(processes);
            case 'priority':
                return priorityScheduling(processes);
            case 'fifo':
            default:
                return fifo(processes);
        }
    };

    const result = getAlgorithmResult();
    console.log(result);

    return (
        <div className="gantt-chart">
            <h2>Algoritmo Seleccionado: {algorithm.toUpperCase()}</h2>
            <GanttChart result={result} />
            {result && (
                <div>
                    <h3>Resultado:</h3>
                    <table >
                        <thead>
                            <tr>
                            <th>Proceso</th>
                            <th>Tiempo de Espera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.ganttChart.map((process, index) => (
                            <tr key={process.name} >
                                <td>{process.name}</td>
                                <td>
                                {result.waitingTimes[index]}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                {/* 
                                <th>Tiempo de Fin</th>
                                <th>Tiempo de Llegada</th>
                                */}
                                <th>Tiempo de Sistema</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.ganttChart.map((process, index) => (
                                <tr key={index}>
                                    <td>{process.name}</td>
                                    {/* 
                                    <td>{process.end}</td>
                                    <td>{process.arrivalTime}</td>
                                    */}
                                    <td>{process.end - process.arrivalTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default ChartsPage;