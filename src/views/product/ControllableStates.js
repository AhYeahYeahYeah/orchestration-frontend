import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

// const options = ['新建', '模板1'];

// eslint-disable-next-line react/prop-types
export default function ControllableStates({ workName, updateFid, updateproductsingle }) {
    // eslint-disable-next-line react/prop-types
    const [value, setValue] = React.useState(updateproductsingle === null ? null : updateproductsingle.fid);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    updateFid(newValue);
                    // eslint-disable-next-line react/prop-types
                    if (updateproductsingle !== null) updateproductsingle.fid = newValue;
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
        </div>
    );
}
ControllableStates.protoTypes = {
    workName: PropTypes.array,
    updateFid: PropTypes.func,
    updateproductsingle: PropTypes.object
};
