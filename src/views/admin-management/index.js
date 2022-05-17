import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Pagination, Slide, Chip, Snackbar, Alert } from '@mui/material';
// import Typography from '@mui/material/Typography';
import { EntityApi } from '../../api/restful';
import { Update } from '@mui/icons-material';
import MainCard from '../../ui-component/cards/MainCard';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function AdminManagement() {
    const theme = useTheme();
    const [adminInfo, setAdminInfo] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    const handleEditRowsModelChange = (model) => {
        setEditRowsModel(model);
        // const entityApi = new EntityApi(localStorage.getItem('admin_token'));
    };
    const columns = [
        { field: 'account', headerName: '用户账户', editable: true, flex: 1, minWidth: 120 },
        { field: 'aname', headerName: '真实姓名', editable: true, flex: 1, minWidth: 120 },
        { field: 'service', headerName: '服务编排', type: 'boolean', editable: true, flex: 0.3, minWidth: 120 },
        { field: 'customerManage', headerName: '客户管理', type: 'boolean', editable: true, flex: 0.3, minWidth: 120 },
        { field: 'adminManage', headerName: '管理员管理', type: 'boolean', editable: true, flex: 0.3, minWidth: 120 },
        { field: 'productManage', headerName: '产品管理', type: 'boolean', editable: true, flex: 0.3, minWidth: 120 },
        { field: 'groupManage', headerName: '用户组管理', type: 'boolean', editable: true, flex: 0.3, minWidth: 120 }
        // { field: 'All', headerName: '全部', type: 'boolean', flex: 0.3, editable: true, minWidth: 120 }
    ];

    function updateAdmin() {
        let id = null;
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const key in editRowsModel) {
            id = key;
            break;
        }
        const queue = [];
        if (
            editRowsModel[id].service.value === true &&
            editRowsModel[id].customerManage.value === true &&
            editRowsModel[id].adminManage.value === true &&
            editRowsModel[id].productManage.value === true &&
            editRowsModel[id].groupManage.value === true
        ) {
            queue.push(0);
        } else {
            if (editRowsModel[id].service.value === true) queue.push(1);
            if (editRowsModel[id].customerManage.value === true) queue.push(2);
            if (editRowsModel[id].adminManage.value === true) queue.push(3);
            if (editRowsModel[id].productManage.value === true) queue.push(4);
            if (editRowsModel[id].groupManage.value === true) queue.push(5);
        }
        const admin = {
            aid: id,
            permissions: `[${queue.toString()}]`
        };
        console.log(admin);
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.updateAdmin(admin).then((res) => {
            console.log(res);
        });
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi
            .getAdmins()
            .then((res) => {
                if (res.status === 200) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].aid;
                        res.data[i].service = false;
                        res.data[i].customerManage = false;
                        res.data[i].adminManage = false;
                        res.data[i].productManage = false;
                        res.data[i].groupManage = false;
                        if (res.data[i].permissions.indexOf('0') !== -1) {
                            res.data[i].service = true;
                            res.data[i].customerManage = true;
                            res.data[i].adminManage = true;
                            res.data[i].productManage = true;
                            res.data[i].groupManage = true;
                        }
                        if (res.data[i].permissions.indexOf('1') !== -1) res.data[i].service = true;
                        if (res.data[i].permissions.indexOf('2') !== -1) res.data[i].customerManage = true;
                        if (res.data[i].permissions.indexOf('3') !== -1) res.data[i].adminManage = true;
                        if (res.data[i].permissions.indexOf('4') !== -1) res.data[i].productManage = true;
                        if (res.data[i].permissions.indexOf('5') !== -1) res.data[i].groupManage = true;
                    }
                    setAdminInfo(res.data);
                    // console.log(customerInfo);
                }
            })
            .catch(() => {
                setSnackbarMsg('您无权限查看！');
                setSnackbarOpen(true);
            });
    }, []);
    return (
        <MainCard title="管理员信息">
            {/* <Typography component="h1" variant="h3" align="center"> */}
            {/*    管理员信息 */}
            {/* </Typography> */}
            <div style={{ marginTop: 10, height: `calc(100vh - 285px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={adminInfo}
                    columns={columns}
                    // pageSize={5}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    editMode="row"
                    components={{
                        Pagination: CustomPagination,
                        Toolbar: GridToolbar
                    }}
                />
            </div>
            <Slide direction="up" in={JSON.stringify(editRowsModel) !== '{}'} mountOnEnter unmountOnExit>
                <Chip
                    sx={{ position: 'fixed', marginTop: 3.5, right: '3.7%', background: '#ff9800' }}
                    label="确定更改"
                    /* eslint-disable-next-line react/jsx-no-bind  */
                    onClick={updateAdmin}
                    icon={<Update />}
                    variant="outlined"
                />
            </Slide>
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
