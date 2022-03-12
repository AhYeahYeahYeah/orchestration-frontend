import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function AddModel({ handleClose, open, workInstance, onSave }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let workData = {};
        if (workInstance.length === 0) {
            workData = {
                name: data.get('name'),
                description: data.get('description'),
                version: 1
            };
        } else {
            workData = {
                fid: workInstance[0],
                name: workInstance[1],
                description: data.get('description'),
                version: Number(workInstance[3]) + 1
            };
        }
        onSave(workData);
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>填写信息</DialogTitle>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="workName"
                                label="服务流程名字"
                                name="name"
                                fullWidth
                                variant="standard"
                                disabled={workInstance.length !== 0}
                                defaultValue={workInstance.length === 0 ? '' : workInstance[1]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="服务流程描述"
                                name="description"
                                fullWidth
                                variant="standard"
                                defaultValue={workInstance.length === 0 ? '' : workInstance[2]}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button type="submit">确认</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

AddModel.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    handleClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    workInstance: PropTypes.array,
    onSave: PropTypes.func
};
