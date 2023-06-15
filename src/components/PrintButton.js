
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

const handlePrint = () => {
    window.print();
};

export default function PrintButton() {
    return (
        <Box sx={{ position: 'fixed', top: '75px', right: '10px', zIndex: '9999' }} >
            <Fab onClick={handlePrint} size="small" aria-label="Print">
                <PrintIcon fontSize="small" />
            </Fab>
        </Box>
    );
}

