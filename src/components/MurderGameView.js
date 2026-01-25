import { useState } from 'react';
import { GraphCanvas } from 'reagraph';
import { murderGraphTheme } from './MurderGraphTheme';

function MurderGameView({
    nodes,
    edges,
    sourceInput,
    targetInput,
    error,
    onSourceChange,
    onTargetChange,
    onSubmit,
    onEdgeClick
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const success = onSubmit(sourceInput, targetInput);
        if (success) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="container mx-auto flex flex-col gap-4">
            <div className="px-4 pt-4">
                <button
                    className="rounded bg-black px-4 py-2 text-white"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Edge
                </button>
            </div>
            {isModalOpen ? (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Create Edge</h2>
                        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Source node"
                                value={sourceInput}
                                onChange={(event) => onSourceChange(event.target.value)}
                            />
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Target node"
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
                                    Add edge
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            <div className="relative h-[70vh] min-h-[360px]">
                <GraphCanvas
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
