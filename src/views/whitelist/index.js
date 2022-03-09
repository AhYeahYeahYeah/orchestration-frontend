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

export default function Whitelist() {
    const [whitelist, setWhitelist] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [whitelistSingle, setWhitelistSingle] = React.useState({});
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
        setWhitelistSingle(value);
        setSelectionUser(value.users);
        setUpdateOpen(true);
    };

    const updateHandleClose = () => {
        setUpdateOpen(false);
    };
    const columns = [
        { field: 'name', headerName: '模板名字', flex: 1, minWidth: 250 },
        { field: 'description', headerName: '模板描述', flex: 2.3, minWidth: 580 },
        {
            field: 'actions',
            type: 'actions',
            flex: 0.65,
            minWidth: 150,
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

    function saveWhiteList(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.addWhitelist(value).then((res) => {
            if (res.status === 200) {
                entityApi.getWhitelists().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].wid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setWhitelist(res.data);
                });
            }
        });
    }
    function updateWhiteList(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.updateWhitelist(value).then((res) => {
            if (res.status === 200) {
                entityApi.getWhitelists().then((res) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].wid;
                        res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    }
                    setWhitelist(res.data);
                });
            }
        });
    }
    function deleteWhite() {
        const queue = [];
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < selectionModel.length; i++) {
            queue.push(entityApi.deleteWhitelist(selectionModel[i]));
        }
        Promise.all(queue)
            .then((res) => {
                if (res) {
                    entityApi.getWhitelists().then((res) => {
                        if (res.status === 200) {
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].id = res.data[i].wid;
                                res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                                // console.log(res.data[i]);
                            }
                            setWhitelist(res.data);
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
        entityApi.getWhitelists().then((res) => {
            if (res.status === 200) {
                // console.log(res.data);
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].id = res.data[i].wid;
                    res.data[i].users = res.data[i].users.substring(1, res.data[i].users.length - 1).split(',');
                    // console.log(res.data[i]);
                }
                setWhitelist(res.data);
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
                白名单模板
            </Typography>
            <div style={{ marginTop: 10, height: `calc(100vh - 220px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={whitelist}
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
                save={saveWhiteList}
            />
            <UpdateDialog
                open={updateOpen}
                handleClose={updateHandleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                update={updateWhiteList}
                whitelistSingle={whitelistSingle}
                selectionUser={selectionUser}
                setSelectionUser={setSelectionUser}
            />
            <Slide direction="up" in={selectionModel.length > 0} mountOnEnter unmountOnExit>
                <Chip
                    sx={{ position: 'fixed', marginTop: 5 }}
                    label={`${selectionModel.length} row selected`}
                    /* eslint-disable-next-line react/jsx-no-bind  */
                    onDelete={deleteWhite}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                />
            </Slide>
        </div>
    );
}
