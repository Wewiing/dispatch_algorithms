import React from "react";
import useProcessContext from "../hooks/useProcessContext";
import { fifo, sjf, priorityScheduling } from "../utils/algorithms";
import GanttChart from "./GanttChart";
import "./ChartsPage.css";

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

    return (
        <div className="gantt-chart">
            <GanttChart result={result} />
            {result && result.ganttChart && result.ganttChart.length > 0 && (
                <div className="results">
                    <div className="tables">
                        <table>
                            <thead>
                                <tr>
                                    <th>Proceso</th>
                                    <th>Tiempo de Espera</th>
                                    <th>Tiempo de Sistema</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.ganttChart.map((process, index) => (
                                    <tr key={process.name}>
                                        <td>{process.name}</td>
                                        <td>{result.waitingTimes[index]}</td>
                                        <td>{process.end - process.arrivalTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="average-times">
                            <div>Tiempo de Espera Promedio: {result.avgWaitingTime.toFixed(2)}</div>
                            <div>
                                Tiempo de Sistema Promedio: {
                                    (result.ganttChart.reduce((acc, process) => acc + (process.end - process.arrivalTime), 0) / result.ganttChart.length).toFixed(2)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartsPage;