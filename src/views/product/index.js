import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Fab, Grid, Snackbar } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import AddProductModel from './AddProductModel';
import UpdateProductModel from './UpdateProductModel';
import { EntityApi } from '../../api/restful';

const card = (updatehandleOpen, value) => (
    <>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h5" sx={{ fontSize: 18 }} gutterBottom>
                        产品名字：{value.productName}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Edit onClick={() => updatehandleOpen(value)} />
                    {/* <SimpleDialog open={open} handleClose={handleClose}/> */}
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        产品编号：{value.productNum}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        产品库存：{value.storage}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        年化利率：{value.annualRate}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        风险等级：{value.riskLevel}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </>
);

export default function Product() {
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [updateproductsingle, setUpdateproductsingle] = React.useState({});
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');
    const [workflows, setWorkflows] = React.useState([]);
    const [workName, setWorkName] = React.useState([]);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updatehandleOpen = (value) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < workflows.length; i++) {
            if (workflows[i].fid === value.fid) {
                value.workName = workflows[i].name;
                setUpdateproductsingle(value);
            }
        }
        setUpdateOpen(true);
    };

    const updatehandleClose = () => {
        setUpdateOpen(false);
    };
    function addProduct(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.addProduct(value).then((res) => {
            console.log(res);
            entityApi.getProducts().then((re) => {
                if (re.status === 200) {
                    setProduct(re.data);
                }
            });
        });
    }

    function updateProduct(value) {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        console.log(value);
        entityApi.updateProduct(value).then((res) => {
            console.log(res);
            if (res.status === 200) {
                entityApi.getProducts().then((re) => {
                    if (re.status === 200) {
                        setProduct(re.data);
                    }
                });
            }
        });
    }
    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi
            .getProducts()
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res.data);
                    entityApi.getWorkFlows().then((re) => {
                        if (re.status === 200) {
                            setWorkflows(re.data);
                            const queue = [];
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.data.length; i++) {
                                queue.push(re.data[i].name);
                            }
                            setWorkName(queue);
                        }
                    });
                }
            })
            .catch(() => {
                setSnackbarMsg('您无权限查看！');
                setSnackbarOpen(true);
            });
    }, []);

    return (
        <Grid container spacing={3}>
            {product.map((value) => (
                <Grid item lg={4} sm={6} xs={12} key={value.pid}>
                    <Box>
                        <Card variant="outlined">{card(updatehandleOpen, value)}</Card>
                    </Box>
                </Grid>
            ))}
            <Fab color="primary" aria-label="add" sx={{ display: 'flex', position: 'fixed', left: '92.5%', top: '86%' }}>
                <Add onClick={handleOpen} />
            </Fab>
            <AddProductModel
                open={open}
                handleClose={handleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                addProduct={addProduct}
                workName={workName}
                workflows={workflows}
            />
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <UpdateProductModel
                updateOpen={updateOpen}
                updatehandleClose={updatehandleClose}
                /* eslint-disable-next-line react/jsx-no-bind */
                updateProduct={updateProduct}
                /* eslint-disable-next-line react/jsx-no-duplicate-props */
                updateproductsingle={updateproductsingle}
                workName={workName}
                workflows={workflows}
            />
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
        </Grid>
    );
}
