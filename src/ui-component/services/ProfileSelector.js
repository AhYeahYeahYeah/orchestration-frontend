import { Handle } from 'react-flow-renderer';
import CardProfile from './card/CardProfile';

export default function ProfileSelector() {
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
            <CardProfile />
            <Handle type="source" position="bottom" style={{ background: '#555', width: 10, height: 10 }} />
        </>
    );
}
