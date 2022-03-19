import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EntityApi } from '../../api/restful';

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return <Pagination color="primary" count={pageCount} page={page + 1} onChange={(event, value) => apiRef.current.setPage(value - 1)} />;
}

export default function LogManagement() {
    const theme = useTheme();
    const [logInfo, setLogInfo] = React.useState([]);
    const columns = [
        { field: 'oid', headerName: '订单号', flex: 1.1, minWidth: 120 },
        { field: 'description', headerName: '日志描述', flex: 4, minWidth: 200 }
    ];
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.getLogs().then((res) => {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].id = res.data[i].lid;
            }
            setLogInfo(res.data);
        });
    }, []);
    return (
        <div>
            <Typography component="h1" variant="h3" align="center">
                日志管理
            </Typography>
            <div style={{ marginTop: 10, height: `calc(100vh - 180px)`, width: '100%', background: theme.palette.background.default }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={logInfo}
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
