import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Backdrop, IconButton } from '@mui/material';
import { ZoomIn } from '@mui/icons-material';

// eslint-disable-next-line react/prop-types
export default function MessageBubble({ text }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [open, setOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    };

    const handleOpenImg = () => {
        setOpen(true);
    };

    const handleCloseImg = () => {
        setOpen(false);
    };

    return (
        <>
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
                {/* eslint-disable-next-line jsx-a11y/alt-text,react/prop-types */}
                {text.indexOf('base64') === -1 ? (
                    <Typography maxWidth="500px">{text}</Typography>
                ) : (
                    <>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                        <img src={text} loading="lazy" alt="" width="350" />
                        <IconButton onClick={() => handleOpenImg()} sx={{ position: 'absolute', right: '19%', bottom: '5%', zIndex: 9999 }}>
                            <ZoomIn />
                        </IconButton>
                    </>
                )}
            </Paper>

            <Backdrop open={open} onClick={() => handleCloseImg()} sx={{ zIndex: 9999 }}>
                <img src={text} loading="lazy" alt="" width="700" height="100%" />
            </Backdrop>
        </>
    );
}
