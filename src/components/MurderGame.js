import { useMemo, useState } from 'react';
import MurderGameView from './MurderGameView';


function MurderGame() {
    const [nodes, setNodes] = useState([
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
    ]);
    const [edges, setEdges] = useState([
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
    ]);
    const [sourceInput, setSourceInput] = useState('');
    const [targetInput, setTargetInput] = useState('');
    const [error, setError] = useState('');

    const nodeIds = useMemo(() => new Set(nodes.map((node) => node.id)), [nodes]);
    const edgeIds = useMemo(() => new Set(edges.map((edge) => edge.id)), [edges]);

    const addEdge = (event) => {
        event.preventDefault();
        const source = sourceInput.trim();
        const target = targetInput.trim();

        if (!source || !target) {
            setError('Source and target are required.');
            return;
        }

        if (source === target) {
            setError('Source and target must be different.');
            return;
        }

        const edgeId = `${source}->${target}`;
        if (edgeIds.has(edgeId)) {
            setError('That edge already exists.');
            return;
        }

        setNodes((prev) => {
            const next = [...prev];
            if (!nodeIds.has(source)) {
                next.push({ id: source, label: source });
            }
            if (!nodeIds.has(target)) {
                next.push({ id: target, label: target });
            }
            return next;
        });
        setEdges((prev) => [...prev, { id: edgeId, source, target }]);
        setSourceInput('');
        setTargetInput('');
        setError('');
    };

    return (
        <MurderGameView
            nodes={nodes}
            edges={edges}
            sourceInput={sourceInput}
            targetInput={targetInput}
            error={error}
            onSourceChange={setSourceInput}
            onTargetChange={setTargetInput}
            onSubmit={addEdge}
        />
    );
  }
    
  export default MurderGame;
