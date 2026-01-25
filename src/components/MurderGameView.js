import { useEffect, useRef, useState } from 'react';
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
    const canvasRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const success = onSubmit(sourceInput, targetInput);
        if (success) {
            setIsModalOpen(false);
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!canvasRef.current) {
                return;
            }
            canvasRef.current.centerGraph();
            canvasRef.current.zoomOut();
            canvasRef.current.zoomOut();
        }, 0);

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
            <div className="relative h-[80vh] min-h-[480px] overflow-visible pt-6">
                <div className="absolute right-4 top-4 z-10">
                    <button
                        className="rounded bg-black px-4 py-2 text-white"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create Link
                    </button>
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
