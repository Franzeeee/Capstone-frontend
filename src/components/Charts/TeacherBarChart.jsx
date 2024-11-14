import React from 'react';
import { Chart } from 'primereact/chart';

const TeacherBarChart = ({receivedData, labelsReceived}) => {
    // Sample data (class names and their corresponding average scores)
    const data = {
        labels: labelsReceived || [],// Class names
        datasets: [
            {
                label: 'Average Score',
                data: receivedData || [85, 92], // Average scores for each class
                backgroundColor: generateRandomRGB(), // Bar color
                borderColor: generateRandomRGB(), // Bar border color
                borderWidth: 1, // Border width
            },
        ],
    };

    // Options for the chart (you can customize this as per your requirements)
    const options = {
        responsive: true,
    
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // The Y-axis is set to a max of 100 (representing percentage)
            },
        },
    };

    return (
        <div>
            <Chart type="bar" data={data} options={options} />
        </div>
    );
};

export default TeacherBarChart;
function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
