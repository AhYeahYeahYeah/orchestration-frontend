import * as React from 'react';
// import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRegistration, Login } from '@mui/icons-material';
import Echarts from './echarts';
import OverviewFlow from './Flow';
import { LogoFull } from '../../ui-component/Logo';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}.
//         </Typography>
//     );
// }

const theme = createTheme();

export default function RootPage() {
    // eslint-disable-next-line camelcase
    const [loading_l, setLoading_l] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_l() {
        setLoading_l(true);
        window.location.href = '/login';
        setLoading_l(false);
    }

    // eslint-disable-next-line camelcase
    const [loading_r, setLoading_r] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_r() {
        setLoading_r(true);
        window.location.href = '/register';
        setLoading_r(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', background: '#eeeeee' }}>
                {/* <CssBaseline /> */}
                {/* <Grid item xs={12} sm={8} md={5} square sx={{ background: 'white' }}> */}
                {/*    <Box */}
                {/*        sx={{ */}
                {/*            my: 8, */}
                {/*            mx: 4, */}
                {/*            display: 'flex', */}
                {/*            flexDirection: 'column', */}
                {/*            alignItems: 'center' */}
                {/*        }} */}
                {/*    > */}
                {/*        <Typography component="h1" variant="h5"> */}
                {/*            H e l l o W o r l d ! */}
                {/*        </Typography> */}
                {/*    </Box> */}
                {/* </Grid> */}
                <Grid item xs={false} sm={4} md={7}>
                    <Box component="span" sx={{ position: 'fixed', top: '2%', ml: 2 }}>
                        <LogoFull />
                    </Box>
                    <Echarts />
                    <Box sx={{ position: 'fixed', width: '30%', height: '30%', top: '50%', left: '6%' }}>
                        <LoadingButton
                            /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                            onClick={handleClick_l}
                            endIcon={<Login />}
                            /* eslint-disable-next-line camelcase */
                            loading={loading_l}
                            loadingPosition="end"
                            variant="contained"
                            sx={{ left: '10%', borderRadius: 15, width: 120, height: 50 }}
                            size="large"
                            color="primary"
                        >
                            登 录
                        </LoadingButton>
                        <LoadingButton
                            /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                            onClick={handleClick_r}
                            endIcon={<AppRegistration />}
                            /* eslint-disable-next-line camelcase */
                            loading={loading_r}
                            loadingPosition="end"
                            variant="outlined"
                            sx={{
                                left: '30%',
                                borderRadius: 15,
                                width: 120,
                                height: 50
                            }}
                            color="secondary"
                            size="large"
                        >
                            注 册
                        </LoadingButton>
                    </Box>
                    <Box sx={{ position: 'fixed', left: '55%', top: '2%', height: '96%', width: '45%' }}>
                        <OverviewFlow />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
