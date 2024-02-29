import { GraphCanvas, Theme } from 'reagraph';
import { murderGraphTheme } from './MurderGraphTheme';
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
    ];

    const themeSettings = {
        canvas: {
            background: '#fff'
        }
    }

    // const tree = dTree.init(data);
    return ( 
      <div className="container mx-auto block">
        <GraphCanvas theme={murderGraphTheme} draggable={true} nodes={nodes} edges={edges} />
      </div>
    );
  }
    
  export default MurderGame;