import { Handle } from 'react-flow-renderer';
import CardUnlock from './card/CardUnlock';

export default function UnlockSelector() {
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
            <CardUnlock />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
