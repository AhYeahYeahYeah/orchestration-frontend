import { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Background } from 'react-flow-renderer';

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
const nodes = [
    {
        id: '1',
        type: 'input',
        data: {
            label: (
                <>
                    欢迎使用 <strong>服务编排!</strong>
                </>
            )
        },
        position: { x: 250, y: 0 }
    },
    {
        id: '2',
        data: {
            label: (
                <>
                    这是一个 <strong>默认原子服务</strong>
                </>
            )
        },
        position: { x: 100, y: 100 }
    },
    {
        id: '3',
        data: {
            label: (
                <>
                    这是一个 <strong>自定义原子服务</strong>
                </>
            )
        },
        position: { x: 400, y: 100 },
        style: {
            background: '#D6D5E6',
            color: '#333',
            border: '1px solid #222138',
            width: 180
        }
    },
    {
        id: '4',
        position: { x: 250, y: 200 },
        data: {
            label: '原子服务'
        }
    },
    {
        id: '5',
        data: {
            label: '原子服务 id: 5'
        },
        position: { x: 250, y: 325 }
    },
    {
        id: '6',
        type: 'output',
        data: {
            label: (
                <>
                    一个 <strong>结束节点</strong>
                </>
            )
        },
        position: { x: 100, y: 480 }
    },
    {
        id: '7',
        type: 'output',
        data: { label: '另一个输出节点' },
        position: { x: 400, y: 450 }
    },
    { id: 'e1-2', source: '1', target: '2', label: '这是一个连线的标签' },
    { id: 'e1-3', source: '1', target: '3' },
    {
        id: 'e3-4',
        source: '3',
        target: '4',
        animated: true,
        label: '动态连线'
    },
    {
        id: 'e4-5',
        source: '4',
        target: '5',
        label: '默认连线'
    },
    {
        id: 'e5-6',
        source: '5',
        target: '6',
        type: 'smoothstep',
        label: '光滑连线'
    },
    {
        id: 'e5-7',
        source: '5',
        target: '7',
        type: 'step',
        style: { stroke: '#f6ab6c' },
        label: '带颜色的连线',
        animated: true,
        labelStyle: { fill: '#f6ab6c', fontWeight: 700 }
    }
];
const OverviewFlow = () => {
    const [elements, setElements] = useState(nodes);
    const onConnect = (params) => {
        setElements((elements) =>
            addEdge({ ...params, animated: true }, elements).map((ele) => {
                if (ele.id === params.source) {
                    ele.next = params.target;
                    return ele;
                }
                return ele;
            })
        );
    };

    return (
        <ReactFlow elements={elements} onConnect={onConnect} onInit={onInit} fitView attributionPosition="top-right">
            <MiniMap
                nodeStrokeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'default') return '#1a192b';

                    return '#eee';
                }}
                nodeColor={(n) => {
                    if (n.style?.background) return n.style.background;

                    return '#fff';
                }}
                nodeBorderRadius={2}
            />
            {/* <Controls /> */}
            <Background color="#aaa" gap={8} />
        </ReactFlow>
    );
};

export default OverviewFlow;
