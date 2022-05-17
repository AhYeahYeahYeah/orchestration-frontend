import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Alert, Pagination, Snackbar } from '@mui/material';
// import Typography from '@mui/material/Typography';
import { EntityApi } from '../../api/restful';
import MainCard from '../../ui-component/cards/MainCard';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function CustomerManagement() {
    const theme = useTheme();
    const [customerInfo, setCustomerInfo] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    const columns = [
        { field: 'account', headerName: '用户账户', flex: 1, minWidth: 120 },
        { field: 'cname', headerName: '真实姓名', flex: 1, minWidth: 120 },
        { field: 'sid', headerName: '身份证号', flex: 1.6, minWidth: 200 },
        { field: 'birthday', type: 'date', headerName: '出生日期', flex: 1, minWidth: 120 },
        { field: 'phoneNum', headerName: '电话号码', flex: 1.2, minWidth: 150 },
        { field: 'address', headerName: '地址', flex: 1.2, minWidth: 150 },
        { field: 'cardNum', headerName: '银行卡号', flex: 1.6, minWidth: 200 }
    ];
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi
            .getCustomers()
            .then((res) => {
                if (res.status === 200) {
                    const queue = [];
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].id = res.data[i].cid;
                        // console.log(res.data[i]);
                        queue.push(entityApi.getCustomerProfile(res.data[i].cid));
                    }
                    Promise.all(queue)
                        .then((re) => {
                            // console.log(re);
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.length; i++) {
                                res.data[i].sid = re[i].data[0].sid;
                                res.data[i].birthday = re[i].data[0].birthday;
                                res.data[i].phoneNum = re[i].data[0].phoneNum;
                                res.data[i].address = re[i].data[0].address;
                                res.data[i].cardNum = re[i].data[0].cardNum;
                            }
                            // console.log(res.data);
                            setCustomerInfo(res.data);
                        })
                        .catch((reason) => {
                            console.log(reason);
                        });

                    // console.log(customerInfo);
                }
            })
            .catch(() => {
                setSnackbarMsg('您无权限查看！');
                setSnackbarOpen(true);
            });
    }, []);
    return (
        <MainCard title="客户信息">
            {/* <Typography component="h1" variant="h3" align="center"> */}
            {/*    客户信息 */}
            {/* </Typography> */}
            <div style={{ marginTop: 10, height: `calc(100vh - 265px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={customerInfo}
                    columns={columns}
                    // pageSize={5}
                    components={{
                        Pagination: CustomPagination,
                        Toolbar: GridToolbar
                    }}
                />
            </div>
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
