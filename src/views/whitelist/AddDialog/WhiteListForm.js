import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function WhiteListForm({ whiteName, whiteDescription, setWhiteName, setWhiteDescription }) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="name"
                        label="白名单模板名称"
                        fullWidth
                        variant="standard"
                        defaultValue={whiteName === '' ? '' : whiteName}
                        onChange={(e) => setWhiteName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="description"
                        label="白名单描述"
                        fullWidth
                        variant="standard"
                        defaultValue={whiteDescription === '' ? '' : whiteDescription}
                        onChange={(e) => setWhiteDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}

WhiteListForm.propTypes = {
    setWhiteName: PropTypes.func.isRequired,
    setWhiteDescription: PropTypes.func.isRequired,
    whiteDescription: PropTypes.string.isRequired,
    whiteName: PropTypes.string.isRequired
};
