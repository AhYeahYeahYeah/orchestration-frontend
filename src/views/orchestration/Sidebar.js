import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import { Reply } from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ControllableStates from './ControllableStates';
import PropTypes from 'prop-types';
import ServiceInfoModel from './ServiceInfoModel';
import { useState } from 'react';

export default function Sidebar({ onRestore, updateFlowinstance, workOptions, serviceInfo }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [serviceShow, setServiceShow] = useState({});
    const handleClickOpen = (value) => {
        setServiceShow(serviceInfo[value]);
        // console.log(serviceInfo[value]);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onDragStart = (event, nodeType) => {
        // console.log(nodeType);
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Grid sx={{ left: '80%', width: 200, height: '100%', background: theme.palette.background.default }}>
            <Box sx={{ marginTop: 1.5 }}>
                <Grid container>
                    <Grid item xs={2}>
                        {/* eslint-disable-next-line react/destructuring-assignment */}
                        <Reply onClick={onRestore} />
                    </Grid>
                    <Grid item xs={8}>
                        <ControllableStates updateFlowinstance={updateFlowinstance} workOptions={workOptions} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ position: 'absolute', height: '80%' }}>
                <PerfectScrollbar
                    component="div"
                    sx={{
                        height: '100%',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                            Input Node
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'SwitchCard')} draggable>
                            分支
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Yes')} draggable>
                            Case--是
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'No')} draggable>
                            Case--否
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(0)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Lock')}
                            draggable
                        >
                            库存锁定
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(3)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Update')}
                            draggable
                        >
                            库存更新
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(4)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Unlock')}
                            draggable
                        >
                            库存解锁
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(5)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Credential')}
                            draggable
                        >
                            证件审查
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(6)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Profile')}
                            draggable
                        >
                            用户信息校验
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(7)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'White')}
                            draggable
                        >
                            白名单控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(8)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Black')}
                            draggable
                        >
                            黑名单控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(9)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Region')}
                            draggable
                        >
                            地域控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(10)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Tag')}
                            draggable
                        >
                            用户标签
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(1)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Log')}
                            draggable
                        >
                            日志录入
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(2)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'InterestRate')}
                            draggable
                        >
                            利息计算
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                            Output Node
                        </div>
                    </Grid>
                    <ServiceInfoModel
                        open={open}
                        handleClose={handleClose}
                        serviceName={serviceShow.sname}
                        serviceDescription={serviceShow.description}
                    />
                </PerfectScrollbar>
            </Box>
        </Grid>
    );
}
Sidebar.propTypes = {
    onRestore: PropTypes.func,
    updateFlowinstance: PropTypes.func,
    workOptions: PropTypes.array,
    serviceInfo: PropTypes.array
};
