import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import {
    Calculate,
    CheckCircle,
    Close,
    DoNotDisturbOn,
    FactCheck,
    Lock,
    LockOpen,
    RateReview,
    SwitchCamera,
    ViewList,
    Warehouse
} from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import ServiceInfoModel from './ServiceInfoModel';
import { useState } from 'react';

export default function SidebarOpen({ serviceInfo }) {
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
            {/* <Box sx={{ marginTop: 1.5 }}> */}
            {/*    <Grid container> */}
            {/*        <Grid item xs={2}> */}
            {/*            /!* eslint-disable-next-line react/destructuring-assignment *!/ */}
            {/*            <GridActionsCellItem icon={<Reply />} onClick={onRestore} /> */}
            {/*        </Grid> */}
            {/*    </Grid> */}
            {/* </Box> */}
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
                            ??????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'SwitchCard')} draggable>
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <SwitchCamera fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ??????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Yes')} draggable>
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <CheckCircle fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            Case--???
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'No')} draggable>
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <DoNotDisturbOn fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            Case--???
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Terminate')} draggable>
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <Close fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ??? ???
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
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <Lock fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(4)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Update')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <Warehouse fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(5)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Unlock')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <LockOpen fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(6)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Credential')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(7)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Profile')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ??????????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(8)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'White')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ???????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(9)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Black')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ???????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(10)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Region')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(11)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'Tag')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <FactCheck fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
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
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <RateReview fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
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
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <Calculate fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => handleClickOpen(3)}
                            className="react-flow__node-default"
                            onDragStart={(event) => onDragStart(event, 'WorkFlow')}
                            draggable
                        >
                            <Box sx={{ position: 'absolute', left: '15%' }}>
                                <ViewList fontSize="small" sx={{ color: '#616161' }} />
                            </Box>
                            ??????????????????
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                            ??????
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
SidebarOpen.propTypes = {
    serviceInfo: PropTypes.array
};
