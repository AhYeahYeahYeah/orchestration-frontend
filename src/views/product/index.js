import * as React from 'react';
import Box from '@mui/material/Box';
import ProductCard from '../../ui-component/ProductCard';
import { Alert, Fab, Grid, Snackbar, Pagination } from '@mui/material';
import { Add } from '@mui/icons-material';
import AddProductModel from './AddProductModel';
import UpdateProductModel from './UpdateProductModel';
import { EntityApi } from '../../api/restful';
import { useState } from 'react';
import anime from 'animejs';
// import { useTheme } from '@mui/material/styles';

export default function Product() {
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [updateproductsingle, setUpdateproductsingle] = React.useState({});
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState('');
    const [workflows, setWorkflows] = React.useState([]);
    const [workName, setWorkName] = React.useState([]);
    const [perm, setPerm] = React.useState(false);
    const [defaults, setDefaults] = useState(1);
    const [count, setCount] = useState(0);
    const [productPage, setProductPage] = useState([]);
    const [opacity, setOpacity] = useState(0);
    const animationRef = React.useRef(null);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    const handleOpen = () => {
        if (perm === false) {
            setSnackbarMsg('您无权限查看！');
            setSnackbarOpen(true);
            return;
        }
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
                    setProductPage(re.data.slice(0, 9));
                    setCount(Math.ceil(re.data.length / 9));
                    setDefaults(1);
                }
            });
        });
    }

    const updateProduct = (value) => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.updateProduct(value).then((res) => {
            if (res.status === 200) {
                entityApi.getProducts().then((re) => {
                    if (re.status === 200) {
                        setProduct(re.data);
                        setProductPage(re.data.slice(0, 9));
                        setDefaults(1);
                    }
                });
            }
        });
    };
    const deleteProduct = (value) => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.deleteProduct(value.pid).then((res) => {
            if (res.status === 200) {
                entityApi.getProducts().then((re) => {
                    if (re.status === 200) {
                        setProduct(re.data);
                        setProductPage(re.data.slice(0, 9));
                        setCount(Math.ceil(re.data.length / 9));
                        setDefaults(1);
                        setSnackbarMsg('删除成功！');
                        setSnackbarOpen(true);
                    }
                });
            }
        });
    };
    function updatePage(value) {
        setProductPage(product.slice(9 * (value - 1), 9 * (value - 1) + 9));
        setOpacity(1);
    }

    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi
            .getProducts()
            .then((res) => {
                if (res.status === 200) {
                    setProduct(res.data);
                    setProductPage(res.data.slice(0, 9));
                    setCount(Math.ceil(res.data.length / 9));
                    setPerm(true);
                    entityApi.getWorkFlows().then((re) => {
                        if (re.status === 200) {
                            setWorkflows(re.data);
                            const queue = [];
                            // eslint-disable-next-line no-plusplus
                            for (let i = 0; i < re.data.length; i++) {
                                queue.push(re.data[i].name);
                            }
                            setWorkName(queue);

                            animationRef.current = anime({
                                targets: '.p-card',
                                opacity: [{ value: 1, easing: 'easeInCubic', duration: 400 }],
                                scale: [
                                    { value: 0.9, easing: 'easeInCirc', duration: 1 },
                                    { value: 1, easing: 'easeOutCirc', duration: 400 }
                                ],
                                delay: anime.stagger(100, { grid: [3, 3], from: 'first', axis: 'x' })
                            });
                        }
                    });
                }
            })
            .catch(() => {
                setPerm(false);
                setSnackbarMsg('您无权限查看！');
                setSnackbarOpen(true);
            });
    }, []);

    return (
        <Grid container spacing={3}>
            {productPage.map((value) => (
                <Grid item lg={4} sm={6} xs={12} key={value.pid} className="p-card" sx={{ opacity }}>
                    <Box>
                        <ProductCard updatehandleOpenHandler={updatehandleOpen} valueObject={value} deleteProductHandler={deleteProduct} />
                    </Box>
                </Grid>
            ))}
            <Pagination
                count={count}
                showFirstButton
                showLastButton
                defaultPage={defaults}
                sx={{ position: 'fixed', top: '94%', left: '70%' }}
                onChange={(e, page) => updatePage(page)}
            />
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
