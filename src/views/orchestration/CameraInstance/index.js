import { useState } from 'react';
import Camera from 'react-camera';
import Dialog from '@mui/material/Dialog';
import { EntityApi } from '../../../api/restful';
import axios from 'axios';
import { DialogActions, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const style = {
    preview: {
        position: 'relative'
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },
    captureImage: {
        width: '100%'
    }
};

// eslint-disable-next-line react/prop-types
export default function CameraInstance({ cameraOpen, handleCameraClose, handleOpen, setSnackbarMsg, setSnackbarOpen }) {
    const [camera, setCamera] = useState(null);
    function getBase64(imgUrl) {
        window.URL = window.URL || window.webkitURL;
        const xhr = new XMLHttpRequest();
        xhr.open('get', imgUrl, true);
        // 至关重要
        xhr.responseType = 'blob';
        // eslint-disable-next-line func-names
        xhr.onload = function () {
            // eslint-disable-next-line react/no-this-in-sfc
            if (this.status === 200) {
                // 得到一个blob对象
                // eslint-disable-next-line react/no-this-in-sfc
                const blob = this.response;
                console.log('blob', blob);
                // 至关重要
                const oFileReader = new FileReader();
                // eslint-disable-next-line func-names
                oFileReader.onloadend = function (e) {
                    // 此处拿到的已经是 base64的图片了
                    const base64 = e.target.result;
                    const entityApi = new EntityApi(localStorage.getItem('admin_token'));
                    entityApi.getAdmin(JSON.parse(localStorage.getItem('admin')).aid).then((res) => {
                        const formData = new FormData();
                        formData.append('api_key', '3sBopkZLRn5DnMrC44wgM94YMKu1Woak');
                        formData.append('api_secret', '28lgf36_t9Ax7wDX6Fpc2hu3gCG0wLW4');
                        formData.append('image_base64_1', res.data[0].avatar);
                        formData.append('image_base64_2', base64);
                        axios.post('https://api-cn.faceplusplus.com/facepp/v3/compare', formData).then((re) => {
                            if (Number(re.data.confidence) > 75) {
                                console.log('Yes');
                                setSnackbarMsg('人脸比对成功！');
                                setSnackbarOpen(true);
                                camera.close();
                                handleCameraClose();
                                handleOpen();
                            } else {
                                setSnackbarMsg('人脸比对失败！');
                                setSnackbarOpen(true);
                                camera.close();
                                handleCameraClose();
                            }
                        });
                    });
                };
                oFileReader.readAsDataURL(blob);
            }
        };
        xhr.send();
    }
    function takePicture() {
        camera.capture().then((blob) => {
            // img.src = URL.createObjectURL(blob);
            console.log(URL.createObjectURL(blob));
            console.log(getBase64(URL.createObjectURL(blob)));
            // img.onload = (src) => {
            //     URL.revokeObjectURL(src);
            //     console.log(URL.revokeObjectURL(src));
            // };
            // setImg(img);
        });
    }
    // function sleep(time) {
    //     return new Promise((resolve) => setTimeout(resolve, time));
    // }
    // useEffect(() => {
    //     sleep(1000).then(() => {
    //         console.log(camera);
    //         // 这里写sleep之后需要去做的事情
    //         if (camera !== null) {
    //             // eslint-disable-next-line react/prop-types
    //             camera.capture().then((blob) => {
    //                 // img.src = URL.createObjectURL(blob);
    //                 console.log(URL.createObjectURL(blob));
    //                 console.log(getBase64(URL.createObjectURL(blob)));
    //                 // img.onload = (src) => {
    //                 //     URL.revokeObjectURL(src);
    //                 //     console.log(URL.revokeObjectURL(src));
    //                 // };
    //                 // setImg(img);
    //             });
    //         }
    //     });
    // }, [camera]);
    return (
        <>
            <Dialog open={cameraOpen} onClose={handleCameraClose}>
                <DialogTitle>
                    <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
                        <Typography variant="h4" align="center">
                            准备好后点击按钮进行人脸对比
                        </Typography>
                    </Paper>
                </DialogTitle>
                <Camera
                    style={style.preview}
                    ref={(cam) => {
                        setCamera(cam);
                    }}
                />
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                {/* <img */}
                {/*    style={style.captureImage} */}
                {/*    ref={(img) => { */}
                {/*        setImg(img); */}
                {/*    }} */}
                {/* /> */}
                <DialogActions>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button onClick={takePicture}>确认</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

CameraInstance.protoTypes = {
    cameraOpen: PropTypes.bool,
    handleCameraClose: PropTypes.func,
    handleOpen: PropTypes.func,
    setSnackbarOpen: PropTypes.func,
    setSnackbarMsg: PropTypes.func
};
