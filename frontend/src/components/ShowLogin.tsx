import { useState } from 'react';

/** Custom Components */
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

/** MUI Components */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const ShowLogin = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="h5">{showLogin ? 'Log In' : 'Sign Up'} to Clinic Faimdata</Typography>
            <Stack direction="row" spacing={1}>
                <Typography variant="body2">{showLogin ? "Don't have an account?" : 'Have an account?'}</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? 'SIGN UP' : 'LOG IN'}
                </Typography>
            </Stack>
            {showLogin ? <LoginForm /> : <SignUpForm />}
        </Box>
    );
};

export default ShowLogin;
