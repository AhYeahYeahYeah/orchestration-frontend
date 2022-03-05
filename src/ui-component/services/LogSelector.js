import { Handle } from 'react-flow-renderer';
import CardLog from './card/CardLog';

export default function LogSelector() {
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
            <CardLog />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
