import * as React from 'react';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControllableStates from './ControllableStates';
import PropTypes from 'prop-types';
import { EntityApi } from '../../../api/restful';
import { Grid, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

// eslint-disable-next-line react/prop-types
export default function CardWorkFlow({ setFid, initName, updateLookInstance, onlyOpenLook }) {
    const [workFlowAll, setWorkFlowAll] = React.useState([]);
    const [workFlowName, setWorkFlowName] = React.useState([]);
    const [flow, setFlow] = React.useState([]);
    function saveId(value) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < workFlowAll.length; i++) {
            if (workFlowAll[i].name === value) {
                // console.log(workFlowAll[i].fid);
                setFid(workFlowAll[i].fid);
                setFlow(JSON.parse(workFlowAll[i].flow));
            }
        }
    }
    function show() {
        console.log(flow);
        updateLookInstance(flow);
        onlyOpenLook();
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        const queue = [];
        entityApi.getWorkFlows().then((re) => {
            if (re.status === 200) {
                setWorkFlowAll(re.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < re.data.length; i++) {
                    queue.push(re.data[i].name);
                }
                setWorkFlowName(queue);
            }
        });
    }, []);
    return (
        // <Box sx={{ minWidth: 30 }}>
        //     <Card variant="outlined">
        //         <CardContent>
        //             <Box sx={{ marginLeft: 8 }}>
        //                 <Typography variant="h5" component="div">
        //                     编排模板
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ marginTop: 1.5, width: 180 }}>
        //                 {/* eslint-disable-next-line react/jsx-no-bind */}
        //                 <ControllableStates value={workFlowName} saveId={saveId} name={initName} />
        //             </Box>
        //         </CardContent>
        //     </Card>
        // </Box>
        <div align="center">
            {/* <Card variant="outlined"> */}
            {/*    <CardContent> */}
            {/*        <Box sx={{ marginLeft: 8.5 }}> */}
            <Grid container>
                <Grid item xs={6} sx={{ ml: 6 }}>
                    <Typography variant="h6" component="div">
                        编排模板
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="delete" onClick={() => show()}>
                        <Search fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
            {/* </Box> */}
            <Box sx={{ width: 180 }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <ControllableStates value={workFlowName} saveId={saveId} name={initName} />
            </Box>
            {/*    </CardContent> */}
            {/* </Card> */}
        </div>
    );
}

CardWorkFlow.protoTypes = {
    setFid: PropTypes.func.isRequired,
    initName: PropTypes.string,
    updateLookInstance: PropTypes.func,
    onlyOpenLook: PropTypes.func
};
