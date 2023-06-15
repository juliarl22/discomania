
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';

export default function BackButton() {
    return (
        <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }} >
            <Link to="#" onClick={() => window.history.back()}>
                <Fab size="small" aria-label="GoBack">
                    <ArrowBackIcon fontSize="small" />
                </Fab>
            </Link>
        </Box>
    );
}

