import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ControllableStates from '../ControllableStates';
import * as React from 'react';

export default function UpdateProductModel({ updatehandleClose, updateOpen, updateProduct, updateproductsingle, workName, workflows }) {
    const [workflowid, setWorkflowid] = React.useState('');
    function updateFid(value) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < workflows.length; i++) {
            if (workflows[i].name === value) {
                setWorkflowid(workflows[i].fid);
                console.log(workflows[i].fid);
            }
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console,camelcase
        const product_data = {
            pid: updateproductsingle.pid,
            productNum: data.get('productNum'), // 产品编号
            validityPeriod: data.get('validityPeriod'), // 产品期限
            storage: data.get('storage'), // 产品库存（数量）
            productName: data.get('productName'), // 产品名称
            annualRate: data.get('annualRate'), // 年化利率
            minAmount: data.get('minAmount'), // 起存金额
            increAmount: data.get('increAmount'), // 递增金额
            singlePersonLimit: data.get('singlePersonLimit'), // 单人限额
            singleDayLimit: data.get('singleDayLimit'), // 单日限额
            riskLevel: data.get('riskLevel'), // 风险等级
            settlementMethod: data.get('settlementMethod'), // 结息方式
            fid: workflowid === '' ? updateproductsingle.fid : workflowid
        };
        // console.log(product_data);
        updateProduct(product_data);
        updatehandleClose();
    };
    return (
        <Dialog open={updateOpen} onClose={updatehandleClose}>
            <DialogTitle>填写信息</DialogTitle>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="产品名字"
                                name="productName"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.productName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="产品编号"
                                name="productNum"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.productNum}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="产品期限"
                                name="validityPeriod"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.validityPeriod}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="产品库存"
                                name="storage"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.storage}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="年化利率"
                                name="annualRate"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.annualRate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="起存金额"
                                name="minAmount"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.minAmount}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="递增金额"
                                name="increAmount"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.increAmount}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="单人限额"
                                name="singlePersonLimit"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.singlePersonLimit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="单日限额"
                                name="singleDayLimit"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.singleDayLimit}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="风险等级"
                                name="riskLevel"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.riskLevel}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="结息方式"
                                name="settlementMethod"
                                fullWidth
                                variant="standard"
                                defaultValue={updateproductsingle.settlementMethod}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* eslint-disable-next-line react/jsx-no-bind */}
                            <ControllableStates workName={workName} updateFid={updateFid} updateproductsingle={updateproductsingle} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updatehandleClose}>取消</Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button type="submit">确认</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

UpdateProductModel.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    updatehandleClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    updateOpen: PropTypes.bool.isRequired,
    updateProduct: PropTypes.func.isRequired,
    updateproductsingle: PropTypes.object.isRequired,
    workName: PropTypes.array,
    workflows: PropTypes.array
};
