import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from 'react';

const GanttChart = ({ result }) => {

    const [opacity, setOpacity] = useState({
        waitingEnd: 1,
        durationEnd: 1
    });

    const handleMouseEnter = (o) => {
        const { dataKey } = o;
        setOpacity(prev => ({ ...prev, [dataKey]: 0.5 }));
    };

    const handleMouseLeave = (o) => {
        const { dataKey } = o;
        setOpacity(prev => ({ ...prev, [dataKey]: 1 }));
    };

    if (!result || !result.ganttChart || result.ganttChart.length === 0) return <p className="no-data">No hay datos para mostrar.</p>;

    // Transformamos los datos
    const data = result.ganttChart.map((process) => ({
        //BarData
        name: process.name,
        waitingStart: process.arrivalTime,
        waitingEnd: process.start - process.arrivalTime,
        durationEnd: process.end - process.start,

        //ToolTipData
        waitingInterval: [process.arrivalTime, process.start],
        durationInterval: [process.start, process.end]
    }));

    // Tooltip personalizado
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload || payload.length === 0) return null;

        const processData = payload[0].payload; // Accedemos a los datos completos del proceso

        return (
            <div className="custom-tooltip" style={{ 
                backgroundColor: '#fff',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px'
            }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{processData.name}</p>
                <p style={{ margin: '5px 0' }}>
                    Espera: {processData.waitingInterval[0]} - {processData.waitingInterval[1]}
                </p>
                <p style={{ margin: '5px 0' }}>
                    Ejecución: {processData.durationInterval[0]} - {processData.durationInterval[1]}
                </p>
            </div>
        );
    };

    // Generar ticks para el eje X
    const maxTime = Math.max(...data.map(d => d.durationInterval[1]));
    const ticks = Array.from({ length: maxTime + 1 }, (_, i) => i);

    return (
        <div className="graphic" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        type="number" 
                        domain={[0, 'dataMax']} 
                        label={{ value: "Tiempo", position: "insideBottom", offset: -5 }} 
                        ticks={ticks} // Agregar ticks personalizados
                    />
                    <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={80} 
                        label={{ value: "Procesos", angle: -90, position: 'insideLeft', dy: 50 }} // Agregar label al eje Y
                    />
                    
                    {/* Tooltip personalizado */}
                    <Tooltip 
                        cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                        content={<CustomTooltip />}
                    />

                    <Legend 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        wrapperStyle={{ paddingTop: '20px' }}
                    />
                    
                    {/* Barras apiladas */}
                    <Bar 
                        dataKey="waitingStart" 
                        stackId="a" 
                        fill="transparent"
                        name="Inicio de espera"
                    />
                    <Bar 
                        dataKey="waitingEnd" 
                        stackId="a" 
                        fill="#919191"
                        fillOpacity={opacity.durationEnd} 
                        name="Tiempo de espera"
                    />
                    <Bar 
                        dataKey="durationEnd" 
                        stackId="a" 
                        fill="#177E89"
                        fillOpacity={opacity.waitingEnd}
                        name="Tiempo de ejecución"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GanttChart;