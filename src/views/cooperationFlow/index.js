import { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
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
import SidebarOpen from './SidebarOpen';
import './dnd.css';
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Avatar,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Slide,
    Snackbar
} from '@mui/material';
import { InputNode, WorkflowBuilder } from '../../utils/workflowBuilder';
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
    EntityApi
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
import { Check, Close, CloseOutlined, FlagCircle, FullscreenExitOutlined, PanToolOutlined, Undo } from '@mui/icons-material';
import AddModel from './AddModel';
import { GridActionsCellItem } from '@mui/x-data-grid';
import TerminateSelector from '../../ui-component/services/TerminateSelector';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import WorkFlowSelector from '../../ui-component/services/WorkFlowSelector';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import CooperationApi from '../../api/CooperationApi';
import AvatarGroup from '@mui/material/AvatarGroup';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { green, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import MainCard from '../../ui-component/cards/MainCard';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

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
    SwitchCard: SwitchSelector,
    Terminate: TerminateSelector,
    WorkFlow: WorkFlowSelector
};
const initialElements = [];
// let id = 0;
// // eslint-disable-next-line no-plusplus
// const getId = () => `dndnode_${id++}`;
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
// let NoId = 0;
// // eslint-disable-next-line no-plusplus
// const getNoId = () => `No_${NoId++}`;
// let YesId = 0;
// // eslint-disable-next-line no-plusplus
// const getYesId = () => `Yes_${YesId++}`;
// let SwitchId = 0;
// // eslint-disable-next-line no-plusplus
// const getSwitchId = () => `Switch_${SwitchId++}`;
// let LogId = 0;
// // eslint-disable-next-line no-plusplus

// const getLogId = () => `Log_${LogId++}`;
const CooperationFlow = () => {
    const nodeDefStyle = {
        border: '1px solid black',
        padding: 10,
        width: 150,
        borderRadius: 3,
        background: 'white'
    };
    const nodeSelectStyle = {
        border: '1px solid black',
        padding: 10,
        width: 210,
        borderRadius: 3,
        background: 'white'
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reactFlowWrapper = useRef(null);
    const reactFlowWrapperOpen = useRef(null);
    const reactFlowWrapperLook = useRef(null);
    const [openFull, setOpenFull] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [reactFlowInstanceOpen, setReactFlowInstanceOpen] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [elements, setElements] = useState(initialElements);
    // const [white, setWhite] = useState([]);
    // const [black, setBlack] = useState([]);
    // const [group, setGroup] = useState([]);
    const [serviceInfo, setServiceInfo] = useState([]);
    // const [workflowlist, setWorkflowlist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [perm, setPerm] = useState(false);
    const [whiteId, setWhiteId] = useState('');
    const [bid, setBid] = useState('');
    const [gid, setGid] = useState('');
    const [regions, setRegions] = useState([]);
    const [workInstance, setWorkInstance] = useState([]);
    const [open, setOpen] = useState(false);
    // const [workOptions, setWorkOptions] = useState([]);
    // const [white, setWhite] = useState('');
    // const [black, setBlack] = useState('');
    // const [group, setGroup] = useState('');
    const [lookFlag, setLookFlag] = useState(false);
    const [lookInstance, setLookInstance] = useState(initialElements);
    const [fid, setFid] = useState('');
    const [testFlowOpen, setTestFlowOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [testMsg, setTestMsg] = useState('');
    const [wrong, setWrong] = useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700]
            }
        }),
        ...(wrong && {
            bgcolor: red[500],
            '&:hover': {
                bgcolor: red[700]
            }
        })
    };
    function updateLookInstance(value) {
        setLookInstance(value);
    }
    function handleOpenLook() {
        setLookInstance(elements);
        setLookFlag(true);
    }
    function onlyOpenLook() {
        setLookFlag(true);
    }
    function handleCloseLook() {
        setLookFlag(false);
    }
    function genID() {
        return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
    }
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
    function updateFid(value) {
        setFid(value);
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
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            timeStamp: Date.now(),
            flow: res,
            room: {
                id: localStorage.getItem('roomId')
            }
        };
        CooperationApi.EditData(data);
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
    const onElementsRemove = (elementsToRemove) => {
        const anonymous = (els) => removeElements(elementsToRemove, els);
        // console.log(anonymous(elements));
        const res = anonymous(elements);
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
        // console.log(anonymous(elements));
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            timeStamp: Date.now(),
            flow: res,
            room: {
                id: localStorage.getItem('roomId')
            }
        };
        CooperationApi.EditData(data);
        // setElements((els) => removeElements(elementsToRemove, els));
        setElements(res);
    };
    const onEdgeUpdate = (oldEdge, newConnection) => {
        const anonymous = (els) => updateEdge(oldEdge, newConnection, els);
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            timeStamp: Date.now(),
            flow: anonymous(elements),
            room: {
                id: localStorage.getItem('roomId')
            }
        };
        CooperationApi.EditData(data);
        // setElements((els) => removeElements(elementsToRemove, els));
        setElements(anonymous(elements));
    };
    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);
    const onLoadOpen = (_reactFlowInstance) => setReactFlowInstanceOpen(_reactFlowInstance);
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();
        let reactFlowBounds;
        if (openFull) {
            reactFlowBounds = reactFlowWrapperOpen.current.getBoundingClientRect();
        } else {
            reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        }
        const type = event.dataTransfer.getData('application/reactflow');
        let position;
        if (openFull) {
            position = reactFlowInstanceOpen.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });
        } else {
            position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });
        }
        let newNode = null;
        switch (type) {
            case 'No':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: 'CaseNo',
                    style: { border: '1px solid black', borderRadius: 99999 },
                    visited: 0
                };
                break;

            case 'Yes':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    style: { border: '1px solid black', borderRadius: 99999 },
                    flag: 'CaseYes',
                    visited: 0
                };
                break;

            case 'SwitchCard':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: 'Switch',
                    visited: 0
                };
                break;

            case 'Black':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { updateBid, blackName: '' },
                    flag: `${type}`,
                    style: nodeSelectStyle,
                    visited: 0
                };
                break;

            case 'White':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { updateWid, whiteName: '' },
                    flag: `${type}`,
                    style: nodeSelectStyle,
                    visited: 0
                };
                break;

            case 'WorkFlow':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { updateFid, workFlowName: '', updateLookInstance, onlyOpenLook },
                    flag: `${type}`,
                    style: nodeSelectStyle,
                    visited: 0
                };
                break;
            case 'Credential':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'InterestRate':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'Lock':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'Log':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'Profile':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'Region':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { updateRegions, regions: [] },
                    flag: `${type}`,
                    style: nodeSelectStyle,
                    visited: 0
                };
                break;

            case 'Tag':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { updateGid, groupName: '' },
                    flag: `${type}`,
                    style: nodeSelectStyle,
                    visited: 0
                };
                break;

            case 'Unlock':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'Update':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;

            case 'output':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ?????? ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;
            case 'input':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ?????? ` },
                    flag: `${type}`,
                    visited: 0
                };
                break;
            case 'Terminate':
                newNode = {
                    id: `${genID()}`,
                    type,
                    position,
                    data: { label: ` ${type} node ` },
                    flag: `${type}`,
                    style: nodeDefStyle,
                    visited: 0
                };
                break;
            default:
                console.log('Error');
                break;
        }
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            timeStamp: Date.now(),
            flow: elements.concat(newNode),
            room: {
                id: localStorage.getItem('roomId')
            }
        };
        CooperationApi.EditData(data);
        setElements((es) => es.concat(newNode));
    };
    const [camera, setCamera] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    function handleCameraOpen() {
        navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
            setMediaStream(mediaStream);
            document.getElementById('video').srcObject = mediaStream;
            document.getElementById('video').play();
            const track = mediaStream.getVideoTracks()[0];
            setCamera(track);
        });
        setCameraOpen(true);
    }
    const navigate = useNavigate();
    function handleCameraClose() {
        mediaStream.getTracks()[0].stop();
        setCameraOpen(false);
    }
    const onSave = useCallback(
        (workNew) => {
            if (perm === false) {
                setSnackbarMsg('?????????????????????');
                setSnackbarOpen(true);
                return;
            }
            // builder.setOutput({
            //     // eslint-disable-next-line no-template-curly-in-string
            //     interest: '${InterestRate_Node.output.response.body.interest}'
            // });
            setTestMsg('???????????????????????????');
            setSuccess(false);
            setLoading(true);
            setTestFlowOpen(true);
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
                const flow = {
                    elements
                };
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
                    } else if (flow.elements[i].type === 'WorkFlow') {
                        flow.elements[i].data.workFlowName = fid;
                    }
                    flow_queue.push(JSON.stringify(flow.elements[i]));
                    console.log(flow.elements[i].data);
                }
                let workflowSave;
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
                                                        .setName(`Black_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Black_${case_next[0].id}_Node`)
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
                                                        .setName(`White_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`White_${case_next[0].id}_Node`)
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
                                                        .setName(`Credential_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Credential_${case_next[0].id}_Node`)
                                                        .setBody({
                                                            // eslint-disable-next-line no-template-curly-in-string
                                                            cid: '${workflow.input.cid}'
                                                        });
                                                    break;

                                                case 'InterestRate':
                                                    // eslint-disable-next-line camelcase
                                                    task_node_child = data[1].addHttpCase(`${cs}`, interestRate, 'POST');
                                                    task_node_child
                                                        .setName(`InterestRate_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`InterestRate_${case_next[0].id}_Node`)
                                                        .setBody({
                                                            // eslint-disable-next-line no-template-curly-in-string
                                                            oid: '${workflow.input.oid}'
                                                        });
                                                    break;

                                                case 'Lock':
                                                    // eslint-disable-next-line camelcase
                                                    task_node_child = data[1].addHttpCase(`${cs}`, lock, 'POST');
                                                    task_node_child
                                                        .setName(`Lock_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Lock_${case_next[0].id}_Node`)
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
                                                        .setName(`Log_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Log_${case_next[0].id}_Node`)
                                                        .setBody({
                                                            // eslint-disable-next-line no-template-curly-in-string
                                                            oid: '${workflow.input.oid}',
                                                            description: '??????test'
                                                        });
                                                    break;

                                                case 'Profile':
                                                    // eslint-disable-next-line camelcase
                                                    task_node_child = data[1].addHttpCase(`${cs}`, profile, 'POST');
                                                    task_node_child
                                                        .setName(`Profile_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Profile_${case_next[0].id}_Node`)
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
                                                        .setName(`Region_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Region_${case_next[0].id}_Node`)
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
                                                        .setName(`Tag_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Tag_${case_next[0].id}_Node`)
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
                                                        .setName(`Unlock_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Unlock_${case_next[0].id}_Node`)
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
                                                        .setName(`Update_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`Update_${case_next[0].id}_Node`)
                                                        .setBody({
                                                            // eslint-disable-next-line no-template-curly-in-string
                                                            pid: '${workflow.input.pid}',
                                                            // eslint-disable-next-line no-template-curly-in-string
                                                            oid: '${workflow.input.oid}'
                                                        });
                                                    break;
                                                case 'Terminate':
                                                    // eslint-disable-next-line camelcase
                                                    task_node_child = data[1].addTerminateCase('default', 'FAILED', 0);
                                                    task_node_child
                                                        .setName(`terminate_${case_next[0].id}_Node`)
                                                        .setTaskReferenceName(`terminate_${case_next[0].id}_Node`);
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
                                                .setName(`Black_${next_nodes[m].id}_Node`)
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
                                                .setName(`White_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`White_${next_nodes[m].id}_Node`)
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
                                                .setName(`Credential_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Credential_${next_nodes[m].id}_Node`)
                                                .setBody({
                                                    // eslint-disable-next-line no-template-curly-in-string
                                                    cid: '${workflow.input.cid}'
                                                });
                                            break;

                                        case 'InterestRate':
                                            // eslint-disable-next-line camelcase
                                            task_node_child = data[1].setNextHttpNode(interestRate, 'POST');
                                            task_node_child
                                                .setName(`InterestRate_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`InterestRate_${next_nodes[m].id}_Node`)
                                                .setBody({
                                                    // eslint-disable-next-line no-template-curly-in-string
                                                    oid: '${workflow.input.oid}'
                                                });
                                            break;

                                        case 'Lock':
                                            // eslint-disable-next-line camelcase
                                            task_node_child = data[1].setNextHttpNode(lock, 'POST');
                                            task_node_child
                                                .setName(`Lock_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Lock_${next_nodes[m].id}_Node`)
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
                                                .setName(`Log_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Log_${next_nodes[m].id}_Node`)
                                                .setBody({
                                                    // eslint-disable-next-line no-template-curly-in-string
                                                    oid: '${workflow.input.oid}',
                                                    description: '??????test'
                                                });
                                            break;

                                        case 'Profile':
                                            // eslint-disable-next-line camelcase
                                            task_node_child = data[1].setNextHttpNode(profile, 'POST');
                                            task_node_child
                                                .setName(`Profile_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Profile_${next_nodes[m].id}_Node`)
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
                                                .setName(`Region_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Region_${next_nodes[m].id}_Node`)
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
                                                .setName(`Tag_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Tag_${next_nodes[m].id}_Node`)
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
                                                .setName(`Unlock_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Unlock_${next_nodes[m].id}_Node`)
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
                                                .setName(`Update_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`Update_${next_nodes[m].id}_Node`)
                                                .setBody({
                                                    // eslint-disable-next-line no-template-curly-in-string
                                                    pid: '${workflow.input.pid}',
                                                    // eslint-disable-next-line no-template-curly-in-string
                                                    oid: '${workflow.input.oid}'
                                                });
                                            break;
                                        case 'Terminate':
                                            // eslint-disable-next-line camelcase
                                            task_node_child = data[1].setNextTerminateNode('FAILED', 0);
                                            task_node_child
                                                .setName(`terminate_${next_nodes[m].id}_Node`)
                                                .setTaskReferenceName(`terminate_${next_nodes[m].id}_Node`);
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
                                console.log('?????????');
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
                workflowSave.account = JSON.parse(localStorage.getItem('admin')).account;
                console.log(JSON.parse(workflowSave.flow));
                if (workInstance.length === 0) {
                    entityApi.addWorkFlow(workflowSave).then((res) => {
                        console.log(res);
                        if (res.data.status !== 'Failed') {
                            setTestMsg('???????????????????????????');
                            setSuccess(true);
                            setLoading(false);
                            setElements(initialElements);
                            setWorkInstance([]);
                            const data = {
                                account: JSON.parse(localStorage.getItem('admin')).account,
                                token: localStorage.getItem('admin_token'),
                                room: {
                                    id: localStorage.getItem('roomId'),
                                    password: 'Success'
                                }
                            };
                            CooperationApi.DeleteRoom(data);
                            window.location.href = '/cooperation';
                        } else {
                            setTestMsg('???????????????????????????');
                            setWrong(true);
                            setLoading(false);
                        }
                    });
                } else {
                    entityApi.updateWorkFlow(workflowSave).then((res) => {
                        console.log(res);
                        entityApi.getWorkFlows().then((re) => {
                            // setWorkflowlist(re.data);
                            const queue = [];
                            queue.push('??????');
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.data.length; i++) {
                                queue.push(re.data[i].name);
                            }
                            // setWorkOptions(queue);
                            console.log(queue);
                        });
                    });
                    const data = {
                        account: JSON.parse(localStorage.getItem('admin')).account,
                        token: localStorage.getItem('admin_token'),
                        room: {
                            id: localStorage.getItem('roomId'),
                            password: 'Success'
                        }
                    };
                    CooperationApi.DeleteRoom(data);
                    navigate('/cooperation');
                }
                // const conductor = new ConductorApi();
                // conductor.setWorkFlow(workflow).then((r) => console.log(r));
            }
        },
        [workInstance, perm, whiteId, bid, gid, regions, reactFlowInstance, fid, navigate, elements]
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
    const [avatar, setAvatar] = useState([]);
    useEffect(() => {
        CooperationApi.subscribeToNewElements(JSON.parse(localStorage.getItem('admin')).account, (flow) => {
            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < flow.length; j++) {
                if (flow[j].type === 'White') {
                    flow[j].data.updateWid = updateWid;
                } else if (flow[j].type === 'Black') {
                    flow[j].data.updateBid = updateBid;
                } else if (flow[j].type === 'Tag') {
                    flow[j].data.updateGid = updateGid;
                } else if (flow[j].type === 'Region') {
                    flow[j].data.updateRegions = updateRegions;
                } else if (flow[j].type === 'WorkFlow') {
                    flow[j].data.updateFid = updateFid;
                    flow[j].data.updateLookInstance = updateLookInstance;
                    flow[j].data.onlyOpenLook = onlyOpenLook;
                }
            }
            // console.log(flow);
            setElements(flow);
        });

        CooperationApi.subscribeToNewAccountLists(JSON.parse(localStorage.getItem('admin')).account, (accountLists) => {
            const entityApi = new EntityApi(localStorage.getItem('admin_token'));
            // console.log(accountLists);
            localStorage.setItem('accountLists', accountLists);
            accountLists = accountLists.substring(1, accountLists.length - 1).split(',');
            const queue = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < accountLists.length; i++) {
                queue.push(entityApi.getByAccount(accountLists[i]));
            }
            const avatar = [];
            Promise.all(queue).then((res) => {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.length; i++) {
                    avatar.push(res[i].data.avatar);
                }
                avatar.map((value) => console.log(value));
                setAvatar(avatar);
            });
        });
        CooperationApi.subscribeToDeleteInfo(JSON.parse(localStorage.getItem('admin')).account, (data) => {
            if (data.msg.indexOf(JSON.parse(localStorage.getItem('admin')).account) !== -1) {
                navigate('/cooperation');
            }
        });
        // return () => {
        //     const data = {
        //         account: JSON.parse(localStorage.getItem('admin')).account,
        //         token: localStorage.getItem('admin_token'),
        //         room: {
        //             id: localStorage.getItem('roomId')
        //         }
        //     };
        //     CooperationApi.QuitRoom(data);
        // };
        return () => {
            CooperationApi.unsubscribeToNewAccountLists(JSON.parse(localStorage.getItem('admin')).account);
            CooperationApi.unsubscribeToNewElements(JSON.parse(localStorage.getItem('admin')).account);
            CooperationApi.unsubscribeToDeleteInfo(JSON.parse(localStorage.getItem('admin')).account);
        };
    }, [navigate]);
    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        let accountLists = localStorage.getItem('accountLists');
        localStorage.setItem('accountLists', accountLists);
        accountLists = accountLists.substring(1, accountLists.length - 1).split(',');
        const queue = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < accountLists.length; i++) {
            queue.push(entityApi.getByAccount(accountLists[i]));
        }
        const avatar = [];
        Promise.all(queue).then((res) => {
            console.log(res);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.length; i++) {
                avatar.push(res[i].data.avatar);
            }
            console.log(avatar);
            avatar.map((value) => console.log(value));
            setAvatar(avatar);
        });
        if (localStorage.getItem('elements') !== '') {
            const flow = JSON.parse(localStorage.getItem('elements'));
            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < flow.length; j++) {
                if (flow[j].type === 'White') {
                    flow[j].data.updateWid = updateWid;
                } else if (flow[j].type === 'Black') {
                    flow[j].data.updateBid = updateBid;
                } else if (flow[j].type === 'Tag') {
                    flow[j].data.updateGid = updateGid;
                } else if (flow[j].type === 'Region') {
                    flow[j].data.updateRegions = updateRegions;
                }
            }
            setElements(flow);
        }
        entityApi
            .getServiceInfos()
            .then((res) => {
                setPerm(true);
                setServiceInfo(res.data);
                // entityApi.getWhitelists().then((re) => {
                //     // setWhite(re.data);
                // });
                // entityApi.getBlacklists().then((re) => {
                //     // setBlack(re.data);
                // });
                // entityApi.getUserGroups().then((re) => {
                //     // setGroup(re.data);
                // });
                // entityApi.getWorkFlows().then((re) => {
                //     setWorkflowlist(re.data);
                //     const queue = [];
                //     queue.push('??????');
                //     // eslint-disable-next-line no-plusplus
                //     for (let i = 0; i < re.data.length; i++) {
                //         queue.push(re.data[i].name);
                //     }
                //     // setWorkOptions(queue);
                // });
            })
            .catch(() => {
                setSnackbarMsg('?????????????????????');
                setSnackbarOpen(true);
            });
    }, []);

    const handleClickOpenFull = () => {
        setOpenFull(true);
    };

    const handleFullClose = () => {
        setOpenFull(false);
    };

    function getBase64(imgUrl) {
        window.URL = window.URL || window.webkitURL;
        const xhr = new XMLHttpRequest();
        xhr.open('get', imgUrl, true);
        // ????????????
        xhr.responseType = 'blob';
        // eslint-disable-next-line func-names
        xhr.onload = function () {
            // eslint-disable-next-line react/no-this-in-sfc
            if (this.status === 200) {
                // ????????????blob??????
                // eslint-disable-next-line react/no-this-in-sfc
                const blob = this.response;
                console.log('blob', blob);
                // ????????????
                const oFileReader = new FileReader();
                // eslint-disable-next-line func-names
                oFileReader.onloadend = function (e) {
                    // ???????????????????????? base64????????????
                    const base64 = e.target.result;
                    const formData = new FormData();
                    formData.append('api_key', '3sBopkZLRn5DnMrC44wgM94YMKu1Woak');
                    formData.append('api_secret', '28lgf36_t9Ax7wDX6Fpc2hu3gCG0wLW4');
                    formData.append('image_base64_1', JSON.parse(localStorage.getItem('admin')).avatar);
                    formData.append('image_base64_2', base64);
                    axios.post('https://api-cn.faceplusplus.com/facepp/v3/compare', formData).then((re) => {
                        console.log(re.data.confidence);
                        if (Number(re.data.confidence) > 75) {
                            console.log('Yes');
                            setSnackbarMsg('?????????????????????');
                            setSnackbarOpen(true);
                            mediaStream.getTracks()[0].stop();
                            handleCameraClose();
                            handleOpen();
                        } else {
                            setSnackbarMsg('?????????????????????');
                            setSnackbarOpen(true);
                            mediaStream.getTracks()[0].stop();
                            handleCameraClose();
                        }
                    });
                };
                oFileReader.readAsDataURL(blob);
            }
        };
        xhr.send();
    }
    function takePicture() {
        const imageCapture = new ImageCapture(camera);
        imageCapture.takePhoto().then((blob) => {
            console.log(URL.createObjectURL(blob));
            getBase64(URL.createObjectURL(blob));
            // mediaStream.getTracks()[0].stop();
        });
    }
    function Quit() {
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            room: {
                id: localStorage.getItem('roomId')
            }
        };
        CooperationApi.QuitRoom(data);
        CooperationApi.unsubscribeToNewElements(JSON.parse(localStorage.getItem('admin')).account);
        CooperationApi.unsubscribeToNewAccountLists(JSON.parse(localStorage.getItem('admin')).account);
        navigate('/cooperation');
    }
    return (
        <MainCard
            title="??????????????????"
            secondary={
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h5" mt={1}>
                            {`????????????:  `}{' '}
                        </Typography>
                        <AvatarGroup max={3} sx={{ ml: 2 }}>
                            {avatar.map((value, index) => (
                                <Box key={index}>
                                    <Avatar src={value} sx={{ width: 30, height: 30 }} />
                                </Box>
                            ))}
                        </AvatarGroup>
                    </Box>
                    <ToggleButtonGroup aria-label="text alignment" size="small" sx={{ ml: 2 }}>
                        <ToggleButton value="left" aria-label="left aligned" onClick={() => handleClickOpenFull()}>
                            <FullscreenExitOutlined />
                        </ToggleButton>
                        <ToggleButton value="left" aria-label="left aligned" onClick={() => onRestore()}>
                            <Undo />
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered" onClick={() => handleOpenLook()}>
                            <FlagCircle />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Box sx={{ display: 'flex', ml: 5 }}>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Button onClick={Quit} variant="outlined">
                            ??????
                        </Button>
                    </Box>
                </Box>
            }
        >
            {/* <Grid container> */}
            {/*    <Grid item xs={9}> */}
            {/*        /!* eslint-disable-next-line react/jsx-no-bind *!/ */}
            {/*        <Button onClick={Quit} variant="outlined"> */}
            {/*            ?????? */}
            {/*        </Button> */}
            {/*    </Grid> */}
            {/*    <Typography variant="h5" mt={1}> */}
            {/*        {`????????????:  `}{' '} */}
            {/*    </Typography> */}
            {/*    <AvatarGroup max={3} sx={{ ml: 2 }}> */}
            {/*        {avatar.map((value, index) => ( */}
            {/*            <Box key={index}> */}
            {/*                <Avatar src={value} sx={{ width: 30, height: 30 }} /> */}
            {/*            </Box> */}
            {/*        ))} */}
            {/*    </AvatarGroup> */}
            {/* </Grid> */}
            {/* eslint-disable-next-line react/jsx-no-undef */}
            {/* eslint-disable-next-line react/jsx-no-bind */}
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Dialog open={cameraOpen} onClose={handleCameraClose}>
                <DialogTitle>
                    <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
                        <Typography variant="h4" align="center">
                            ??????????????????????????????????????????
                        </Typography>
                    </Paper>
                </DialogTitle>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video style={{ width: 480, height: 320 }} id="video" />
                <DialogActions>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick={takePicture}>??????</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullScreen open={openFull} onClose={handleFullClose} TransitionComponent={Transition}>
                <GridActionsCellItem
                    sx={{ position: 'fixed', left: '0.5%', top: '0.5%', zIndex: 999 }}
                    icon={<CloseOutlined />}
                    onClick={handleFullClose}
                />
                <Grid sx={{ position: 'relative', height: '100%', background: theme.palette.background.default }}>
                    <Box className="dndflow" sx={{ height: '100vh' }}>
                        <ReactFlowProvider>
                            <div className="reactflow-wrapper" ref={reactFlowWrapperOpen}>
                                <ReactFlow
                                    elements={elements}
                                    snapToGrid
                                    onEdgeUpdate={onEdgeUpdate}
                                    defaultZoom={1.35}
                                    onElementsRemove={onElementsRemove}
                                    onConnect={onConnect}
                                    onLoad={onLoadOpen}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    nodeTypes={nodeTypes}
                                >
                                    <MiniMap />
                                    <Controls />
                                    <Background />
                                </ReactFlow>
                            </div>
                            <SidebarOpen onRestore={onRestore} serviceInfo={serviceInfo} />
                            <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'fixed', left: '94%', top: '90%' }}>
                                {/* eslint-disable-next-line react/destructuring-assignment,react/jsx-no-bind */}
                                <Check onClick={handleCameraOpen} />
                            </Fab>
                            <AddModel open={open} handleClose={handleClose} workInstance={workInstance} onSave={onSave} />
                        </ReactFlowProvider>
                    </Box>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert severity="warning" open={snackbarOpen} onClose={() => handleSnackbarClose}>
                            {snackbarMsg}
                        </Alert>
                    </Snackbar>
                </Grid>
                {/* <Chip */}
                {/*    sx={{ position: 'fixed', left: '88%', top: '91.7%', zIndex: 999 }} */}
                {/*    label="??????" */}
                {/*    onClick={handleOpenLook} */}
                {/*    icon={<FlagCircle />} */}
                {/*    variant="outlined" */}
                {/* /> */}
            </Dialog>
            <Grid sx={{ position: 'relative', height: '93%', background: theme.palette.background.default, mt: 0.5 }}>
                <Box className="dndflow" sx={{ height: 'calc(100vh - 260px)' }}>
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
                        <Sidebar onRestore={onRestore} serviceInfo={serviceInfo} />
                        <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'fixed', left: '94%', top: '90%' }}>
                            {/* eslint-disable-next-line react/destructuring-assignment,react/jsx-no-bind */}
                            <Check onClick={handleCameraOpen} />
                        </Fab>
                        <AddModel open={open} handleClose={handleClose} workInstance={workInstance} onSave={onSave} />
                    </ReactFlowProvider>
                </Box>
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
            {/* <Chip */}
            {/*     sx={{ position: 'fixed', left: '82%', top: '91.7%', zIndex: 999 }} */}
            {/*     label="??????" */}
            {/*     onClick={handleClickOpenFull} */}
            {/*     icon={<FullscreenExitOutlined />} */}
            {/*     variant="outlined" */}
            {/* /> */}
            {/* <Chip */}
            {/*     sx={{ position: 'fixed', left: '88%', top: '91.7%', zIndex: 999 }} */}
            {/*     label="??????" */}
            {/*     onClick={handleOpenLook} */}
            {/*     icon={<FlagCircle />} */}
            {/*     variant="outlined" */}
            {/* /> */}
            {lookFlag === true ? (
                <Box
                    sx={{
                        position: 'fixed',
                        '& > :not(style)': {
                            width: 400,
                            height: 465
                        },
                        zIndex: 1500,
                        top: '3%',
                        left: '1%'
                    }}
                >
                    <Draggable>
                        <Paper variant="outlined">
                            <GridActionsCellItem
                                sx={{ position: 'fixed', left: '0.5%', top: '0.5%', zIndex: 999 }}
                                icon={<CloseOutlined />}
                                /* eslint-disable-next-line react/jsx-no-bind */
                                onClick={handleCloseLook}
                            />
                            <GridActionsCellItem
                                sx={{ position: 'fixed', right: '0.5%', top: '0.5%', zIndex: 999 }}
                                icon={<PanToolOutlined />}
                            />
                            <Box className="dndflow" sx={{ height: '100%' }}>
                                <ReactFlowProvider>
                                    <div className="reactflow-wrapper" ref={reactFlowWrapperLook}>
                                        <ReactFlow
                                            elements={lookInstance}
                                            // snapToGrid
                                            // onEdgeUpdate={onEdgeUpdate}
                                            // defaultZoom={1.35}
                                            // onElementsRemove={onElementsRemove}
                                            // onConnect={onConnect}
                                            // onLoad={onLoad}
                                            // onDrop={onDrop}
                                            // onDragOver={onDragOver}
                                            nodeTypes={nodeTypes}
                                        >
                                            <Controls />
                                            <Background variant="dots" gap={6} size={2} color="#e3f2fd" />
                                        </ReactFlow>
                                    </div>
                                </ReactFlowProvider>
                            </Box>
                        </Paper>
                    </Draggable>
                </Box>
            ) : (
                ''
            )}
            <Dialog
                open={testFlowOpen}
                onClose={() => {
                    setTestFlowOpen(false);
                    setWrong(false);
                    setSuccess(false);
                }}
            >
                <DialogTitle>
                    <Typography fontSize="1.15rem" align="center">
                        {testMsg}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mt: 1, ml: 5.5, position: 'relative' }}>
                            <Fab aria-label="save" color="primary" sx={buttonSx}>
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {success ? <CheckIcon /> : wrong ? <Close /> : <SaveIcon />}
                            </Fab>
                            {loading && (
                                <CircularProgress
                                    size={68}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: -6,
                                        left: -6,
                                        zIndex: 1
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </MainCard>
    );
};

export default CooperationFlow;
