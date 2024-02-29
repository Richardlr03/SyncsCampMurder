import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function TopBar({ initialMode }) {
    
    const [currentMode, setCurrentMode] = useState(initialMode);

    return (
        <div className="font-bold flex flex-row justify-end m-4">
            <div>
            <ToggleButtonGroup
            color="primary"
            exclusive
            value={currentMode}
            onChange={(event, newMode) => setCurrentMode(newMode)}
            aria-label="Platform"
            >
                <ToggleButton value="murderGraph">Murder Graph</ToggleButton>
                <ToggleButton value="teamScores">Team Scores</ToggleButton>
            </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default TopBar;