import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

// eslint-disable-next-line react/prop-types
export default function ServiceInfoModel({ open, handleClose, serviceName, serviceDescription }) {
    return (
        <div>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    名称: {serviceName}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Typography gutterBottom>原子服务描述: {serviceDescription}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>关闭</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    serviceName: PropTypes.object,
    serviceDescription: PropTypes.string
};
