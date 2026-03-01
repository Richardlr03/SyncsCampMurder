import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TeamScores() {
    const labels = [
        "Asu Frat Leader",
        "6 or 7 Chuds",
        "Jeffrey's not a Chud",
        "Pink Panthers",
        "Co-Predators",
        "Gay Daughter or Thot Sun",
        "The Coldest"
    ];

    const scores = [790, 1380, 870, 940, 640, 730, 670];
    const colors = [
        "purple",
        "yellow",
        "gray",
        "pink",
        "#FFB6C1",
        "#BD98E0",
        "blue"
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Score",
                data: scores,
                backgroundColor: colors,
                borderWidth: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            easing: "linear",
            duration: 1500
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "SYNCS CAMP LEADERBOARD"
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    return (
        <div className="container mx-auto block place-content-center h-[400px]">
            <Bar data={data} options={options} />
        </div>
    )
}

export default TeamScores;
