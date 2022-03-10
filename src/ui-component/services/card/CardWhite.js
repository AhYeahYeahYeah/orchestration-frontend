import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControllableStates from './ControllableStates';
import PropTypes from 'prop-types';
import { EntityApi } from '../../../api/restful';

// eslint-disable-next-line react/prop-types
export default function CardWhite({ setWid, initName }) {
    const [whiteAll, setWhiteAll] = React.useState([]);
    const [whiteName, setWhiteName] = React.useState([]);
    function saveId(value) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < whiteAll.length; i++) {
            if (whiteAll[i].name === value) {
                setWid(whiteAll[i].wid);
            }
        }
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        const queue = [];
        entityApi.getWhitelists().then((re) => {
            if (re.status === 200) {
                setWhiteAll(re.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < re.data.length; i++) {
                    queue.push(re.data[i].name);
                }
                setWhiteName(queue);
            }
        });
    }, []);
    return (
        <Box sx={{ minWidth: 30 }}>
            <Card variant="outlined">
                <CardContent>
                    <Box sx={{ marginLeft: 8.5 }}>
                        <Typography variant="h5" component="div">
                            白名单
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 1.5, width: 180 }}>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <ControllableStates value={whiteName} saveId={saveId} name={initName} />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

CardWhite.protoTypes = {
    setWid: PropTypes.func.isRequired,
    initName: PropTypes.string
};
