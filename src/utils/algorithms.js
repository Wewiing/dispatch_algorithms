export function fifo(originalProcesses) {
    const processes = [...originalProcesses].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const processMap = {}; // Mapa para almacenar tiempos de espera por nombre

    processes.forEach(process => {
        if (time < process.arrivalTime) time = process.arrivalTime;
        
        processMap[process.name] = {
            waitingTime: time - process.arrivalTime,
            start: time,
            end: time + process.burstTime
        };
        
        time += process.burstTime;
    });

    // Generar resultados en orden original
    const waitingTimes = originalProcesses.map(p => processMap[p.name].waitingTime);
    const totalWaitingTime = waitingTimes.reduce((acc, curr) => acc + curr, 0);
    const ganttChart = processes.map(p => ({
        name: p.name,
        arrivalTime: p.arrivalTime,
        start: processMap[p.name].start,
        end: processMap[p.name].end
    }));

    return {
        waitingTimes,
        avgWaitingTime: totalWaitingTime / originalProcesses.length,
        ganttChart
    };
}

export function sjf(originalProcesses) {
    // Crear copia de los procesos y ordenar por tiempo de llegada
    const processes = [...originalProcesses].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const processMap = new Map();
    const readyQueue = [];
    const executionOrder = [];

    while (processes.length > 0 || readyQueue.length > 0) {
        // Agregar procesos que han llegado
        while (processes.length > 0 && processes[0].arrivalTime <= time) {
            const process = processes.shift();
            readyQueue.push(process);
        }

        if (readyQueue.length > 0) {
            // Ordenar por burstTime y arrivalTime (para desempates)
            readyQueue.sort((a, b) => {
                if (a.burstTime === b.burstTime) {
                    return a.arrivalTime - b.arrivalTime;
                }
                return a.burstTime - b.burstTime;
            });

            const process = readyQueue.shift();
            const start = time;
            const end = time + process.burstTime;
            
            // Guardar datos en el Map
            processMap.set(process.name, {
                name: process.name,
                arrivalTime: process.arrivalTime,
                start: start,
                end: end,
                waitingTime: start - process.arrivalTime
            });

            executionOrder.push(process.name);
            time = end;
        } else {
            // Saltar al próximo tiempo de llegada
            time = processes[0].arrivalTime;
        }
    }

    // Generar resultados en orden original
    const waitingTimes = originalProcesses.map(p => processMap.get(p.name).waitingTime);
    const ganttChart = originalProcesses.map(p => ({
        name: p.name,
        arrivalTime: p.arrivalTime,
        start: processMap.get(p.name).start,
        end: processMap.get(p.name).end
    }));

    return {
        waitingTimes,
        avgWaitingTime: waitingTimes.reduce((a, b) => a + b, 0) / originalProcesses.length,
        ganttChart
    };
}

export function priorityScheduling(originalProcesses) {
    // Crear copia de los procesos para no modificar el original
    const processes = [...originalProcesses].map(p => ({...p}));
    let time = 0;
    const processMap = new Map();
    const ganttExecution = [];
    
    // Cola de procesos restantes ordenados por llegada
    const remainingProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const readyQueue = [];
    
    while (remainingProcesses.length > 0 || readyQueue.length > 0) {
        // Agregar procesos que han llegado
        while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= time) {
            const process = remainingProcesses.shift();
            readyQueue.push(process);
        }
        
        if (readyQueue.length > 0) {
            // Ordenar por prioridad (menor primero) y tiempo de llegada (para desempates)
            readyQueue.sort((a, b) => {
                if (a.priority !== b.priority) return a.priority - b.priority;
                return a.arrivalTime - b.arrivalTime;
            });
            
            const process = readyQueue.shift();
            const start = time;
            const end = time + process.burstTime;
            
            // Registrar datos del proceso
            processMap.set(process.name, {
                waitingTime: start - process.arrivalTime,
                start,
                end
            });
            
            ganttExecution.push({...process, start, end});
            time = end;
        } else {
            // Saltar al próximo tiempo de llegada
            time = remainingProcesses[0].arrivalTime;
        }
    }
    
    // Generar resultados en orden original
    const waitingTimes = originalProcesses.map(p => processMap.get(p.name).waitingTime);
    const totalWaitingTime = waitingTimes.reduce((a, b) => a + b, 0);
    
    return {
        waitingTimes,
        avgWaitingTime: totalWaitingTime / originalProcesses.length,
        ganttChart: originalProcesses.map(p => ({
            name: p.name,
            arrivalTime: p.arrivalTime,
            start: processMap.get(p.name).start,
            end: processMap.get(p.name).end
        }))
    };
}