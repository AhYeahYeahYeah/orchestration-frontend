import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
    <div>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
            </Typography>
        </CardContent>
    </div>
);

export default function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 25 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}
