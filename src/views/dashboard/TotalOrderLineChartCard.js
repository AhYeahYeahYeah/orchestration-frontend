import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Dialog, Grid, Typography } from '@mui/material';

// third-party
// import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { EntityApi } from '../../api/restful';
import { ColorLens, Search } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
    const theme = useTheme();
    const [count, setCount] = useState(0);
    // const [timeValue, setTimeValue] = useState(false);
    // const handleChangeTime = (event, newValue) => {
    //     setTimeValue(newValue);
    // };
    const [workFlow, setWorkFlow] = useState([]);
    const [open, setOpen] = useState(false);
    const columns = [
        { field: 'name', headerName: '流程名', flex: 0.2, minWidth: 100 },
        { field: 'description', headerName: '流程描述', flex: 1, minWidth: 170 },
        { field: 'account', headerName: '发布人账户', flex: 0.2, minWidth: 100 },
        {
            field: 'actions',
            headerName: '查看',
            type: 'actions',
            flex: 0.1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Search />}
                    onClick={() => {
                        console.log(params);
                        window.open(`http://conductor.rinne.top:5000/workflowDef/${params.row.name}`);
                    }}
                />
            ]
        }
    ];
    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {
        const entity = new EntityApi(localStorage.getItem('admin_token'));
        entity.getWorkFlowListsToDas().then((res) => {
            setCount(res.data.length);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].id = res.data[i].fid;
            }
            setWorkFlow(res.data);
        });
    }, []);
    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Dialog open={open} fullWidth onClose={handleClose}>
                <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 1 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        编排流程
                    </Typography>
                    <div style={{ marginTop: 5, height: `calc(100vh - 290px)`, width: '100%' }}>
                        <DataGrid
                            // autoHeight
                            autoPageSize
                            rows={workFlow}
                            columns={columns}
                            // pageSize={5}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                </Paper>
            </Dialog>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                            onClick={() => handleOpen()}
                                        >
                                            <ColorLens fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                    {count} 个
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0.66 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: theme.palette.primary[200]
                                            }}
                                        >
                                            编排流程总数
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={6}> */}
                                    {/*    /!*{timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}*!/ */}
                                    {/* </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
