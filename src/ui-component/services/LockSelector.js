import { Handle } from 'react-flow-renderer';
import CardLock from './card/CardLock';

export default function LockSelector() {
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
            <CardLock />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
