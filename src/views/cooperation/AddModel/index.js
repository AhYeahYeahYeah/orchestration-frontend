import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function AddModel({ handleAddClose, addOpen, addRoom }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const roomData = {
            name: data.get('name'),
            password: data.get('password')
        };
        addRoom(roomData);
    };
    return (
        <Dialog open={addOpen} onClose={handleAddClose}>
            <DialogTitle>填写信息</DialogTitle>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoFocus margin="dense" id="workName" label="文件名字" name="name" fullWidth variant="standard" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoFocus margin="dense" label="密码" name="password" type="password" fullWidth variant="standard" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>取消</Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button type="submit">确认</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

AddModel.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    handleAddClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    addOpen: PropTypes.bool.isRequired,
    addRoom: PropTypes.func
};
