import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
    <>
        <CardContent>
            <Typography variant="h5" component="div">
                日 志 录 入
            </Typography>
        </CardContent>
    </>
);

export default function CardLog() {
    return (
        <Box sx={{ minWidth: 30 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
