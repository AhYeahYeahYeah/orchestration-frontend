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
    // console.log(data);
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <CardWorkFlow
                /* eslint-disable-next-line react/prop-types */
                setFid={data.updateFid}
                /* eslint-disable-next-line react/prop-types */
                initName={data.workFlowName}
                /* eslint-disable-next-line react/prop-types */
                updateLookInstance={data.updateLookInstance}
                /* eslint-disable-next-line react/prop-types */
                onlyOpenLook={data.onlyOpenLook}
            />
            <Handle type="source" position="bottom" style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }} />
        </>
    );
}

WorkFlowSelector.protoTypes = {
    data: PropTypes.object
};
