import { Handle } from 'react-flow-renderer';
import CardCredential from './card/CardCredential';

export default function CredentialSelector() {
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
            <CardCredential />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
