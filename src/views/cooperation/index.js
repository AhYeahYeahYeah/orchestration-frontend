import * as React from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    GridToolbar,
    useGridApiContext,
    useGridSelector,
    GridActionsCellItem
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Alert, DialogActions, DialogContent, Fab, Grid, Pagination, Snackbar, TextField } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import { EntityApi } from '../../api/restful';
import DeleteIcon from '@mui/icons-material/Delete';
import sha1 from 'js-sha1';
import { Add, Edit } from '@mui/icons-material';
import { useState } from 'react';
import AddModel from './AddModel';
import CooperationApi from '../../api/CooperationApi';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteModel from './DeleteModel';
import { useNavigate } from 'react-router-dom';
import MainCard from '../../ui-component/cards/MainCard';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function Cooperation() {
    const theme = useTheme();
    const [addOpen, setAddOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [password, setPassword] = useState('');
    const [PwdOpen, setPwdOpen] = useState(false);
    const [roomParam, setRoomParam] = useState({ name: '123' });
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [roomDelete, setRoomDelete] = useState({});
    const navigate = useNavigate();
    function handleDeleteOpen() {
        setDeleteOpen(true);
    }
    function handleDeleteClose() {
        setDeleteOpen(false);
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    function handlePwdOpen() {
        setPwdOpen(true);
    }
    function handlePwdClose() {
        setPwdOpen(false);
    }
    function handleAddOpen() {
        setAddOpen(true);
    }
    function handleAddClose() {
        setAddOpen(false);
    }
    function joinRoom() {
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            room: {
                id: roomParam.id,
                password: sha1(password)
            }
        };
        // console.log(password);
        CooperationApi.JoinRoom(data);
    }
    const columns = [
        { field: 'sid', headerName: '????????????', flex: 1, minWidth: 120 },
        { field: 'name', headerName: '?????????', flex: 1, minWidth: 120 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '??????',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Delete"
                    onClick={() => {
                        setRoomParam(params);
                        handlePwdOpen();
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => {
                        setRoomDelete(params);
                        handleDeleteOpen();
                    }}
                />
            ]
        }
    ];
    function genID() {
        return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
    }
    function addRoom(value) {
        const CreateData = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            room: {
                id: genID(),
                name: value.name,
                password: sha1(value.password)
            }
        };
        CooperationApi.CreateRoom(CreateData);
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token')
        };
        CooperationApi.QueryRoom(data);
        // sleep(800).then(() => {
        //     const roomData = CooperationApi.roomsData.data.rooms;
        //     // eslint-disable-next-line no-plusplus
        //     for (let i = 0; i < roomData.length; i++) {
        //         // console.log(roomData[i]);
        //         roomData[i].id = roomData[i].sid;
        //     }
        //     setRooms(roomData);
        // });
        handleAddClose();
    }
    function deleteRoom(value) {
        const data = {
            account: JSON.parse(localStorage.getItem('admin')).account,
            token: localStorage.getItem('admin_token'),
            room: {
                id: roomDelete.id,
                password: sha1(value.password)
            }
        };
        CooperationApi.DeleteRoom(data);
        // sleep(800).then(() => {
        //     if (CooperationApi.deleteInfo.result === 'Failed') {
        //
        //     } else {
        //         handleDeleteClose();
        //     }
        // });
    }
    React.useEffect(() => {
        // const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        const admin = JSON.parse(localStorage.getItem('admin'));
        // const cooperationApi = new CooperationApi();
        // setSocketApi(cooperationApi);
        // console.log(localStorage.getItem('admin_token'));
        const data = {
            account: admin.account,
            token: localStorage.getItem('admin_token')
        };
        // CooperationApi.connectionWebServer(admin.account, localStorage.getItem('admin_token'), data);
        CooperationApi.subscribeToRoomData(JSON.parse(localStorage.getItem('admin')).account, (rooms) => {
            console.log(rooms);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < rooms.length; i++) {
                // console.log(roomData[i]);
                rooms[i].id = rooms[i].sid;
            }
            setRooms(rooms);
        });
        CooperationApi.subscribeToDeleteInfo(JSON.parse(localStorage.getItem('admin')).account, (data) => {
            if (data.result === 'Success') {
                const data2 = {
                    account: admin.account,
                    token: localStorage.getItem('admin_token')
                };
                CooperationApi.QueryRoom(data2);
                if (deleteOpen) {
                    handleDeleteClose();
                }
            } else if (deleteOpen) {
                // handleDeleteClose();
                setSnackbarMsg('???????????????');
                setSnackbarOpen(true);
            }
        });
        CooperationApi.subscribeToRoomInstance(JSON.parse(localStorage.getItem('admin')).account, (data) => {
            if (data.result === 'Failed') {
                setSnackbarMsg('???????????????');
                setSnackbarOpen(true);
            } else {
                handlePwdClose();
                localStorage.setItem('roomId', roomParam.id);
                localStorage.setItem('elements', data.msg);
                localStorage.setItem('accountLists', data.accountList);
                navigate('/cooperationFlow');
            }
        });
        CooperationApi.QueryRoom(data);
        // sleep(800).then(() => {
        //     // console.log(CooperationApi.roomsData);
        //     const roomData = CooperationApi.roomsData.data.rooms;
        //     // eslint-disable-next-line no-plusplus
        //     for (let i = 0; i < roomData.length; i++) {
        //         // console.log(roomData[i]);
        //         roomData[i].id = roomData[i].sid;
        //     }
        //     setRooms(roomData);
        // });
        return () => {
            CooperationApi.unsubscribeToRoomData(JSON.parse(localStorage.getItem('admin')).account);
            CooperationApi.unsubscribeToDeleteInfo(JSON.parse(localStorage.getItem('admin')).account);
            CooperationApi.unsubscribeToRoomInstance(JSON.parse(localStorage.getItem('admin')).account);
        };
    }, [deleteOpen, navigate, roomParam]);
    return (
        <MainCard title="??????????????????">
            {/* <Typography component="h1" variant="h3" align="center"> */}
            {/*    ?????????????????? */}
            {/* </Typography> */}
            <div style={{ marginTop: 10, height: `calc(100vh - 265px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={rooms}
                    columns={columns}
                    components={{
                        Pagination: CustomPagination,
                        Toolbar: GridToolbar
                    }}
                    // pageSize={5}
                />
            </div>
            <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'fixed', left: '94%', top: '90%' }}>
                {/* eslint-disable-next-line react/destructuring-assignment,react/jsx-no-bind */}
                <Add onClick={handleAddOpen} />
            </Fab>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <AddModel addRoom={addRoom} addOpen={addOpen} handleAddClose={handleAddClose} />
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <DeleteModel deleteRoom={deleteRoom} deleteOpen={deleteOpen} handleDeleteClose={handleDeleteClose} />
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Dialog open={PwdOpen} onClose={handlePwdClose}>
                <DialogTitle>????????????</DialogTitle>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="??????"
                                name="password"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick={handlePwdClose}>??????</Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick={joinRoom}>??????</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="warning" open={snackbarOpen} onClose={handleSnackbarClose}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </MainCard>
    );
}
