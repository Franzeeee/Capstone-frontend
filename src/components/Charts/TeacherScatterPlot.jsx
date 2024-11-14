// ScatterPlotChart.jsx
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

    // Register the necessary components for Chart.js
    ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

    const TeacherScatterPlot = ({dataClass, labels}) => {


        const [classData, setClassData] = useState([
            {x: 'John Doe', y: 85},
        ]);
        
        console.log(dataClass);

    // Sample data based on the names, sections, and scores provided
    const data = {
        datasets: [
            {
                ...dataClass,
                label: labels,
            }

        ]
        
    };

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Average Score',
                },
                min: 0,
                max: 100,
            },
            x: {
                title: {
                    display: true,
                    text: 'Students',
                },
                type: 'category', // Using category type for student names on x-axis
                ticks: {
                    display: false, // Hides x-axis labels
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Average Scores by Student',
            },
            tooltip: {
                callbacks: {
                    title: function (tooltipItem) {
                        // This will show the student names when hovering over the nodes
                        return tooltipItem[0].raw.x;
                    },
                },
            },
        },
    };
    

    return (
        <div>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default TeacherScatterPlot;
// LineChart.jsx