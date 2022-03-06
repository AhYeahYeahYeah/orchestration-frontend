import { ConductorApi } from '../api/restful';

// eslint-disable-next-line no-undef
test('workflow test', () => {
    const conductor = new ConductorApi();
    console.log(conductor.startQuery('dff98fad-bbe1-4135-ae57-f101041d5244'));
});
