import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MurderGame from "../components/MurderGame";
import TeamScores from '../components/TeamScores';

function MainView() {
  const initialMode = "murderGraph";
  const [currentMode, setCurrentMode] = useState(initialMode);
  let currView = <MurderGame />;

  if (currentMode === "murderGraph") {
    currView = <MurderGame />;
  } else {
    currView = <TeamScores />;
  }

  return (
    <div className="App">
      <div class="place-content-center h-screen w-screen">
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
        <div className="block relative h-screen">
          {currView}
        </div>
      </div>
    </div>
  );
}
  
export default MainView;