import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ControllableStates from './ControllableStates';

const card = (
    <>
        <CardContent>
            <Box sx={{ marginLeft: 8.5 }}>
                <Typography variant="h5" component="div">
                    黑名单
                </Typography>
            </Box>
            <Box sx={{ marginTop: 1.5, width: 180 }}>
                <ControllableStates />
            </Box>
        </CardContent>
    </>
);

export default function CardBlack() {
    return (
        <Box sx={{ minWidth: 30 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
