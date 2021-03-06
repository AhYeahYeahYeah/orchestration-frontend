import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControllableStates from './ControllableStates';
import * as React from 'react';
import { EntityApi } from '../../../api/restful';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function CardBlack({ setBid, initName }) {
    const [blackAll, setBlackAll] = React.useState([]);
    const [blackName, setBlackName] = React.useState([]);
    function saveId(value) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < blackAll.length; i++) {
            if (blackAll[i].name === value) {
                setBid(blackAll[i].bid);
            }
        }
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        const queue = [];
        entityApi.getBlacklists().then((re) => {
            if (re.status === 200) {
                setBlackAll(re.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < re.data.length; i++) {
                    queue.push(re.data[i].name);
                }
                setBlackName(queue);
            }
        });
    }, []);
    return (
        <div align="center">
            {/* <Card variant="outlined"> */}
            {/*    <CardContent> */}
            {/*        <Box sx={{ marginLeft: 8.5 }}> */}
            <Typography variant="h6" component="div">
                黑名单
            </Typography>
            {/* </Box> */}
            <Box sx={{ marginTop: 1.5, width: 180 }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <ControllableStates value={blackName} saveId={saveId} name={initName} />
            </Box>
            {/*    </CardContent> */}
            {/* </Card> */}
        </div>
    );
}

CardBlack.protoTypes = {
    setBid: PropTypes.func,
    initName: PropTypes.string
};
