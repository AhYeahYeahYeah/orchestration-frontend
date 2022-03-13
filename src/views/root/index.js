import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRegistration, Login } from '@mui/icons-material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

const theme = createTheme();

export default function RootPage() {
    // eslint-disable-next-line camelcase
    const [loading_l, setLoading_l] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_l() {
        setLoading_l(true);
    }

    // eslint-disable-next-line camelcase
    const [loading_r, setLoading_r] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_r() {
        setLoading_r(true);
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ background: '#e3f2fd' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            H e l l o W o r l d !
                        </Typography>
                        <Grid container sx={{ mt: 30 }}>
                            <LoadingButton
                                /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                                onClick={handleClick_l}
                                endIcon={<Login />}
                                /* eslint-disable-next-line camelcase */
                                loading={loading_l}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ left: '18%' }}
                                href="/login"
                            >
                                Sign In
                            </LoadingButton>

                            <LoadingButton
                                /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                                onClick={handleClick_r}
                                endIcon={<AppRegistration />}
                                /* eslint-disable-next-line camelcase */
                                loading={loading_r}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ left: '37%' }}
                                href="/register"
                            >
                                Sign Up
                            </LoadingButton>
                        </Grid>
                        <Copyright sx={{ mt: 30 }} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}
