import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function MessageBubble({ text }) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseEnter = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    };

    return (
        <Paper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            elevation={isMouseOver ? 3 : 1}
            sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                color: 'text.primary'
            }}
        >
            <Typography maxWidth="500px">{text}</Typography>
            {/* <Typography fontSize={8} align="right" sx={{ opacity: '70%', userSelect: 'none' }}> */}
            {/*    {formatTime(props.msgTime)} */}
            {/* </Typography> */}
        </Paper>
    );
}
