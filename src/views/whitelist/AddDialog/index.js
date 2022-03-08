import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserForm from './UserForm';
import WhiteListForm from './WhiteListForm';
import { Dialog } from '@mui/material';
import PropTypes from 'prop-types';
import { EntityApi } from '../../../api/restful';

const steps = ['选择用户名单', '填写白名单信息'];

export default function AddDialog({ open, handleClose, save }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectionUser, setSelectionUser] = React.useState([]);
    const [whiteName, setWhiteName] = React.useState('');
    const [whiteDescription, setWhiteDescription] = React.useState('');
    const [users, setUsers] = React.useState([]);
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <UserForm users={users} selectionUser={selectionUser} setSelectionUser={setSelectionUser} />;
            case 1:
                return (
                    <WhiteListForm
                        whiteName={whiteName}
                        whiteDescription={whiteDescription}
                        setWhiteName={setWhiteName}
                        setWhiteDescription={setWhiteDescription}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    }
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const whitelist = {
                name: whiteName,
                users: `[${selectionUser.toString()}]`,
                description: whiteDescription
            };
            save(whitelist);
            setSelectionUser([]);
            setWhiteName('');
            setWhiteDescription('');
            handleClose();
            setActiveStep(0);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const restore = () => {
        handleClose();
        setActiveStep(0);
        setWhiteName('');
        setWhiteDescription('');
        setSelectionUser([]);
    };

    React.useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('admin_token'));
        entityApi.getCustomers().then((res) => {
            if (res.status === 200) {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].id = res.data[i].cid;
                }
                setUsers(res.data);
            }
        });
    }, []);
    return (
        <Dialog open={open} fullWidth onClose={restore}>
            <Paper sx={{ my: { xs: 1, md: 2 }, p: { xs: 1, md: 1 } }}>
                <Typography component="h1" variant="h4" align="center">
                    白名单模板
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                上一步
                            </Button>
                        )}

                        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                            {activeStep === steps.length - 1 ? '确认' : '下一步'}
                        </Button>
                    </Box>
                </>
            </Paper>
        </Dialog>
    );
}

AddDialog.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    handleClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired
};
