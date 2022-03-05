import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
    <>
        <CardContent>
            <Typography variant="h5" component="div">
                库 存 锁 定
            </Typography>
        </CardContent>
    </>
);

export default function CardLock() {
    return (
        <Box sx={{ minWidth: 30 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
