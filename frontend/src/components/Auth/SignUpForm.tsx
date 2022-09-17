import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

/** Custom Components */
import AlertMessage from '../AlertMessage';

/** MUI Components */
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api({ url: '/api/patients/create', method: 'POST', data: { name, surname } });
            if (response.patient) {
                localStorage.setItem('patient', response.patient._id);
                setName('');
                setSurname('');
                navigate('/appointments');
            }
        } catch (error) {
            error instanceof Error && setErrorMsg(error.message);
        }
    };

    return (
        <Box sx={{ marginTop: '50px' }}>
            <Stack component="form" sx={{ width: '320px' }} spacing={2} autoComplete="off" onSubmit={handleSubmit}>
                <TextField variant="standard" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} required />
                <TextField variant="standard" type="text" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} value={surname} required style={{ marginBottom: 10 }} />
                <Button type="submit" variant="contained">
                    {' '}
                    Sign Up
                </Button>
                {errorMsg ? <AlertMessage errorMsg={errorMsg} /> : null}
            </Stack>
        </Box>
    );
};

export default SignUpForm;
