import { GraphCanvas, Theme } from 'reagraph';
import Tree from 'react-d3-tree';


function MurderGame() {
    const nodes = [
        {
            id: 'Dillon de Silva',
            label: 'Dillon de Silva'
        },
        {
            id: 'Jennifer Tan',
            label: 'Jennifer Tan'
        },
        {
            id: 'Thomas Dizon',
            label: 'Thomas Dizon',
        },
        {
            id: 'Jessica Tan',
            label: 'Jessica Tan'
        }
    ];

    const edges = [
        {
            id: 'Dillon de Silva->Jennifer Tan',
            source: 'Dillon de Silva',
            target: 'Jennifer Tan'
        },
        {
            id: 'Thomas Dizon->Jessica Tan',
            source: 'Thomas Dizon',
            target: 'Jessica Tan'
        },
        {
            id: 'Dillon de Silva->Thomas Dizon',
            source: 'Dillon de Silva',
            target: 'Thomas Dizon'
        }
    ];

    const themeSettings = {
        canvas: {
            background: '#fff'
        }
    }

    // const tree = dTree.init(data);
    return ( 
      <div className="container mx-auto block -z-50">
        <GraphCanvas draggable={true} nodes={nodes} edges={edges} />
        <h1>heello</h1>
      </div>
    );
  }
    
  export default MurderGame;