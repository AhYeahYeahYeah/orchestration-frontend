import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
// import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
// import chartData from './chart-data/total-growth-bar-chart';

// const status = [
//     {
//         value: 'today',
//         label: 'Today'
//     },
//     {
//         value: 'month',
//         label: 'This Month'
//     },
//     {
//         value: 'year',
//         label: 'This Year'
//     }
// ];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, dayNum }) => {
    // const [value, setValue] = useState('today');
    const theme = useTheme();
    // const customization = useSelector((state) => state.customization);

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const [dayCount, setDayCount] = useState(0);
    const chartData = {
        height: 243,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart'
            },
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%'
                }
            },
            xaxis: {
                type: 'category',
                categories: [
                    `${new Date(new Date() - 6 * 86400000).toLocaleDateString()}`,
                    `${new Date(new Date() - 5 * 86400000).toLocaleDateString()}`,
                    `${new Date(new Date() - 4 * 86400000).toLocaleDateString()}`,
                    `${new Date(new Date() - 3 * 86400000).toLocaleDateString()}`,
                    `${new Date(new Date() - 2 * 86400000).toLocaleDateString()}`,
                    `${new Date(new Date() - 1 * 86400000).toLocaleDateString()}`,
                    `${new Date().toLocaleDateString()}`
                ]
            }
        },
        series: [
            {
                name: '执行次数',
                data: dayNum
            }
        ]
    };

    useEffect(() => {
        console.log(dayNum);
        let sum = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < dayNum.length; i++) {
            sum += dayNum[i];
        }
        setDayCount(sum);
    }, [dayNum]);
    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">近一周执行总数</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">{dayCount} 次</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item> */}
                                {/*    <TextField */}
                                {/*        id="standard-select-currency" */}
                                {/*        select */}
                                {/*        value={value} */}
                                {/*        onChange={(e) => setValue(e.target.value)} */}
                                {/*    > */}
                                {/*        {status.map((option) => ( */}
                                {/*            <MenuItem key={option.value} value={option.value}> */}
                                {/*                {option.label} */}
                                {/*            </MenuItem> */}
                                {/*        ))} */}
                                {/*    </TextField> */}
                                {/* </Grid> */}
                                <Grid item xs={12}>
                                    <Chart {...chartData} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool,
    dayNum: PropTypes.array
};

export default TotalGrowthBarChart;
