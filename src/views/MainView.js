import MurderGame from "../components/MurderGame";
import TopBar from "../components/TopBar";

function MainView() {
  return (
    <div className="App">
      <div class="place-content-center h-screen w-screen">
        <TopBar className="z-10" initialMode="murderGraph"/>
        
        <div className="z-0">
          <MurderGame />
        </div>
      </div>
    </div>
  );
}
  
export default MainView;