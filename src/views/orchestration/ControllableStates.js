import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

// const optionInitial = ['新建', '模板1'];
// eslint-disable-next-line react/prop-types
export default function ControllableStates({ updateFlowinstance, workOptions }) {
    // eslint-disable-next-line no-use-before-define
    const [value, setValue] = React.useState('新建');
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

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    // console.log(newValue);
                    updateFlowinstance(newValue);
                }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={workOptions}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="请选择模板" />}
            />
        </div>
    );
}
ControllableStates.protoTypes = {
    updateFlowinstance: PropTypes.func,
    workOptions: PropTypes.array
};
