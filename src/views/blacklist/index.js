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

export default function Blacklist() {
    const [blacklist, setBlacklist] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [blacklistSingle, setBlacklistSingle] = React.useState({});
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
        setBlacklistSingle(value);
        setSelectionUser(value.users);
        setUpdateOpen(true);
    };

    const updateHandleClose = () => {
        setUpdateOpen(false);
    };
    const columns = [
        { field: 'name', headerName: '模板名字', width: 250 },
        { field: 'description', headerName: '模板描述', width: 580 },
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

    function saveBlackList(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.addBlacklist(value).then((res) => {
            if (res.status === 200) {
                entityApi.getBlacklists().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].bid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setBlacklist(res.data);
                });
            }
        });
    }
    function updateBlackList(value) {
        // console.log(value);
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.updateBlacklist(value).then((res) => {
            if (res.status === 200) {
                // console.log(res);
                entityApi.getBlacklists().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].bid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setBlacklist(res.data);
                });
            }
        });
    }
    function deleteBlack() {
        const queue = [];
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < selectionModel.length; i++) {
            queue.push(entityApi.deleteBlacklist(selectionModel[i]));
        }
        Promise.all(queue)
            .then((res) => {
                if (res) {
                    entityApi.getBlacklists().then((res) => {
                        if (res.status === 200) {
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].id = res.data[i].bid;
                                res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                                // console.log(res.data[i]);
                            }
                            setBlacklist(res.data);
                            // console.log(blacklist);
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
        entityApi.getBlacklists().then((res) => {
            if (res.status === 200) {
                // console.log(res.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].id = res.data[i].bid;
                    res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    // console.log(res.data[i]);
                }
                setBlacklist(res.data);
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
                黑名单模板
            </Typography>
            <div style={{ marginTop: 10, height: `calc(100vh - 220px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={blacklist}
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
                save={saveBlackList}
            />
            <UpdateDialog
                open={updateOpen}
                handleClose={updateHandleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                update={updateBlackList}
                blacklistSingle={blacklistSingle}
                selectionUser={selectionUser}
                setSelectionUser={setSelectionUser}
            />
            <Slide direction="up" in={selectionModel.length > 0} mountOnEnter unmountOnExit>
                <Chip
                    sx={{ position: 'fixed', marginTop: 5 }}
                    label={`${selectionModel.length} row selected`}
                    /* eslint-disable-next-line react/jsx-no-bind  */
                    onDelete={deleteBlack}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                />
            </Slide>
        </div>
    );
}
