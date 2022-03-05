import { Handle } from 'react-flow-renderer';
import OutlinedCard from './Card';

export default function ColorSelectorNode() {
    return (
        <div>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <OutlinedCard />
            <Handle type="source" position="bottom" id="a" style={{ background: '#555' }} />
        </div>
    );
}
