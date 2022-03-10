import { Handle } from 'react-flow-renderer';
import CardWhite from './card/CardWhite';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function WhiteSelector({ data }) {
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
                style={{ background: '#555' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/jsx-no-bind,react/prop-types */}
            <CardWhite setWid={data.updateWid} initName={data.whiteName} />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}

WhiteSelector.protoTypes = {
    data: PropTypes.object
};
