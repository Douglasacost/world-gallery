import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Backdrop, CircularProgress, Fade } from '@mui/material';
import { useModalContext } from '../context/ModalContext';
import CountryCard from '../components/CountryCard';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function ModalSupervisor() {
    const { open, setOpen, loading, countryDetails } = useModalContext();

    if(loading || !countryDetails) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );

    return (
        <Modal
            open={open}
            onClose={() => setOpen!(false)}
            aria-labelledby={countryDetails.name}
            aria-describedby={countryDetails.name}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box style={style}>
                    <CountryCard isDetailed {...countryDetails} />
                </Box>
            </Fade>
        </Modal>
    );
}