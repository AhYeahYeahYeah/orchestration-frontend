import { Handle } from 'react-flow-renderer';
import CaseCardNo from './CaseCardNo';

export default function NoSelector() {
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
            <CaseCardNo />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
