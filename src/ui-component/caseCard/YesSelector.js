import { Handle } from 'react-flow-renderer';
import CaseCardYes from './CaseCardYes';

export default function YesSelector() {
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
            <CaseCardYes />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
