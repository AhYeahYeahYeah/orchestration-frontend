import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';

// const optionInitial = ['新建', '模板1'];
// eslint-disable-next-line react/prop-types
export default function ControllableStates({ updateFlowinstance, workOptions, openFull }) {
    // eslint-disable-next-line no-use-before-define
    const [value, setValue] = React.useState('新建');
    const [buttonValue, setButtonValue] = React.useState('新建');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('新建');
    // const [inputValue, setInputValue] = React.useState('');
    // const [options, setOptions] = React.useState(workOptions);

    // React.useEffect(() => {
    //     const queue = [];
    //     queue.push('新建');
    //     const entityApi = new EntityApi(localStorage.getItem('admin_token'));
    //     entityApi.getWorkFlows().then((re) => {
    //         // eslint-disable-next-line no-plusplus
    //         for (let i = 0; i < re.data.length; i++) {
    //             queue.push(re.data[i].name);
    //         }
    //     });
    //     setOptions(queue);
    // }, []);
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClickClose() {
        setOpen(false);
    }
    return (
        <>
            <Button variant="contained" onClick={() => handleClickOpen()}>
                {buttonValue}
            </Button>
            {buttonValue === '新建' ? (
                ''
            ) : (
                <Typography
                    variant="h4"
                    sx={{ position: 'fixed', right: '15%', zIndex: 9999, top: openFull ? '1%' : '15%', transition: 2 }}
                >
                    {name}
                </Typography>
            )}
            <Dialog open={open} onClose={() => handleClickClose()}>
                <DialogTitle>服务编排</DialogTitle>
                <DialogContent>
                    <DialogContentText>请在此选择新建模板还是修改模板</DialogContentText>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            console.log(newValue);
                            // console.log(newValue);
                            // updateFlowinstance(newValue);
                        }}
                        // inputValue={inputValue}
                        // onInputChange={(event, newInputValue) => {
                        //     setInputValue(newInputValue);
                        //
                        // }}
                        id="controllable-states-demo"
                        options={workOptions}
                        sx={{ width: '100%', mt: 2 }}
                        renderInput={(params) => <TextField {...params} label="请选择模板" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            setTimeout(() => {
                                setValue(name);
                            }, 50);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        onClick={() => {
                            updateFlowinstance(value);
                            setButtonValue(value);
                            setName(value);
                            if (value !== '新建') {
                                setButtonValue('修改');
                            } else setButtonValue('新建');
                            handleClickClose();
                        }}
                    >
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
ControllableStates.protoTypes = {
    updateFlowinstance: PropTypes.func,
    workOptions: PropTypes.array,
    openFull: PropTypes.bool
};
