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
    onSubmit
}) {
    return (
        <div className="container mx-auto flex flex-col gap-4">
            <form className="relative z-10 flex flex-col gap-2 px-4 pt-4" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2 md:flex-row">
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
                    <button
                        className="rounded bg-black px-4 py-2 text-white"
                        type="submit"
                    >
                        Add edge
                    </button>
                </div>
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </form>
            <div className="relative h-[70vh] min-h-[360px]">
                <GraphCanvas theme={murderGraphTheme} draggable={true} nodes={nodes} edges={edges} />
            </div>
        </div>
    );
}

export default MurderGameView;
