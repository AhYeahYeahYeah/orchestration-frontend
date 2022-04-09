import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

// const options = ['新建', '模板1'];

// eslint-disable-next-line react/prop-types
export default function ControllableStates({ workName, updateFid, updateproductsingle }) {
    // eslint-disable-next-line react/prop-types
    const [value, setValue] = React.useState(updateproductsingle === null ? null : updateproductsingle.workName);
    const [inputValue, setInputValue] = React.useState('');

    function lookFlow() {
        console.log(value);
        if (value !== null && value !== '') {
            window.open(`http://conductor.rinne.top:5000/workflowDef/${value}`);
        }
    }
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            updateFid(newValue);
                            // eslint-disable-next-line react/prop-types
                            if (updateproductsingle !== null) updateproductsingle.workName = newValue;
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={workName}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="请选择模板" />}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton position="end" onClick={() => lookFlow()}>
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        {/* <audio /> */}
                        <Search />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}
ControllableStates.protoTypes = {
    workName: PropTypes.array,
    updateFid: PropTypes.func,
    updateproductsingle: PropTypes.object
};
