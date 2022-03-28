import { useEffect, useRef, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, ButtonBase, Grid, List, ListItem, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Send, SupportAgent } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import Typography from '@mui/material/Typography';
import { RobotApi } from '../../../../api/restful';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const messagesEndRef = useRef(null);
    const [open, setOpen] = useState(false);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToggle = () => {
        setOpen(true);
    };

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const handleClose = () => {
        setOpen(false);
    };
    function handleTextChange(e) {
        setText((text) => {
            text = e.target.value;
            // if (text === null || text.trim() === '') setDisable(true);
            // else setDisable(false);
            return text;
        });
    }
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    function CallBackMsg(value) {
        setMessages((messages) => [...messages, { text: value, flag: false }]);
    }
    // eslint-disable-next-line consistent-return
    function sendMessage() {
        if (text === null || text.trim() === '') return undefined;
        // ChatAPI.sendMessage(props.friendID, text);
        setMessages((messages) => [...messages, { text, flag: true }]);
        const data = {
            version: '3.0',
            service_id: 'S66616',
            skill_ids: ['1143781'],
            session_id: '',
            log_id: '7758521',
            request: { terminal_id: '88888', query: `${text}` }
        };
        const robotApi = new RobotApi();
        robotApi.sendMsg(data).then((res) => {
            // console.log(res);
            if (res.data.result.responses[0].actions[0].type === 'failure') CallBackMsg(res.data.result.responses[0].actions[0].say);
            else CallBackMsg(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word);
            scrollToBottom();
        });
    }

    function handleSendBtnClicked() {
        // setLoading(false);
        sendMessage();
        setText('');
    }
    useEffect(() => {
        if (open) {
            setMessages((messages) => [...messages, { text: '请问需要什么帮助呢', flag: false }]);
        }
    }, [open]);
    useEffect(() => {
        if (open) {
            sleep(500).then(() => {
                // 这里写sleep之后需要去做的事情
                if (messages.length !== 0 && open) scrollToBottom();
            });
        }
    }, [messages.length, open]);
    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.primary.dark,
                            color: theme.palette.primary.light,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.primary.light,
                                color: theme.palette.primary.dark
                            }
                        }}
                        // ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={() => handleToggle()}
                        color="inherit"
                    >
                        <SupportAgent stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography size="2.8rem">智能机器人</Typography>
                </DialogTitle>
                <DialogContent sx={{ position: 'flex', height: 600, background: '#eeeeee' }}>
                    <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {messages.map((msg, index) => (
                            <ListItem key={index} sx={{ justifyContent: !msg.flag ? 'flex-start' : 'flex-end' }}>
                                {msg.flag ? (
                                    ''
                                ) : (
                                    <Avatar>
                                        <SupportAgent />
                                    </Avatar>
                                )}
                                <Box sx={{ m: 1.5 }}>
                                    <MessageBubble isFriend text={msg.text} />
                                </Box>
                                {msg.flag ? <Avatar src={JSON.parse(localStorage.getItem('admin')).avatar} /> : ''}
                            </ListItem>
                        ))}
                        <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
                    </List>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={1.5}>
                        <Grid item xs={9}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="请输入信息"
                                fullWidth
                                /* eslint-disable-next-line react/jsx-no-bind */
                                onChange={handleTextChange}
                                value={text}
                                sx={{ flexGrow: 1, margin: 1 }}
                                onKeyDownCapture={(event) => {
                                    if (event.keyCode === 13) {
                                        handleSendBtnClicked();
                                    }
                                }}
                            />
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                        </Grid>
                        <Grid item xs={3} sx={{ mt: 1 }}>
                            <Button
                                // disabled={disable}
                                startIcon={<Send />}
                                variant="outlined"
                                onClick={() => handleSendBtnClicked()}
                                sx={{ margin: 1 }}
                            >
                                发送
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 65 }}>
                            <Button onClick={() => handleClose()}>关闭</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NotificationSection;
