/** Custom Components */
import ShowLogin from './ShowLogin';

/** MUI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const AuthPage = () => {
    return (
        <Box className="body">
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '150px'
                }}
            >
                <ShowLogin />
            </Container>
        </Box>
    );
};

export default AuthPage;
