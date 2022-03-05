import { Handle } from 'react-flow-renderer';
import CardRegion from './card/CardRegion';

export default function RegionSelector() {
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
            <CardRegion />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
