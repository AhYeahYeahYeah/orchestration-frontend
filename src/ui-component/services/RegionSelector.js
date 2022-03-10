import { Handle } from 'react-flow-renderer';
import CardRegion from './card/CardRegion';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function RegionSelector({ data }) {
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <CardRegion setRegions={data.updateRegions} initRegion={data.regions} />
            <Handle type="source" position="bottom" style={{ background: '#555' }} />
        </>
    );
}
RegionSelector.protoTypes = {
    data: PropTypes.func
};
