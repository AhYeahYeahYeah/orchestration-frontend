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
                style={{ background: '#555', width: 10, height: 10 }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <CardBlack setBid={data.updateBid} initName={data.blackName} />
            <Handle type="source" position="bottom" style={{ background: '#555', width: 10, height: 10 }} />
        </>
    );
}

BlackSelector.protoTypes = {
    data: PropTypes.func
};
