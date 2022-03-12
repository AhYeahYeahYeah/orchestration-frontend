import { Handle } from 'react-flow-renderer';
import CardTerminate from './card/CardTerminate';

export default function TerminateSelector() {
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
            <CardTerminate />
            <Handle type="source" position="bottom" style={{ background: '#555', width: 10, height: 10 }} />
        </>
    );
}
