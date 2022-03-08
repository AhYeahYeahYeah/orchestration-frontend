import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function GroupListForm({ groupName, groupDescription, setGroupName, setGroupDescription }) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="name"
                        label="用户组标签"
                        fullWidth
                        variant="standard"
                        defaultValue={groupName === '' ? '' : groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="description"
                        label="用户组描述"
                        fullWidth
                        variant="standard"
                        defaultValue={groupDescription === '' ? '' : groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}

GroupListForm.propTypes = {
    setGroupName: PropTypes.func.isRequired,
    setGroupDescription: PropTypes.func.isRequired,
    groupDescription: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired
};
