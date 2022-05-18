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
                style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black', zIndex: 99 }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            <SwitchCard />
            <Handle type="source" position="bottom" style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }} />
        </>
    );
}
