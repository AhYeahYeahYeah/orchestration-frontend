import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { ConductorApi, EntityApi } from '../../api/restful';
// import Skeleton from '@mui/material/Skeleton';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [dayNum, setDayNum] = useState([]);
    const [workFlowNum, setWorkFlowNum] = useState([]);
    useEffect(() => {
        const entity = new EntityApi(localStorage.getItem('admin_token'));
        const conductor = new ConductorApi();
        const workFlow = new Map();
        let dateTime = new Date();
        dateTime = dateTime.setDate(dateTime.getDate());
        dateTime = new Date(dateTime).toLocaleDateString();
        dateTime = new Date(dateTime).getTime();
        // console.log(dateTime);
        entity.getOrdersRecent().then((res) => {
            // console.log(res.data);
            const queue = [];
            // eslint-disable-next-line camelcase
            const day_num = [0, 0, 0, 0, 0, 0, 0];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].orderDate >= dateTime) {
                    // eslint-disable-next-line no-plusplus
                    day_num[0]++;
                } else if (res.data[i].orderDate >= dateTime - 1 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[1]++;
                } else if (res.data[i].orderDate >= dateTime - 2 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[2]++;
                } else if (res.data[i].orderDate >= dateTime - 3 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[3]++;
                } else if (res.data[i].orderDate >= dateTime - 4 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[4]++;
                } else if (res.data[i].orderDate >= dateTime - 5 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[5]++;
                } else if (res.data[i].orderDate >= dateTime - 6 * 86400000) {
                    // eslint-disable-next-line no-plusplus
                    day_num[6]++;
                }
                queue.push(conductor.getByWorkFlowId(res.data[i].workflowId));
            }
            // console.log(day_num[0]);
            // console.log(day_num);
            setDayNum(day_num.reverse());
            Promise.all(queue).then((re) => {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < re.length; i++) {
                    // console.log(re[i].data.workflowName);
                    if (workFlow.has(re[i].data.workflowName)) {
                        const x = workFlow.get(re[i].data.workflowName);
                        workFlow.set(re[i].data.workflowName, x + 1);
                    } else {
                        workFlow.set(re[i].data.workflowName, 1);
                    }
                }
                let resultArr = Array.from(workFlow);
                // console.log(resultArr.sort((a, b) => b[1] - a[1]));
                resultArr = resultArr.sort((a, b) => b[1] - a[1]);
                resultArr = resultArr.slice(0, 5);
                setWorkFlowNum(resultArr);
                setLoading(false);
            });
        });
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}> */}
                    {/*    <Grid container spacing={gridSpacing}> */}
                    {/*        <Grid item sm={6} xs={12} md={6} lg={12}> */}
                    {/*            <TotalIncomeDarkCard isLoading={isLoading} /> */}
                    {/*        </Grid> */}
                    {/*        <Grid item sm={6} xs={12} md={6} lg={12}> */}
                    {/*            <TotalIncomeLightCard isLoading={isLoading} /> */}
                    {/*        </Grid> */}
                    {/*    </Grid> */}
                    {/* </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} dayNum={dayNum} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} workFlowNum={workFlowNum} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
