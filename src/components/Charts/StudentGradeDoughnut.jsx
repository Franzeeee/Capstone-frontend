// DoughnutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
import styles from '../../assets/css/components/Charts/student-doughnut-chart.module.css'

const StudentGradeDoughnut = ({classData}) => {
    const data = {
        labels: ['Fail', 'Pass', 'Ungraded'],  // X-axis labels now include 'Ungraded'
        datasets: [
            {
                label: 'Total Class',  // Name of the dataset
                data: classData || [1,1,1],  // Data points for Fail, Pass, and Ungraded
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  // Color for 'Fail'
                    'rgba(0, 255, 0, 0.35)',    // Color for 'Pass'
                    'rgba(255, 255, 0, 0.4)',    // Color for 'Ungraded' (Yellow for visibility)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',  // Border color for 'Fail'
                    'rgba(0, 255, 0, 1)',     // Border color for 'Pass'
                    'rgba(255, 255, 0, 1)',    // Border color for 'Ungraded'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const options = {
        responsive: true,
        cutout: '70%',
        plugins: {
            title: {
                display: true,
                text: 'Students Grades Distribution',  // Title of the chart
            },
        },
        
    };
    

    return (
        <div className={styles.chartContainer}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default StudentGradeDoughnut;
