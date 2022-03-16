import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function DeleteModel({ handleDeleteClose, deleteOpen, deleteRoom }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const roomData = {
            password: data.get('password')
        };
        deleteRoom(roomData);
    };
    return (
        <Dialog open={deleteOpen} onClose={handleDeleteClose}>
            <DialogTitle>填写信息</DialogTitle>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoFocus margin="dense" label="密码" name="password" type="password" fullWidth variant="standard" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>取消</Button>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button type="submit">确认</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

DeleteModel.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    handleDeleteClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    deleteOpen: PropTypes.bool.isRequired,
    deleteRoom: PropTypes.func
};
