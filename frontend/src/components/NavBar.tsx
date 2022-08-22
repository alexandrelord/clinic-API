import { Link } from 'react-router-dom';

/** MUI Components */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Clinic Faimdata
                    </Typography>
                    <Button component={Link} to="book_appointment" color="inherit">
                        Book Appointment
                    </Button>
                    <Button component={Link} to="appointments" color="inherit">
                        Your Appointments
                    </Button>
                    <Button component={Link} to="/" color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
