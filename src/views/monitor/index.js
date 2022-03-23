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
import { Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EntityApi } from '../../api/restful';
import { useEffect } from 'react';
import { Policy } from '@mui/icons-material';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function CustomerManagement() {
    const theme = useTheme();
    const [orderInfo, setOrderInfo] = React.useState([]);
    const columns = [
        { field: 'oid', headerName: '订单号', flex: 1, minWidth: 120 },
        { field: 'productName', headerName: '产品名字', flex: 1, minWidth: 120 },
        { field: 'account', headerName: '用户账户', flex: 1.6, minWidth: 200 },
        { field: 'payment', headerName: '金额', flex: 1, minWidth: 120 },
        { field: 'status', headerName: '订单状态', flex: 0.6, minWidth: 150 },
        { field: 'orderDate', headerName: '订单生成时间', flex: 1.2, minWidth: 150 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '监控流程',
            flex: 0.65,
            minWidth: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Policy />}
                    label="Toggle Admin"
                    onClick={() => {
                        // console.log(params);
                        window.open(`http://conductor.rinne.top:5000/execution/${params.row.workflowId}`);
                    }}
                />
            ]
        }
    ];

    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.getOrders().then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].orderDate = new Date(Number(res.data[i].orderDate)).toLocaleString();
                    res.data[i].id = res.data[i].oid;
                    res.data[i].status = res.data[i].status === 1 ? '交易成功' : '交易失败';
                }
                // console.log(res.data);
                setOrderInfo(res.data);
            }
        });
    }, []);
    return (
        <div>
            <Typography component="h1" variant="h3" align="center">
                订 单 执 行 流 程 监 控
            </Typography>
            <div style={{ marginTop: 10, height: `calc(100vh - 180px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={orderInfo}
                    columns={columns}
                    // pageSize={5}
                    components={{
                        Pagination: CustomPagination,
                        Toolbar: GridToolbar
                    }}
                />
            </div>
        </div>
    );
}
