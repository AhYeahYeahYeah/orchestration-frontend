import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControllableStates from './ControllableStates';
import * as React from 'react';
import { EntityApi } from '../../../api/restful';
import PropTypes from 'prop-types';
// import RegionCheck from './RegionCheck';

// eslint-disable-next-line react/prop-types
export default function CardTag({ setGid, initName }) {
    const [groupAll, setGroupAll] = React.useState([]);
    const [groupName, setGroupName] = React.useState([]);
    function saveId(value) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < groupAll.length; i++) {
            if (groupAll[i].name === value) {
                setGid(groupAll[i].gid);
            }
        }
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        const queue = [];
        entityApi.getUserGroups().then((re) => {
            if (re.status === 200) {
                setGroupAll(re.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < re.data.length; i++) {
                    queue.push(re.data[i].name);
                }
                setGroupName(queue);
            }
        });
    }, []);

    return (
        // <Box sx={{ minWidth: 30 }}>
        //     <Card variant="outlined">
        //         <CardContent>
        //             <Box sx={{ marginLeft: 8 }}>
        //                 <Typography variant="h5" component="div">
        //                     用户标签
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ marginTop: 1.5, width: 180 }}>
        //                 {/* eslint-disable-next-line react/jsx-no-bind */}
        //                 <ControllableStates value={groupName} saveId={saveId} name={initName} />
        //             </Box>
        //         </CardContent>
        //     </Card>
        // </Box>
        <div align="center">
            {/* <Card variant="outlined"> */}
            {/*    <CardContent> */}
            {/*        <Box sx={{ marginLeft: 8.5 }}> */}
            <Typography variant="h6" component="div">
                用户标签
            </Typography>
            {/* </Box> */}
            <Box sx={{ marginTop: 1.5, width: 180 }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <ControllableStates value={groupName} saveId={saveId} name={initName} />
            </Box>
            {/*    </CardContent> */}
            {/* </Card> */}
        </div>
    );
}
CardTag.protoTypes = {
    setGid: PropTypes.func,
    initName: PropTypes.string
};
