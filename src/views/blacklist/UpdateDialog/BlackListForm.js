import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function BlackListForm({ blackName, blackDescription, setBlackName, setBlackDescription }) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="name"
                        label="黑名单模板名称"
                        fullWidth
                        variant="standard"
                        defaultValue={blackName === '' ? '' : blackName}
                        onChange={(e) => setBlackName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="description"
                        label="黑名单描述"
                        fullWidth
                        variant="standard"
                        defaultValue={blackDescription === '' ? '' : blackDescription}
                        onChange={(e) => setBlackDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}

BlackListForm.propTypes = {
    setBlackName: PropTypes.func.isRequired,
    setBlackDescription: PropTypes.func.isRequired,
    blackDescription: PropTypes.string.isRequired,
    blackName: PropTypes.string.isRequired
};
