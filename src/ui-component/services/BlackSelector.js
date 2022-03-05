import { Handle } from 'react-flow-renderer';
import CardBlack from './card/CardBlack';

export default function BlackSelector() {
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
            <CardBlack />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
