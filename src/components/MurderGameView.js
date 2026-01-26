import { useEffect, useRef, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import { murderGraphTheme } from './MurderGraphTheme';

function MurderGameView({
    nodes,
    edges,
    sourceInput,
    targetInput,
    nodeInput,
    error,
    onSourceChange,
    onTargetChange,
    onNodeChange,
    onSubmit,
    onCreateNode,
    onReset,
    onEdgeClick
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const canvasRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const success = onSubmit(sourceInput, targetInput);
        if (success) {
            setIsModalOpen(false);
        }
    };
    const handleCreateNode = (event) => {
        event.preventDefault();
        const success = onCreateNode(nodeInput);
        if (success) {
            setIsNodeModalOpen(false);
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!canvasRef.current) {
                return;
            }
            canvasRef.current.centerGraph();
        }, 150);

        return () => clearTimeout(timeoutId);
    }, [nodes.length, edges.length]);

    return (
        <div className="container mx-auto flex flex-col gap-4">
            {isModalOpen ? (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Create Link</h2>
                        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Killer"
                                value={sourceInput}
                                onChange={(event) => onSourceChange(event.target.value)}
                            />
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Victim"
                                value={targetInput}
                                onChange={(event) => onTargetChange(event.target.value)}
                            />
                            {error ? <p className="text-sm text-red-600">{error}</p> : null}
                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                                <button
                                    className="rounded border border-gray-300 px-4 py-2 text-gray-700"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded bg-black px-4 py-2 text-white"
                                    type="submit"
                                >
                                    Add Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            {isNodeModalOpen ? (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Create Node</h2>
                        <form className="mt-4 flex flex-col gap-3" onSubmit={handleCreateNode}>
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Node name"
                                value={nodeInput}
                                onChange={(event) => onNodeChange(event.target.value)}
                            />
                            {error ? <p className="text-sm text-red-600">{error}</p> : null}
                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                                <button
                                    className="rounded border border-gray-300 px-4 py-2 text-gray-700"
                                    type="button"
                                    onClick={() => setIsNodeModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded bg-black px-4 py-2 text-white"
                                    type="submit"
                                >
                                    Add Node
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            <div className="relative h-[80vh] min-h-[480px] overflow-visible pt-6">
                <div className="absolute right-4 top-4 z-10">
                    <div className="flex flex-col gap-2">
                        <button
                            className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700"
                            type="button"
                            onClick={onReset}
                        >
                            Reset Graph
                        </button>
                        <button
                            className="rounded bg-black px-4 py-2 text-white"
                            type="button"
                            onClick={() => setIsNodeModalOpen(true)}
                        >
                            Create Node
                        </button>
                        <button
                            className="rounded bg-black px-4 py-2 text-white"
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create Link
                        </button>
                    </div>
                </div>
                <GraphCanvas
                    ref={canvasRef}
                    theme={murderGraphTheme}
                    draggable={true}
                    nodes={nodes}
                    edges={edges}
                    onEdgeClick={(edge) => onEdgeClick(edge.id)}
                />
            </div>
        </div>
    );
}

export default MurderGameView;
