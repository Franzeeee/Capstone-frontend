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

    const TeacherScatterPlot = () => {


        const [classData, setClassData] = useState([
            {x: 'John Doe', y: 85},
        ]);

    // Sample data based on the names, sections, and scores provided
    const data = {
        datasets: [
            {
                label: 'Section AI41',
                data: [
                    { x: 'John Doe', y: 85 },
                    { x: 'Jane Smith', y: 90 },
                    { x: 'Michael Lee', y: 88 },
                    { x: 'Emily Clark', y: 92 },
                    { x: 'Sophia Davis', y: 95 },
                    { x: 'Oliver Wilson', y: 87 },
                    { x: 'Liam Harris', y: 91 },
                    { x: 'Isabella Martinez', y: 89 },
                    { x: 'Lucas Anderson', y: 86 },
                    { x: 'Amelia Taylor', y: 93 },
                    { x: 'Ethan Thomas', y: 80 },
                    { x: 'Mia Robinson', y: 94 },
                    { x: 'Benjamin Garcia', y: 79 },
                    { x: 'Charlotte Moore', y: 98 },
                    { x: 'Aiden Jackson', y: 83 },
                    { x: 'Harper White', y: 92 },
                    { x: 'Jacob Lewis', y: 96 },
                    { x: 'Aria Scott', y: 91 },
                    { x: 'Elijah Walker', y: 90 },
                    { x: 'Grace King', y: 88 },
                    { x: 'Sebastian Young', y: 86 },
                    { x: 'Lily Hernandez', y: 94 },
                    { x: 'James Allen', y: 93 },
                    { x: 'Zoe King', y: 92 },
                    { x: 'Henry Wright', y: 85 },
                    { x: 'Chloe Hill', y: 89 },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },

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
                text: 'Average Scores by Student and Section',
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