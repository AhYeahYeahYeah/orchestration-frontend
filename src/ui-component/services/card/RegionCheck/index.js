import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// eslint-disable-next-line react/prop-types
export default function RegionCheck({ setRegions, initRegion }) {
    return (
        <Autocomplete
            multiple
            id="checkboxes"
            limitTags={2}
            /* eslint-disable-next-line no-use-before-define */
            defaultValue={initRegion}
            /* eslint-disable-next-line no-use-before-define */
            options={province}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
                setRegions(newValue);
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option}
                </li>
            )}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="请选择地域" placeholder="省份" />}
        />
    );
}
RegionCheck.protoTypes = {
    setRegions: PropTypes.func,
    initRegion: PropTypes.array
};
const province = [
    '北京市',
    '天津市',
    '河北省',
    '山西省',
    '内蒙古',
    '辽宁省',
    '吉林省',
    '黑龙江省',
    '上海市',
    '江苏省',
    '浙江省',
    '安徽省',
    '福建省',
    '江西省',
    '山东省',
    '河南省',
    '湖北省',
    '湖南省',
    '广东省',
    '海南省',
    '广西省',
    '甘肃省',
    '陕西省',
    '新疆省',
    '青海省',
    '宁夏省',
    '重庆市',
    '四川省',
    '贵州省',
    '云南省',
    '西藏省',
    '台湾',
    '澳门',
    '香港'
];
