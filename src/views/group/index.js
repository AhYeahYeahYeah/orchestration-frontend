import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    gridPageCountSelector,
    gridPageSelector,
    GridToolbar,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Chip, Fab, Slide, Pagination } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { EntityApi } from '../../api/restful';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDialog from './AddDialog';
import UpdateDialog from './UpdateDialog';
import Typography from '@mui/material/Typography';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function Group() {
    const [grouplist, setGrouplist] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [grouplistSingle, setGrouplistSingle] = React.useState({});
    const [selectionUser, setSelectionUser] = React.useState([]);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [updateOpen, setUpdateOpen] = React.useState(false);

    const updateHandleOpen = (value) => {
        setGrouplistSingle(value);
        setSelectionUser(value.users);
        setUpdateOpen(true);
    };

    const updateHandleClose = () => {
        setUpdateOpen(false);
    };
    const columns = [
        { field: 'name', headerName: '用户组标签', width: 250 },
        { field: 'description', headerName: '用户组描述', width: 580 },
        {
            field: 'actions',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Toggle Admin"
                    onClick={() => {
                        updateHandleOpen(params.row);
                    }}
                />
            ]
        }
    ];

    function saveGroupList(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.addUserGroup(value).then((res) => {
            if (res.status === 200) {
                entityApi.getUserGroups().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].gid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setGrouplist(res.data);
                });
            }
        });
    }
    function updateGroupList(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.updateUserGroup(value).then((res) => {
            if (res.status === 200) {
                entityApi.getUserGroups().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].gid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setGrouplist(res.data);
                });
            }
        });
    }
    function deleteGroup() {
        const queue = [];
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < selectionModel.length; i++) {
            queue.push(entityApi.deleteUserGroup(selectionModel[i]));
        }
        Promise.all(queue)
            .then((res) => {
                if (res) {
                    entityApi.getUserGroups().then((res) => {
                        if (res.status === 200) {
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].id = res.data[i].gid;
                                res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                                // console.log(res.data[i]);
                            }
                            setGrouplist(res.data);
                        }
                    });
                }
            })
            .catch((reason) => {
                console.log(`处理失败的 promise (${reason})`);
            });
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.getUserGroups().then((res) => {
            if (res.status === 200) {
                // console.log(res.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].id = res.data[i].gid;
                    res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    // console.log(res.data[i]);
                }
                setGrouplist(res.data);
                // console.log(customer);
            }
        });
    }, []);
    return (
        <div>
            {/* <Grid container xs={12} > */}
            {/*    <Grid md={6.9}xs={12}  > */}
            {/*        <ComboBox/> */}
            {/*    </Grid> */}
            {/*    <Grid md={5.1} xs={12} sx={{position:'absolute',right:"2.8%"}}> */}
            {/*        <SearchSection/> */}
            {/*    </Grid> */}
            {/* </Grid> */}
            <Typography component="h1" variant="h3" align="center">
                用户组分类
            </Typography>
            <div style={{ marginTop: 10, height: `calc(100vh - 220px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={grouplist}
                    columns={columns}
                    // pageSize={5}
                    components={{
                        Pagination: CustomPagination,
                        Toolbar: GridToolbar
                    }}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>
            <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'absolute', left: '92.5%', top: '88%' }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <Add onClick={() => handleOpen()} />
            </Fab>
            <AddDialog
                open={open}
                handleClose={handleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                save={saveGroupList}
            />
            <UpdateDialog
                open={updateOpen}
                handleClose={updateHandleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                update={updateGroupList}
                grouplistSingle={grouplistSingle}
                selectionUser={selectionUser}
                setSelectionUser={setSelectionUser}
            />
            <Slide direction="up" in={selectionModel.length > 0} mountOnEnter unmountOnExit>
                <Chip
                    sx={{ position: 'fixed', marginTop: 5 }}
                    label={`${selectionModel.length} row selected`}
                    /* eslint-disable-next-line react/jsx-no-bind  */
                    onDelete={deleteGroup}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                />
            </Slide>
        </div>
    );
}
