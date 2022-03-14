import { Handle } from 'react-flow-renderer';
import PropTypes from 'prop-types';
import CardWorkFlow from './card/CardWorkFlow';

// eslint-disable-next-line react/prop-types
export default function WorkFlowSelector({ data }) {
    // const [user,setUser]=useState('');
    // function inputChange(e){
    //     props(e.target.value);
    // }
    // eslint-disable-next-line react/prop-types
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555', width: 10, height: 10 }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/jsx-no-bind,react/prop-types */}
            <CardWorkFlow setFid={data.updateFid} initName={data.workFlowName} />
            <Handle type="source" position="bottom" style={{ background: '#555', width: 10, height: 10 }} />
        </>
    );
}

WorkFlowSelector.protoTypes = {
    data: PropTypes.object
};
