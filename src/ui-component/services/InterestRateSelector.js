import { Handle } from 'react-flow-renderer';
import CardInterestRate from './card/CardInterestRate';

export default function InterestRateSelector() {
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
            <CardInterestRate />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
