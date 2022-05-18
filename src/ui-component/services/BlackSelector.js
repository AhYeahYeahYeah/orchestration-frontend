import { Handle } from 'react-flow-renderer';
import CardBlack from './card/CardBlack';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function BlackSelector({ data }) {
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
            <CardBlack setBid={data.updateBid} initName={data.blackName} />
            <Handle type="source" position="bottom" style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }} />
        </>
    );
}

BlackSelector.protoTypes = {
    data: PropTypes.func
};
