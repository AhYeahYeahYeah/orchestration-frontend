import { useEffect, useRef, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, ButtonBase, Grid, IconButton, List, ListItem, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Mic, Send, SupportAgent } from '@mui/icons-material';
import MessageBubble from './MessageBubble';
import Typography from '@mui/material/Typography';
import { RobotApi, EntityApi } from '../../../../api/restful';
import Recorder from 'js-audio-recorder';
import axios from 'axios';
// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const messagesEndRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [micOpen, setMicOpen] = useState(false);
    const [chunk, setChunk] = useState(null);
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
        setChunk(null);
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
            else if (
                res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word.indexOf('base64') !==
                -1
            ) {
                // console.log(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word);
                const entityApi = new EntityApi(localStorage.getItem('admin_token'));
                entityApi
                    .getFlowImage(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word)
                    .then((res) => {
                        // console.log(res);
                        // console.log(res.data.img);
                        CallBackMsg(res.data.img);
                    });
            } else CallBackMsg(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word);
            scrollToBottom();
        });
    }

    function handleSendBtnClicked() {
        // setLoading(false);
        sendMessage();
        setText('');
    }
    function StartMic() {
        setMicOpen(!micOpen);
        if (!micOpen) {
            const recorder = new Recorder({ sampleRate: 16000 });
            recorder.start().then(
                () => {
                    // 开始录音
                    console.log('开始录音');
                    setChunk(recorder);
                },
                (error) => {
                    // 出错了
                    console.log(`${error.name} : ${error.message}`);
                }
            );
            // const constraints = { audio: true };
            // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            //     const options = {
            //         audioBitsPerSecond: 16000,
            //         // videoBitsPerSecond : 2500000,
            //         // mimeType: 'video/mp4'
            //     };
            //     const mediaRecorder = new MediaRecorder(stream, options);
            //     setMicOpen(mediaRecorder);
            //     mediaRecorder.start(100);
            //     console.log('录音中...');
            //     console.log('录音器状态：', mediaRecorder.state);
            //     // const chunks = [];
            //     mediaRecorder.ondataavailable = (e) => {
            //         // chunks.push(e.data);
            //         console.log(e.data);
            //         setChunk((chunks) => [...chunks, e.data]);
            //     };
            // });
        } else {
            chunk.stop();
            const blob = chunk.getPCMBlob();
            // blob.type = 'audio/wav';
            // blob = new Blob(blob, { type: 'audio/wav' });
            // console.log(blob);
            const file = new File([blob], '123', { type: 'audio/pcm', lastModified: Date.now() });
            // console.log(file);
            // console.log(file.size);
            const reader = new FileReader();
            reader.onload = (evt) => {
                const base64 = evt.target.result;
                // console.log(base64.substring(37));
                const data = {
                    format: 'pcm',
                    rate: 16000,
                    dev_pid: 1537,
                    channel: 1,
                    token: '24.a2d8dbff5a4dd0b30c4aaa96c0c36b70.2592000.1651808174.282335-25898929',
                    cuid: 'baidu_workshop',
                    len: file.size,
                    speech: base64.substring(37)
                };
                axios.post('http://8.141.159.53:12888/http://vop.baidu.com/server_api', data).then((res) => {
                    // console.log(res.data);
                    // console.log(res.data.result[0]);
                    if (res.data.result[0] !== '我不知道。') {
                        setText(res.data.result[0]);
                    }
                });
            };
            reader.readAsDataURL(blob);
            // chunk.downloadPCM('123');
            chunk.destroy().then(() => {
                setChunk(null);
            });
            // const reader = new FileReader();
            // // 取指定的 Blob 或 File 对象，读取操作完成的时候，readyState 会变成已完成DONE
            // reader.readAsDataURL(blob);
            // reader.onload = () => {
            //     // result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容
            //     console.log(reader.result); // reader.result 为 base64 字符串编码
            // };
            // micOpen.stop();
            // micOpen.onstop = () => {
            //     console.log(chunk);
            //     const blob = new Blob(chunk, { type: 'audio/pcm' });
            //     const audioURL = URL.createObjectURL(blob);
            //     // const audio = new Audio(audioURL);
            //     console.log(audioURL);
            //     const reader = new FileReader();
            //     // 取指定的 Blob 或 File 对象，读取操作完成的时候，readyState 会变成已完成DONE
            //     reader.readAsDataURL(blob);
            //     reader.onload = () => {
            //         // result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容
            //         console.log(reader.result); // reader.result 为 base64 字符串编码
            //     };
            //
            //     setChunk([]);
            //     // console.log(audioURL);
            // };
            // console.log('录音器状态：', micOpen.state);
        }
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
                                InputProps={{
                                    endAdornment: (
                                        <IconButton position="end" onClick={() => StartMic()}>
                                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                                            {/* <audio /> */}
                                            <Mic sx={{ color: chunk === null ? '' : 'red' }} />
                                        </IconButton>
                                    )
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
