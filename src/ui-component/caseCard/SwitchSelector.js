import { Handle } from 'react-flow-renderer';
import SwitchCard from './SwitchCard';

export default function SwitchSelector() {
    // const [user,setUser]=useState('');
    // function inputChange(e){
    //     props(e.target.value);
    // }

    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555', width: 10, height: 10, zIndex: 99 }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <SwitchCard />
            <Handle type="source" position="bottom" style={{ background: '#555', width: 10, height: 10 }} />
        </>
    );
}
