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
                style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }}
                // onConnect={(params) => console.log('handle onConnect', params)}
            />
            {/* eslint-disable-next-line react/prop-types */}
            <CardRegion setRegions={data.updateRegions} initRegion={data.regions} />
            <Handle type="source" position="bottom" style={{ background: '#FFFFFF', width: 8, height: 8, border: '1px solid black' }} />
        </>
    );
}
RegionSelector.protoTypes = {
    data: PropTypes.func
};
