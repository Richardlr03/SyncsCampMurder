import { useEffect, useMemo, useState } from 'react';
import MurderGameView from './MurderGameView';

const STORAGE_KEY = 'murder-game-graph';
const DEFAULT_GRAPH = {
    nodes: [],
    edges: []
};

const loadGraph = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return DEFAULT_GRAPH;
        }
        const parsed = JSON.parse(stored);
        if (!parsed || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
            return DEFAULT_GRAPH;
        }
        return parsed;
    } catch (error) {
        return DEFAULT_GRAPH;
    }
};

function MurderGame() {
    const initialGraph = useMemo(() => loadGraph(), []);
    const [nodes, setNodes] = useState(initialGraph.nodes);
    const [edges, setEdges] = useState(initialGraph.edges);
    const [sourceInput, setSourceInput] = useState('');
    const [targetInput, setTargetInput] = useState('');
    const [nodeInput, setNodeInput] = useState('');
    const [error, setError] = useState('');

    const nodeIds = useMemo(() => new Set(nodes.map((node) => node.id)), [nodes]);
    const edgeIds = useMemo(() => new Set(edges.map((edge) => edge.id)), [edges]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                nodes,
                edges
            })
        );
    }, [nodes, edges]);

    const addEdge = (sourceValue, targetValue) => {
        const source = sourceValue.trim();
        const target = targetValue.trim();

        if (!source || !target) {
            setError('Source and target are required.');
            return false;
        }

        if (source === target) {
            setError('Source and target must be different.');
            return false;
        }

        const targetMap = new Map();
        edges.forEach((edge) => {
            targetMap.set(edge.source, edge.target);
        });
        let chainSource = source;
        const visited = new Set();
        while (targetMap.has(chainSource)) {
            if (visited.has(chainSource)) {
                setError('Cannot add edge because a cycle exists in the chain.');
                return false;
            }
            visited.add(chainSource);
            chainSource = targetMap.get(chainSource);
        }

        if (chainSource === target) {
            setError('Source and target must be different.');
            return false;
        }

        const edgeId = `${chainSource}->${target}`;
        if (edgeIds.has(edgeId)) {
            setError('That edge already exists.');
            return false;
        }

        setNodes((prev) => {
            const next = [...prev];
            if (!nodeIds.has(chainSource)) {
                next.push({ id: chainSource, label: chainSource });
            }
            if (!nodeIds.has(target)) {
                next.push({ id: target, label: target });
            }
            return next;
        });
        setEdges((prev) => [...prev, { id: edgeId, source: chainSource, target }]);
        setSourceInput('');
        setTargetInput('');
        setError('');
        return true;
    };

    const addNode = (nodeValue) => {
        const nodeId = nodeValue.trim();
        if (!nodeId) {
            setError('Node name is required.');
            return false;
        }
        if (nodeIds.has(nodeId)) {
            setError('That node already exists.');
            return false;
        }
        setNodes((prev) => [...prev, { id: nodeId, label: nodeId }]);
        setNodeInput('');
        setError('');
        return true;
    };

    const removeEdge = (edgeId) => {
        setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
    };

    const resetGraph = () => {
        setNodes([]);
        setEdges([]);
        setSourceInput('');
        setTargetInput('');
        setNodeInput('');
        setError('');
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <MurderGameView
            nodes={nodes}
            edges={edges}
            sourceInput={sourceInput}
            targetInput={targetInput}
            nodeInput={nodeInput}
            error={error}
            onSourceChange={setSourceInput}
            onTargetChange={setTargetInput}
            onNodeChange={setNodeInput}
            onSubmit={addEdge}
            onCreateNode={addNode}
            onEdgeClick={removeEdge}
            onReset={resetGraph}
        />
    );
  }
    
  export default MurderGame;
