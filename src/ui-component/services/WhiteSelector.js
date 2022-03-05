import { Handle } from 'react-flow-renderer';
import CardWhite from './card/CardWhite';

export default function WhiteSelector() {
    // const [user,setUser]=useState('');
    // function inputChange(e){
    //     props(e.target.value);
    // }

    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <CardWhite />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
