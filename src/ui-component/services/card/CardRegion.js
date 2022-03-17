import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RegionCheck from './RegionCheck';
import PropTypes from 'prop-types';
// import ControllableStates from './ControllableStates';
// import * as React from 'react';

// eslint-disable-next-line react/prop-types
export default function CardRegion({ setRegions, initRegion }) {
    return (
        // <Box sx={{ minWidth: 30 }}>
        //     <Card variant="outlined">
        //         <CardContent>
        //             <Box sx={{ marginLeft: 8 }}>
        //                 <Typography variant="h5" component="div">
        //                     地域选择
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ marginTop: 1.5, width: 180 }}>
        //                 <RegionCheck setRegions={setRegions} initRegion={initRegion} />
        //             </Box>
        //         </CardContent>
        //     </Card>
        // </Box>
        <div align="center">
            {/* <Card variant="outlined"> */}
            {/*    <CardContent> */}
            {/*        <Box sx={{ marginLeft: 8.5 }}> */}
            <Typography variant="h6" component="div">
                地域选择
            </Typography>
            {/* </Box> */}
            <Box sx={{ marginTop: 1.5, width: 180 }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <RegionCheck setRegions={setRegions} initRegion={initRegion} />
            </Box>
            {/*    </CardContent> */}
            {/* </Card> */}
        </div>
    );
}
CardRegion.protoTypes = {
    setRegions: PropTypes.func,
    initRegion: PropTypes.array
};
