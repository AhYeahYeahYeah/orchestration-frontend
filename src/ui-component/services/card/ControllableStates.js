import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import {useEffect} from "react";

const options = ['新建', '模板1'];

export default function ControllableStates() {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    // useEffect(() => {
    //     console.log(value);
    // });
    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="请选择模板" />}
            />
        </div>
    );
}
