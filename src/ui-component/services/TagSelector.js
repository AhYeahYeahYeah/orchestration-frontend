import { Handle } from 'react-flow-renderer';
import CardTag from './card/CardTag';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function TagSelector({ data }) {
    // const [user,setUser]=useState('');
    // function inputChange(e){
    //     props(e.target.value);
    // }

    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <CardTag setGid={data.updateGid} initName={data.groupName} />
            <Handle type="source" position="bottom" style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }} />
        </>
    );
}
TagSelector.protoTypes = {
    data: PropTypes.func
};
