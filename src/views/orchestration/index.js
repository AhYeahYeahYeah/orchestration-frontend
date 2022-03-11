import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    updateEdge,
    MiniMap,
    Background,
    getOutgoers,
    getIncomers,
    isEdge
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './dnd.css';
import { useTheme } from '@mui/material/styles';
import { Alert, Fab, Grid, Snackbar } from '@mui/material';
import { InputNode, WorkflowBuilder } from '../../utils/workflowBuilder';
// eslint-disable-next-line no-unused-vars,import/named
import {
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
    whitelist,
    EntityApi,
    ConductorApi
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
import { Check } from '@mui/icons-material';
import AddModel from './AddModel';

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
    // const [white, setWhite] = useState([]);
    // const [black, setBlack] = useState([]);
    // const [group, setGroup] = useState([]);
    const [serviceInfo, setServiceInfo] = useState([]);
    const [workflowlist, setWorkflowlist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [perm, setPerm] = useState(false);
    const [whiteId, setWhiteId] = useState('');
    const [bid, setBid] = useState('');
    const [gid, setGid] = useState('');
    const [regions, setRegions] = useState([]);
    const [workInstance, setWorkInstance] = useState([]);
    const [open, setOpen] = useState(false);
    const [workOptions, setWorkOptions] = useState([]);
    const [white, setWhite] = useState('');
    const [black, setBlack] = useState('');
    const [group, setGroup] = useState('');
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function updateWid(value) {
        setWhiteId(value);
    }
    function updateBid(value) {
        setBid(value);
    }
    function updateGid(value) {
        setGid(value);
    }
    function updateRegions(value) {
        setRegions(value);
    }
    const onConnect = (params) => {
        const res = addEdge({ ...params, animated: true, style: { strokeWidth: 4 } }, elements);
        let flag = 0;
        const judge = (node) => {
            if (node.type === 'output') {
                flag = 1;
            }
            const child = getOutgoers(node, res);
            if (child.length === 0) return;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < child.length; i++) {
                judge(child[i]);
            }
        };
        judge(res[0]);
        if (flag) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.length; i++) {
                if (isEdge(res[i])) {
                    res[i].animated = false;
                }
            }
        } else {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.length; i++) {
                if (isEdge(res[i])) {
                    res[i].animated = true;
                }
            }
        }
        setElements(res);
    };
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

    function updateFlowinstance(value) {
        console.log(value);
        if (value === '新建') {
            setElements(initialElements);
            setWorkInstance([]);
        } else {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < workflowlist.length; i++) {
                if (value === workflowlist[i].name) {
                    // console.log(JSON.parse(workflowlist[i].flow));
                    const flow = JSON.parse(workflowlist[i].flow);
                    const conductor = new ConductorApi();
                    // eslint-disable-next-line no-loop-func
                    conductor.getMetaDataWorkFlow(workflowlist[i].name).then((res) => {
                        console.log(res.data.inputTemplate);
                        // eslint-disable-next-line no-plusplus
                        for (let j = 0; j < flow.length; j++) {
                            if (flow[j].type === 'White') {
                                // eslint-disable-next-line no-plusplus
                                for (let k = 0; k < white.length; k++) {
                                    if (flow[j].data.whiteName === white[k].wid) {
                                        flow[j].data.whiteName = white[k].name;
                                        flow[j].data.updateWid = updateWid;
                                    }
                                }
                            } else if (flow[j].type === 'Black') {
                                // eslint-disable-next-line no-plusplus
                                for (let k = 0; k < black.length; k++) {
                                    if (flow[j].data.blackName === black[k].bid) {
                                        flow[j].data.blackName = black[k].name;
                                        flow[j].data.updateBid = updateBid;
                                    }
                                }
                            } else if (flow[j].type === 'Tag') {
                                // eslint-disable-next-line no-plusplus
                                for (let k = 0; k < group.length; k++) {
                                    if (flow[j].data.groupName === group[k].gid) {
                                        console.log(1);
                                        flow[j].data.groupName = group[k].name;
                                        flow[j].data.updateGid = updateGid;
                                    }
                                }
                            } else if (flow[j].type === 'Region') {
                                // eslint-disable-next-line no-plusplus
                                flow[j].data.regions = res.data.inputTemplate.region;
                                flow[j].data.updateRegions = updateRegions;
                            }
                        }
                        console.log(flow);
                        setElements(flow);
                        setWorkInstance([workflowlist[i].fid, workflowlist[i].name, workflowlist[i].description, workflowlist[i].version]);
                    });
                }
            }
        }
    }

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
                    data: { updateBid, blackName: '' },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'White':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { updateWid, whiteName: '' },
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
                    data: { updateRegions, regions: [] },
                    flag: `${type}`,
                    visited: 0
                };
                break;

            case 'Tag':
                newNode = {
                    id: `${type}`,
                    type,
                    position,
                    data: { updateGid, groupName: '' },
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
            case 'input':
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

    const onSave = useCallback(
        (workNew) => {
            if (perm === false) {
                setSnackbarMsg('您无权限操作！');
                setSnackbarOpen(true);
                return;
            }
            // builder.setOutput({
            //     // eslint-disable-next-line no-template-curly-in-string
            //     interest: '${InterestRate_Node.output.response.body.interest}'
            // });
            if (reactFlowInstance) {
                console.log(workNew);
                const builder = new WorkflowBuilder(workNew.name, workNew.version, '1010353663@qq.com');
                builder.setDescription(workNew.description);
                builder.setRuntimeInput(['pid', 'cid', 'oid', 'phoneNum', 'password']);
                builder.setBuildtimeInput({
                    wid: whiteId,
                    bid,
                    region: regions,
                    gid
                });
                // builder.setOutput({
                //     // eslint-disable-next-line no-template-curly-in-string
                //     interest: '${interest_1.output.response.body.interest}'
                // });
                const inputNode = new InputNode();
                const flow = reactFlowInstance.toObject();
                // eslint-disable-next-line camelcase
                const flow_queue = [];
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < flow.elements.length; i++) {
                    if (flow.elements[i].type === 'White') {
                        flow.elements[i].data.whiteName = whiteId;
                    } else if (flow.elements[i].type === 'Black') {
                        flow.elements[i].data.blackName = bid;
                    } else if (flow.elements[i].type === 'Tag') {
                        flow.elements[i].data.groupName = gid;
                    } else if (flow.elements[i].type === 'InterestRate') {
                        builder.setOutput({
                            // eslint-disable-next-line no-template-curly-in-string
                            interest: '${InterestRate_Node.output.response.body.interest}'
                        });
                    }
                    flow_queue.push(JSON.stringify(flow.elements[i]));
                    console.log(flow.elements[i].data);
                }
                let workflowSave = {};
                if (workInstance.length === 0) {
                    workflowSave = {
                        name: workNew.name,
                        description: workNew.description,
                        version: workNew.version,
                        flow: JSON.stringify(flow.elements)
                    };
                } else {
                    workflowSave = {
                        fid: workNew.fid,
                        name: workNew.name,
                        description: workNew.description,
                        version: workNew.version,
                        flow: `[${flow_queue.toString()}]`
                    };
                }
                // localforage.setItem(flowKey, flow);
                console.log(flow.elements);
                const entityApi = new EntityApi(localStorage.getItem('admin_token'));
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
                builder.setInputNode(inputNode);
                console.log(builder);
                const workflow = builder.build();
                console.log(workflow);
                console.log(flow_all);
                workflowSave.metadataWorkflow = JSON.parse(workflow);
                console.log(JSON.parse(workflowSave.flow));
                if (workInstance.length === 0) {
                    entityApi.addWorkFlow(workflowSave).then((res) => {
                        console.log(res);
                        entityApi.getWorkFlows().then((re) => {
                            setWorkflowlist(re.data);
                            const queue = [];
                            queue.push('新建');
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.data.length; i++) {
                                queue.push(re.data[i].name);
                            }
                            setWorkOptions(queue);
                            console.log(queue);
                        });
                    });
                } else {
                    entityApi.updateWorkFlow(workflowSave).then((res) => {
                        console.log(res);
                        entityApi.getWorkFlows().then((re) => {
                            setWorkflowlist(re.data);
                            const queue = [];
                            queue.push('新建');
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.data.length; i++) {
                                queue.push(re.data[i].name);
                            }
                            setWorkOptions(queue);
                            console.log(queue);
                        });
                    });
                }
                setElements(initialElements);
                setWorkInstance([]);
                // const conductor = new ConductorApi();
                // conductor.setWorkFlow(workflow).then((r) => console.log(r));
            }
        },
        [workInstance, perm, whiteId, bid, gid, regions, reactFlowInstance]
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onRestore = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            console.log(flow.elements.pop());
            console.log(flow.elements);
            setElements(flow.elements || []);
        }
    }, [reactFlowInstance]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi
            .getServiceInfos()
            .then((res) => {
                setPerm(true);
                setServiceInfo(res.data);
                entityApi.getWhitelists().then((re) => {
                    setWhite(re.data);
                });
                entityApi.getBlacklists().then((re) => {
                    setBlack(re.data);
                });
                entityApi.getUserGroups().then((re) => {
                    setGroup(re.data);
                });
                entityApi.getWorkFlows().then((re) => {
                    setWorkflowlist(re.data);
                    const queue = [];
                    queue.push('新建');
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < re.data.length; i++) {
                        queue.push(re.data[i].name);
                    }
                    setWorkOptions(queue);
                });
            })
            .catch(() => {
                setSnackbarMsg('您无权限操作！');
                setSnackbarOpen(true);
            });
    }, []);
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
                    <Sidebar
                        onRestore={onRestore}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        updateFlowinstance={updateFlowinstance}
                        workOptions={workOptions}
                        serviceInfo={serviceInfo}
                    />
                    <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'fixed', left: '94%', top: '90%' }}>
                        {/* eslint-disable-next-line react/destructuring-assignment */}
                        <Check onClick={handleOpen} />
                    </Fab>
                    <AddModel open={open} handleClose={handleClose} workInstance={workInstance} onSave={onSave} />
                </ReactFlowProvider>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="warning" open={snackbarOpen} onClose={handleSnackbarClose}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default Orchestration;
