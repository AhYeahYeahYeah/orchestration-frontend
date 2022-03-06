import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    updateEdge,
    MiniMap,
    Background,
    getOutgoers,
    getIncomers
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './dnd.css';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { InputNode, WorkflowBuilder } from '../../utils/workflowBuilder';
// eslint-disable-next-line no-unused-vars,import/named
import {
    ConductorApi,
    log,
    blacklist,
    credential,
    interestRate,
    lock,
    profile,
    region,
    tag,
    unlock,
    update,
    whitelist
} from '../../api/restful';
import NoSelector from '../../ui-component/caseCard/NoSelector';
import YesSelector from '../../ui-component/caseCard/YesSelector';
import BlackSelector from '../../ui-component/services/BlackSelector';
import CredentialSelector from '../../ui-component/services/CredentialSelector';
import InterestRateSelector from '../../ui-component/services/InterestRateSelector';
import LockSelector from '../../ui-component/services/LockSelector';
import ProfileSelector from '../../ui-component/services/ProfileSelector';
import RegionSelector from '../../ui-component/services/RegionSelector';
import TagSelector from '../../ui-component/services/TagSelector';
import UnlockSelector from '../../ui-component/services/UnlockSelector';
import UpdateSelector from '../../ui-component/services/UpdateSelector';
import WhiteSelector from '../../ui-component/services/WhiteSelector';
import LogSelector from '../../ui-component/services/LogSelector';
import SwitchSelector from '../../ui-component/caseCard/SwitchSelector';

const nodeTypes = {
    No: NoSelector,
    Yes: YesSelector,
    Black: BlackSelector,
    Credential: CredentialSelector,
    InterestRate: InterestRateSelector,
    Lock: LockSelector,
    Profile: ProfileSelector,
    Region: RegionSelector,
    Tag: TagSelector,
    Unlock: UnlockSelector,
    Update: UpdateSelector,
    White: WhiteSelector,
    Log: LogSelector,
    SwitchCard: SwitchSelector
};
const initialElements = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
        flag: null
    }
];
// let id = 0;
// // eslint-disable-next-line no-plusplus
// const getId = () => `dndnode_${id++}`;

let NoId = 0;
// eslint-disable-next-line no-plusplus
const getNoId = () => `No_${NoId++}`;
let YesId = 0;
// eslint-disable-next-line no-plusplus
const getYesId = () => `Yes_${YesId++}`;
let SwitchId = 0;
// eslint-disable-next-line no-plusplus
const getSwitchId = () => `Switch_${SwitchId++}`;
let LogId = 0;
// eslint-disable-next-line no-plusplus
const getLogId = () => `Log_${LogId++}`;
const Orchestration = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reactFlowWrapper = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [elements, setElements] = useState(initialElements);

    const onConnect = (params) => setElements(() => addEdge({ ...params, animated: true }, elements));
    // const onConnect = (params) => {
    //     setElements((elements) =>
    //         addEdge({ ...params, animated: true }, elements).map((ele) => {
    //             if (ele.id === params.source) {
    //                 ele.next = params.target;
    //                 return ele;
    //             }
    //             return ele;
    //         })
    //     );
    // };

    // TODO: null
    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onEdgeUpdate = (oldEdge, newConnection) => setElements((els) => updateEdge(oldEdge, newConnection, els));
    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top
        });
        let newNode = null;
        switch (type) {
            case 'No':
                newNode = {
                    id: getNoId(),
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: 'CaseNo',
                    visited: 0
                };
                break;

            case 'Yes':
                newNode = {
                    id: getYesId(),
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: 'CaseYes',
                    visited: 0
                };
                break;

            case 'SwitchCard':
                newNode = {
                    id: getSwitchId(),
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: 'Switch',
                    visited: 0
                };
                break;

            case 'Black':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'White':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Credential':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'InterestRate':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Lock':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Log':
                newNode = {
                    id: getLogId(),
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Profile':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Region':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Tag':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Unlock':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Update':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'output':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            default:
                console.log('Error');
                break;
        }
        setElements((es) => es.concat(newNode));
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onSave = useCallback(() => {
        const builder = new WorkflowBuilder('szx_test_v2', 10, 'rinne@rinne.top');
        builder.setDescription('Demo workflow for testing workflowBuilder library.');
        builder.setRuntimeInput(['pid', 'cid', 'oid', 'phoneNum', 'password']);
        builder.setBuildtimeInput({
            wid: '2',
            bid: '123',
            region: '福建',
            gid: '123'
        });
        builder.setOutput({
            // eslint-disable-next-line no-template-curly-in-string
            interest: '${InterestRate_Node.output.response.body.interest}'
        });
        builder.setRuntimeInput(['oid']);
        const inputNode = new InputNode();
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            // localforage.setItem(flowKey, flow);
            console.log(flow.elements);
            // console.log(flow);
            const input = flow.elements[0];
            // eslint-disable-next-line camelcase
            const flow_all = [];
            const queue = [];
            const cardandtask = [];
            const switchcard = [];
            queue.push([input, inputNode]);
            // console.log(queue.shift()[1]);
            // cardandtask.push([input[0], inputNode]);
            // console.log(cardandtask[0][0]);
            while (queue.length !== 0) {
                const data = queue.shift();
                console.log(`data:${JSON.stringify(data[0])}`);
                // eslint-disable-next-line camelcase
                const next_nodes = getOutgoers(data[0], flow.elements);
                console.log(`next_nodes:${JSON.stringify(next_nodes)}`);
                // eslint-disable-next-line no-continue
                if (next_nodes.length === 0) continue;
                // eslint-disable-next-line no-continue
                if (next_nodes[0].type === 'output') continue;
                // eslint-disable-next-line no-plusplus
                for (let m = 0; m < next_nodes.length; m++) {
                    // eslint-disable-next-line no-plusplus
                    for (let j = 0; j < flow.elements.length; j++) {
                        if (JSON.stringify(next_nodes[m]) === JSON.stringify(flow.elements[j]) && flow.elements[j].visited === 0) {
                            flow.elements[j].visited = 1;
                            if (next_nodes[m].flag === 'Switch') {
                                // eslint-disable-next-line camelcase
                                let response_string = `${data[1].taskReferenceName}.output.response.statusCode`;
                                // eslint-disable-next-line camelcase
                                response_string = `\${${response_string}}`;
                                // eslint-disable-next-line camelcase,no-template-curly-in-string
                                const task_node = data[1].setNextSwitchNode(response_string);
                                task_node
                                    .setName(`switchTagNode${next_nodes[m].id}Node`)
                                    .setTaskReferenceName(`switch_tag_${next_nodes[m].id}`);
                                switchcard.push(task_node);
                                // eslint-disable-next-line camelcase
                                queue.push([next_nodes[m], task_node]);
                                // eslint-disable-next-line camelcase
                                cardandtask.push([next_nodes[m], task_node]);
                            } else if (data[0].flag === 'Switch') {
                                let cs = 200;
                                // eslint-disable-next-line no-plusplus
                                // eslint-disable-next-line no-use-before-define
                                if (next_nodes[m].type === 'No') {
                                    cs = 'default';
                                    // if (getIncomers(getOutgoers(next_nodes[k], flow.elements)[0], flow.elements).length > 1) {
                                    //     // eslint-disable-next-line no-continue
                                    //     continue;
                                    // }
                                }
                                // eslint-disable-next-line camelcase
                                const case_next = getOutgoers(next_nodes[m], flow.elements);
                                // eslint-disable-next-line camelcase
                                let task_node_child = null;
                                // eslint-disable-next-line no-plusplus
                                for (let i = 0; i < flow.elements.length; i++) {
                                    if (
                                        JSON.stringify(case_next[0]) === JSON.stringify(flow.elements[i]) &&
                                        flow.elements[i].visited === 0
                                    ) {
                                        flow.elements[i].visited = 1;
                                        switch (case_next[0].type) {
                                            case 'Black':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, blacklist, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        bid: '${workflow.input.bid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}'
                                                    });
                                                break;

                                            case 'White':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, whitelist, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        wid: '${workflow.input.wid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}'
                                                    });
                                                break;

                                            case 'Credential':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, credential, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}'
                                                    });
                                                break;

                                            case 'InterestRate':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, interestRate, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        oid: '${workflow.input.oid}'
                                                    });
                                                break;

                                            case 'Lock':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, lock, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        oid: '${workflow.input.oid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        pid: '${workflow.input.pid}'
                                                    });
                                                break;

                                            case 'Log':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, log, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        oid: '${workflow.input.oid}',
                                                        description: '测试test'
                                                    });
                                                break;

                                            case 'Profile':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, profile, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        phoneNum: '${workflow.input.phoneNum}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        password: '${workflow.input.password}'
                                                    });
                                                break;

                                            case 'Region':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, region, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        region: '${workflow.input.region}'
                                                    });
                                                break;

                                            case 'Tag':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, tag, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        cid: '${workflow.input.cid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        gid: '${workflow.input.gid}'
                                                    });
                                                break;

                                            case 'Unlock':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, unlock, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        pid: '${workflow.input.pid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        oid: '${workflow.input.oid}'
                                                    });
                                                break;

                                            case 'Update':
                                                // eslint-disable-next-line camelcase
                                                task_node_child = data[1].addHttpCase(`${cs}`, update, 'POST');
                                                task_node_child
                                                    .setName(`${case_next[0].id}_Node`)
                                                    .setTaskReferenceName(`${case_next[0].id}_Node`)
                                                    .setBody({
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        pid: '${workflow.input.pid}',
                                                        // eslint-disable-next-line no-template-curly-in-string
                                                        oid: '${workflow.input.oid}'
                                                    });
                                                break;
                                            default:
                                                console.log('Error');
                                                break;
                                        }
                                        // eslint-disable-next-line camelcase
                                        queue.push([case_next[0], task_node_child]);
                                        // eslint-disable-next-line camelcase
                                        cardandtask.push([case_next[0], task_node_child]);
                                    }
                                }
                            } else {
                                // eslint-disable-next-line camelcase
                                // task_node_child = taskNode.setNextHttpNode(log, 'POST');
                                // task_node_child.setName(`log ${getId()}`).setTaskReferenceName(`log_${getId()}`).setBody({
                                //     // eslint-disable-next-line no-template-curly-in-string
                                //     oid: '${workflow.input.oid}',
                                //     description: 'Succeed'
                                // });
                                // eslint-disable-next-line camelcase
                                let task_node_child = null;
                                switch (next_nodes[m].type) {
                                    case 'Black':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(blacklist, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                bid: '${workflow.input.bid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}'
                                            });
                                        break;

                                    case 'White':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(whitelist, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                wid: '${workflow.input.wid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}'
                                            });
                                        break;

                                    case 'Credential':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(credential, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}'
                                            });
                                        break;

                                    case 'InterestRate':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(interestRate, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                oid: '${workflow.input.oid}'
                                            });
                                        break;

                                    case 'Lock':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(lock, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                oid: '${workflow.input.oid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                pid: '${workflow.input.pid}'
                                            });
                                        break;

                                    case 'Log':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(log, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                oid: '${workflow.input.oid}',
                                                description: '测试test'
                                            });
                                        break;

                                    case 'Profile':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(profile, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                phoneNum: '${workflow.input.phoneNum}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                password: '${workflow.input.password}'
                                            });
                                        break;

                                    case 'Region':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(region, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                region: '${workflow.input.region}'
                                            });
                                        break;

                                    case 'Tag':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(tag, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                cid: '${workflow.input.cid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                gid: '${workflow.input.gid}'
                                            });
                                        break;

                                    case 'Unlock':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(unlock, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                pid: '${workflow.input.pid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                oid: '${workflow.input.oid}'
                                            });
                                        break;

                                    case 'Update':
                                        // eslint-disable-next-line camelcase
                                        task_node_child = data[1].setNextHttpNode(update, 'POST');
                                        task_node_child
                                            .setName(`${next_nodes[m].id}_Node`)
                                            .setTaskReferenceName(`${next_nodes[m].id}_Node`)
                                            .setBody({
                                                // eslint-disable-next-line no-template-curly-in-string
                                                pid: '${workflow.input.pid}',
                                                // eslint-disable-next-line no-template-curly-in-string
                                                oid: '${workflow.input.oid}'
                                            });
                                        break;
                                    default:
                                        console.log('Error');
                                        break;
                                }
                                // eslint-disable-next-line camelcase
                                queue.push([next_nodes[m], task_node_child]);
                                // eslint-disable-next-line camelcase
                                cardandtask.push([next_nodes[m], task_node_child]);
                            }
                            // flow_all.push(next_nodes[i]);
                        } else if (
                            switchcard.length > 0 &&
                            JSON.stringify(next_nodes[m]) === JSON.stringify(flow.elements[j]) &&
                            flow.elements[j].visited === 1
                        ) {
                            console.log('合并！');
                            // eslint-disable-next-line no-plusplus
                            for (let l = 0; l < cardandtask.length; l++) {
                                if (JSON.stringify(next_nodes[m]) === JSON.stringify(cardandtask[l][0])) {
                                    // eslint-disable-next-line no-plusplus
                                    for (let i = 1; i < getIncomers(next_nodes[m], flow.elements).length; i++) {
                                        // console.log(1);
                                        // console.log(cardandtask[l][1]);
                                        // const switchtask = switchcard.pop();
                                        // console.log(switchtask);
                                        switchcard.pop().setNextNode(cardandtask[l][1]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // eslint-disable-next-line camelcase
            // const queue_hebin = [];
            // const task = [];
            // eslint-disable-next-line camelcase
            // const task_switch = [];
            // while (queue.length !== 0) {
            //     const data = queue.shift();
            //     // eslint-disable-next-line camelcase
            //     const next_nodes = getOutgoers(data[0], flow.elements);
            //     if (data[0].flag === 'switch') {
            //         console.log('switch!');
            //         // eslint-disable-next-line no-template-curly-in-string
            //         const switchNode = inputNode.setNextSwitchNode('${tag_1.output.response.body.statusCode}');
            //         switchNode.setName('switchTagNode1Node').setTaskReferenceName('switch_tag_1');
            //         task.push(switchNode);
            //         task_switch.push(switchNode);
            //     } else {
            //         const defaultNode = task[task.length - 1].addHttpCase(log, 'POST');
            //         defaultNode
            //             .setName(`log ${task.length}`)
            //             .setTaskReferenceName(`log_${task.length}`)
            //             .setBody({
            //                 // eslint-disable-next-line no-template-curly-in-string
            //                 oid: '${workflow.input.oid}',
            //                 description:
            //                     'There is no content to send for this request, but the headers may be useful. ' +
            //                     'The user agent may update its cached headers for this resource with the new ones.'
            //             });
            //         task.push(defaultNode);
            //     }
            //     // eslint-disable-next-line no-plusplus
            //     for (let i = 0; i < next_nodes.length; i++) {
            //         // eslint-disable-next-line no-plusplus
            //         for (let j = 0; j < flow.elements.length; j++) {
            //             if (JSON.stringify(next_nodes[i]) === JSON.stringify(flow.elements[j]) && flow.elements[j].visited === 0) {
            //                 flow.elements[j].visited = 1;
            //                 queue.push([next_nodes[i]]);
            //                 flow_all.push(next_nodes[i]);
            //                 if (data[0].flag === 'switch') {
            //                     // eslint-disable-next-line camelcase
            //                     const switch_child = task_switch[0].addHttpCase(200, lock, 'POST');
            //                     switch_child.setName(`log ${task.length}`).setTaskReferenceName(`log_${task.length}`).setBody({
            //                         // eslint-disable-next-line no-template-curly-in-string
            //                         oid: '${workflow.input.oid}',
            //                         description: '200'
            //                     });
            //                     task.push(switch_child);
            //                 } else {
            //                     console.log('...');
            //                 }
            //             } else if (JSON.stringify(next_nodes[i]) === JSON.stringify(flow.elements[j]) && flow.elements[j].visited === 1) {
            //                 console.log('合并！');
            //             }
            //         }
            //     }
            // }
            // eslint-disable-next-line consistent-return
            // const flowIter = (nodes, taskNode) => {
            //     if (nodes === undefined) return undefined;
            //     // console.log(getOutgoers(nodes[0],flow.elements))
            //     // eslint-disable-next-line camelcase
            //     const next_nodes = getOutgoers(nodes[0], flow.elements);
            //     // eslint-disable-next-line camelcase
            //     let case_next = null;
            //     if (next_nodes[0].type === 'output') return undefined;
            //     // eslint-disable-next-line camelcase
            //     // let task_node = null;
            //     // if (nodes[0].flag === 'switch') {
            //     //     // eslint-disable-next-line no-template-curly-in-string,camelcase
            //     //     task_node = taskNode.setNextSwitchNode(`${taskNode.getTaskReferenceName()}.output.response.body.statusCode}`);
            //     //     task_node.setName(`switchTagNode${getId()}Node`).setTaskReferenceName(`switch_tag_${getId()}`);
            //     //     queue.push(task_node);
            //     // } else {
            //     //     // eslint-disable-next-line camelcase
            //     //     task_node = taskNode.setNextHttpNode(log, 'POST');
            //     //     task_node.setName(`log ${getId()}`).setTaskReferenceName(`log_${getId()}`).setBody({
            //     //         // eslint-disable-next-line no-template-curly-in-string
            //     //         oid: '${workflow.input.oid}',
            //     //         description: 'Succeed'
            //     //     });
            //     //     console.log(1);
            //     // }
            //     // const len = next_nodes.length;
            //     // eslint-disable-next-line no-plusplus
            //     // for (let i = 0; i < len; i++) {
            //     // eslint-disable-next-line no-plusplus
            //     for (let j = 0; j < flow.elements.length; j++) {
            //         if (JSON.stringify(next_nodes[0]) === JSON.stringify(flow.elements[j]) && flow.elements[j].visited === 0) {
            //             flow.elements[j].visited = 1;
            //             // queue.push([next_nodes[i]]);
            //             // eslint-disable-next-line no-useless-concat,camelcase
            //             let task_node_child = null;
            //             // eslint-disable-next-line camelcase
            //             let case_flag = 0;
            //             if (next_nodes[0].flag === 'Switch') {
            //                 // eslint-disable-next-line no-template-curly-in-string,camelcase
            //                 task_node_child = taskNode.setNextSwitchNode(`${taskNode.taskReferenceName}.output.response.body.statusCode}`);
            //                 task_node_child
            //                     .setName(`${next_nodes[0].id}_Node`)
            //                     .setTaskReferenceName(`switch_${taskNode.taskReferenceName}_${next_nodes[0].id}_`);
            //                 queue.push(task_node_child);
            //             } else if (nodes[0].flag === 'Switch') {
            //                 // eslint-disable-next-line camelcase
            //                 case_flag = 1;
            //                 // eslint-disable-next-line no-plusplus
            //                 for (let k = 0; k < 2; k++) {
            //                     let cs = '是';
            //                     // eslint-disable-next-line no-plusplus
            //                     for (let l = 0; l < flow.elements.length; l++) {
            //                         if (
            //                             JSON.stringify(next_nodes[k]) === JSON.stringify(flow.elements[l]) &&
            //                             flow.elements[l].visited === 0
            //                         ) {
            //                             flow.elements[l].visited = 1;
            //                         }
            //                     }
            //                     // eslint-disable-next-line no-use-before-define
            //                     if (next_nodes[k].type === 'No') {
            //                         cs = 'default';
            //                         // if (getIncomers(getOutgoers(next_nodes[k], flow.elements)[0], flow.elements).length > 1) {
            //                         //     // eslint-disable-next-line no-continue
            //                         //     continue;
            //                         // }
            //                     }
            //                     // eslint-disable-next-line camelcase,no-use-before-define
            //                     case_next = getOutgoers(next_nodes[k], flow.elements);
            //                     // // eslint-disable-next-line camelcase
            //                     // task_node_child = taskNode.addHttpCase(`${cs}`, `${next_nodes[0].type}`, 'POST');
            //                     // task_node_child
            //                     //     .setName(`${next_nodes[0].id}_Node`)
            //                     //     .setTaskReferenceName(`${next_nodes[i].id}_Node`)
            //                     //     .setBody({
            //                     //         // eslint-disable-next-line no-template-curly-in-string
            //                     //         oid: '${workflow.input.oid}',
            //                     //         description:
            //                     //             'There is no content to send for this request, but the headers may be useful. ' +
            //                     //             'The user agent may update its cached headers for this resource with the new ones.'
            //                     //     });
            //                     switch (case_next[0].type) {
            //                         case 'Black':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, blacklist, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     bid: '${workflow.input.bid}'
            //                                 });
            //                             break;
            //
            //                         case 'White':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, whitelist, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     wid: '${workflow.input.wid}'
            //                                 });
            //                             break;
            //
            //                         case 'Credential':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, credential, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     cid: '${workflow.input.cid}'
            //                                 });
            //                             break;
            //
            //                         case 'InterestRate':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, interestRate, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     oid: '${workflow.input.oid}'
            //                                 });
            //                             break;
            //
            //                         case 'Lock':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, lock, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     oid: '${workflow.input.oid}',
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     pid: '${workflow.input.pid}'
            //                                 });
            //                             break;
            //
            //                         case 'Log':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, log, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     oid: '${workflow.input.oid}',
            //                                     description: '测试test'
            //                                 });
            //                             break;
            //
            //                         case 'Profile':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, profile, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     cid: '${workflow.input.oid}',
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     phone_num: '${workflow.input.phone_num}',
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     password: '${workflow.input.password}'
            //                                 });
            //                             break;
            //
            //                         case 'Region':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, region, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     cid: '${workflow.input.oid}',
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     address: '${workflow.input.address}'
            //                                 });
            //                             break;
            //
            //                         case 'Tag':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, tag, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     cid: '${workflow.input.oid}',
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     gid: '${workflow.input.gid}'
            //                                 });
            //                             break;
            //
            //                         case 'Unlock':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, unlock, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     pid: '${workflow.input.pid}'
            //                                 });
            //                             break;
            //
            //                         case 'Update':
            //                             // eslint-disable-next-line camelcase
            //                             task_node_child = taskNode.addHttpCase(`${cs}`, update, 'POST');
            //                             task_node_child
            //                                 .setName(`${case_next[0].id}_Node`)
            //                                 .setTaskReferenceName(`${case_next[0].id}_Node`)
            //                                 .setBody({
            //                                     // eslint-disable-next-line no-template-curly-in-string
            //                                     pid: '${workflow.input.pid}'
            //                                 });
            //                             break;
            //                         default:
            //                             console.log('Error');
            //                             break;
            //                     }
            //                 }
            //             } else {
            //                 // eslint-disable-next-line camelcase
            //                 // task_node_child = taskNode.setNextHttpNode(log, 'POST');
            //                 // task_node_child.setName(`log ${getId()}`).setTaskReferenceName(`log_${getId()}`).setBody({
            //                 //     // eslint-disable-next-line no-template-curly-in-string
            //                 //     oid: '${workflow.input.oid}',
            //                 //     description: 'Succeed'
            //                 // });
            //                 switch (next_nodes[0].type) {
            //                     case 'Black':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(blacklist, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 bid: '${workflow.input.bid}'
            //                             });
            //                         break;
            //
            //                     case 'White':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(whitelist, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 wid: '${workflow.input.wid}'
            //                             });
            //                         break;
            //
            //                     case 'Credential':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(credential, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 cid: '${workflow.input.cid}'
            //                             });
            //                         break;
            //
            //                     case 'InterestRate':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(interestRate, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 oid: '${workflow.input.oid}'
            //                             });
            //                         break;
            //
            //                     case 'Lock':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(lock, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 oid: '${workflow.input.oid}',
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 pid: '${workflow.input.pid}'
            //                             });
            //                         break;
            //
            //                     case 'Log':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(log, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 oid: '${workflow.input.oid}',
            //                                 description: '测试test'
            //                             });
            //                         break;
            //
            //                     case 'Profile':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(profile, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 cid: '${workflow.input.oid}',
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 phone_num: '${workflow.input.phone_num}',
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 password: '${workflow.input.password}'
            //                             });
            //                         break;
            //
            //                     case 'Region':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(region, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 cid: '${workflow.input.oid}',
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 address: '${workflow.input.address}'
            //                             });
            //                         break;
            //
            //                     case 'Tag':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(tag, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 cid: '${workflow.input.oid}',
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 gid: '${workflow.input.gid}'
            //                             });
            //                         break;
            //
            //                     case 'Unlock':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(unlock, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 pid: '${workflow.input.pid}'
            //                             });
            //                         break;
            //
            //                     case 'Update':
            //                         // eslint-disable-next-line camelcase
            //                         task_node_child = taskNode.setNextHttpNode(update, 'POST');
            //                         task_node_child
            //                             .setName(`${next_nodes[0].id}_Node`)
            //                             .setTaskReferenceName(`${next_nodes[0].id}_Node`)
            //                             .setBody({
            //                                 // eslint-disable-next-line no-template-curly-in-string
            //                                 pid: '${workflow.input.pid}'
            //                             });
            //                         break;
            //                     default:
            //                         console.log('Error');
            //                         break;
            //                 }
            //             }
            //             // eslint-disable-next-line camelcase
            //             if (case_flag === 0 && getIncomers(next_nodes[0], flow.elements).length > 1) {
            //                 // eslint-disable-next-line no-plusplus
            //                 // for (let k = 1; k < getIncomers(next_nodes[i], flow.elements).length; k++) {
            //                 queue.pop().setNextNode(task_node_child);
            //                 // }
            //             }
            //             // eslint-disable-next-line no-useless-concat
            //             console.log(`子节点：${JSON.stringify(next_nodes[0])}` + `父节点 ${JSON.stringify(nodes[0])}`);
            //             flow_all.push(next_nodes[0]);
            //             // eslint-disable-next-line camelcase
            //             if (case_flag === 0) {
            //                 flowIter([next_nodes[0]], task_node_child);
            //             } else {
            //                 flowIter([case_next[0]], task_node_child);
            //             }
            //         }
            //         // } else if (JSON.stringify(next_nodes[i]) === JSON.stringify(flow.elements[j]) && flow.elements[j].visited === 1) {
            //         //     // eslint-disable-next-line no-useless-concat
            //         //     console.log(`合并 ${JSON.stringify(next_nodes[i])}！` + `${JSON.stringify(queue)}`);
            //         //     queue.pop().setNextNode(queue_hebin.shift());
            //         // }
            //     }
            //     // }
            // };
            // flowIter(input, inputNode);
            builder.setInputNode(inputNode);
            const workflow = builder.build();
            console.log(workflow);
            console.log(flow_all);
            // const conductor = new ConductorApi();
            // conductor.setWorkFlow(workflow).then((r) => console.log(r));
        }
    }, [reactFlowInstance]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onRestore = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            console.log(flow.elements.pop());
            console.log(flow.elements);
            setElements(flow.elements || []);
        }
    }, [reactFlowInstance]);
    return (
        <Grid sx={{ position: 'relative', height: '100%', background: theme.palette.background.default }}>
            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            elements={elements}
                            snapToGrid
                            onEdgeUpdate={onEdgeUpdate}
                            defaultZoom={1.35}
                            onElementsRemove={onElementsRemove}
                            onConnect={onConnect}
                            onLoad={onLoad}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodeTypes={nodeTypes}
                        >
                            <MiniMap />
                            <Controls />
                            <Background />
                        </ReactFlow>
                    </div>
                    <Sidebar onSave={onSave} onRestore={onRestore} />
                </ReactFlowProvider>
            </div>
        </Grid>
    );
};

export default Orchestration;
