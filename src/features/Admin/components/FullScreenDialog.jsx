import '../styles.scss';
import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ReactToPrint from 'react-to-print';
import ReportDocument from './ReportDocument';

import CloseIcon from '../../../../images/icon-svg/cancel-icon.svg';

const theme = createTheme({
    components: {
        // Name of the component
        MuiAppBar: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: 'var(--color-primary-light)',
                    color: '#000',
                    // boxShadow: 'none',
                },
            },
        },
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ handleClose }) {
    const componentRef = React.useRef();

    const [time, setTime] = React.useState('day');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <ThemeProvider theme={theme}>
                    <AppBar sx={{ position: 'sticky' }}>
                        <Toolbar color="red">
                            <Typography sx={{ ml: 2 }} variant="h4" component="div">
                                Báo cáo
                            </Typography>

                            <Box sx={{ ml: 2, width: 150 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={time}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'day'}>Hôm nay</MenuItem>
                                        <MenuItem value={'3day'}>3 ngày gần nhất</MenuItem>
                                        <MenuItem value={'7day'}>7 ngày gần nhất</MenuItem>
                                        <MenuItem disabled value={'month'}>
                                            Tháng
                                        </MenuItem>
                                        <MenuItem disabled value={'year'}>
                                            Năm
                                        </MenuItem>
                                        <MenuItem value={'all'}>Từ trước đến nay</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1 }}></Box>

                            <Button autoFocus color="inherit" onClick={handleClose}>
                                <img src={CloseIcon} alt="close-icon" />
                            </Button>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <div style={{ padding: '4rem 10rem' }}>
                    <ReportDocument time={time} ref={componentRef} />
                    <div style={{ textAlign: 'right', margin: '2rem' }}>
                        <ReactToPrint
                            content={() => componentRef.current}
                            trigger={() => <button className="btn btn--primary">Lưu PDF</button>}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
