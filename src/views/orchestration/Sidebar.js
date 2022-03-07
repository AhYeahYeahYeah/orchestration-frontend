import { useTheme } from '@mui/material/styles';
import { Fab, Box, Grid } from '@mui/material';
import { Check, Reply } from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ControllableStates from './ControllableStates';
import PropTypes from 'prop-types';

export default function Sidebar({ onSave, onRestore }) {
    const theme = useTheme();
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
                        <ControllableStates />
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
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Lock')} draggable>
                            库存锁定
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Update')} draggable>
                            库存更新
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Unlock')} draggable>
                            库存解锁
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Credential')} draggable>
                            证件审查
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Profile')} draggable>
                            用户信息校验
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'White')} draggable>
                            白名单控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Black')} draggable>
                            黑名单控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Region')} draggable>
                            地域控制
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Tag')} draggable>
                            用户标签
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'Log')} draggable>
                            日志录入
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'InterestRate')} draggable>
                            利息计算
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1.5 }}>
                        <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                            Output Node
                        </div>
                    </Grid>
                </PerfectScrollbar>
            </Box>
            <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'absolute', left: '92.5%', top: '86%' }}>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <Check onClick={onSave} />
            </Fab>
        </Grid>
    );
}
Sidebar.propTypes = {
    onSave: PropTypes.func,
    onRestore: PropTypes.func
};
