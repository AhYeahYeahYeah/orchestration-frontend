import * as React from 'react';
import Card from '@mui/material/Card';
import { Avatar, CardHeader, Divider, Grid, IconButton, Popover } from '@mui/material';
import { Delete, Edit, MoreVert, AssignmentOutlined } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

export default function ProductCard({ updatehandleOpenHandler, valueObject, deleteProductHandler }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    const divRef = React.useRef(null);
    const theme = useTheme();

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function handleClick() {
        setAnchorEl(divRef.current);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const handleMouseEnter = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    };

    return (
        <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} elevation={isMouseOver ? 4 : 1}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.palette.primary.light }} variant="rounded">
                        <AssignmentOutlined />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={() => handleClick()} ref={divRef}>
                        <MoreVert />
                    </IconButton>
                }
                title={valueObject.productName}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            产品编号：{valueObject.productNum}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            产品库存：{valueObject.storage}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            年化利率：{(Number(valueObject.annualRate) * 100).toFixed(2)}%
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            风险等级：{valueObject.riskLevel}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Popover
                id={id}
                open={open}
                onClose={() => handleClose()}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <IconButton onClick={() => updatehandleOpenHandler(valueObject)} sx={{ margin: 1 }}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => deleteProductHandler(valueObject)} sx={{ margin: 1 }}>
                    <Delete />
                </IconButton>
            </Popover>
        </Card>
    );
}

ProductCard.propTypes = {
    updatehandleOpenHandler: PropTypes.func,
    valueObject: PropTypes.object,
    deleteProductHandler: PropTypes.func
};
