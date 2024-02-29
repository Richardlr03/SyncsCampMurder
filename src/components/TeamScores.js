import { Chart } from "react-google-charts";

function TeamScores() {
    const data = [
        [
            "Team",
            "Score",
            { role: "style" },
            {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
            },
        ],
        ["Flying Unicorns", 8.94, "#348888", null],
        ["SUNKS", 10.49, "#60E1EB", null],
        ["Brainy Saucer", 19.3, "#6F9396", null],
        ["SnipedByNinja", 25, "color: #D2A4DB", null],
        ["The Avengers", 30, "color: #60EBA6", null],
        ["Tidepod Nation", 21.45, "color: #7E5EF2", null],
        ["Imperial Sass", 21.45, "color: #F2F080", null],
    ];

    const options = {
        title: "SYNCS CAMP LEADERBOARD",
        bar: { groupWidth: "50%" },
        legend: { position: "none" },
        animation: {
            startup: true,
            easing: "linear",
            duration: 1500,
        },
    };
    
    return (
        <div className="container mx-auto block place-content-center">
            <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            />
        </div>
    )
}

export default TeamScores;