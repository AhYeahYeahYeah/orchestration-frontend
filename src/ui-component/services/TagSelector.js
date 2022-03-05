import { Handle } from 'react-flow-renderer';
import CardTag from './card/CardTag';

export default function TagSelector() {
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
            <CardTag />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
