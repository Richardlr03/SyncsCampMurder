import { useCallback, useState } from 'react';
import { GraphCanvas, Label, Sphere } from 'reagraph';
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
    onRemoveLink,
    onClearError,
    onReset,
    onEdgeClick
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removeSourceInput, setRemoveSourceInput] = useState('');
    const [removeTargetInput, setRemoveTargetInput] = useState('');
    const renderNode = useCallback(
        (props) => (
            <group>
                <Sphere {...props} />
                <group position={[0, -props.size * 1.7, 0]}>
                    <Label
                        text={props.node.label || props.node.id}
                        fontSize={18}
                        color="#111111"
                        stroke="#ffffff"
                        opacity={1}
                        ellipsis={40}
                    />
                </group>
            </group>
        ),
        []
    );

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
    const handleRemoveLink = (event) => {
        event.preventDefault();
        const success = onRemoveLink(removeSourceInput, removeTargetInput);
        if (success) {
            setIsRemoveModalOpen(false);
            setRemoveSourceInput('');
            setRemoveTargetInput('');
        }
    };
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
            {isRemoveModalOpen ? (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Remove Link</h2>
                        <form className="mt-4 flex flex-col gap-3" onSubmit={handleRemoveLink}>
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Killer"
                                value={removeSourceInput}
                                onChange={(event) => setRemoveSourceInput(event.target.value)}
                            />
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2"
                                placeholder="Victim"
                                value={removeTargetInput}
                                onChange={(event) => setRemoveTargetInput(event.target.value)}
                            />
                            {error ? <p className="text-sm text-red-600">{error}</p> : null}
                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                                <button
                                    className="rounded border border-gray-300 px-4 py-2 text-gray-700"
                                    type="button"
                                    onClick={() => {
                                        setIsRemoveModalOpen(false);
                                        setRemoveSourceInput('');
                                        setRemoveTargetInput('');
                                        onClearError();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded bg-black px-4 py-2 text-white"
                                    type="submit"
                                >
                                    Remove Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            <div className="relative h-[80vh] min-h-[480px] overflow-visible pt-6">
                <div className="absolute right-4 top-4 z-10">
                    <div className="flex flex-col gap-2">
                        {/* <button
                            className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700"
                            type="button"
                            onClick={onReset}
                        >
                            Reset Graph
                        </button> */}
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
                        <button
                            className="rounded bg-black px-4 py-2 text-white"
                            type="button"
                            onClick={() => {
                                onClearError();
                                setIsRemoveModalOpen(true);
                            }}
                        >
                            Remove Link
                        </button>
                    </div>
                </div>
                <GraphCanvas
                    theme={murderGraphTheme}
                    layoutType="treeLr2d"
                    labelType="none"
                    sizingType="none"
                    defaultNodeSize={22}
                    minNodeSize={22}
                    maxNodeSize={22}
                    draggable={true}
                    renderNode={renderNode}
                    nodes={nodes}
                    edges={edges}
                    onEdgeClick={(edge) => onEdgeClick(edge.id)}
                />
            </div>
        </div>
    );
}

export default MurderGameView;
