import { useState, useEffect } from 'react';
import axios from '../utils/axios';

/** Custom Components */
import AppointmentTicket from '../components/AppointmentTicket';
import AlertMessage from '../components/AlertMessage';

/** MUI Components */
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const renderAppointments = (appointments: any[]) => {
    return appointments.map((appointment: object, index: number) => {
        return <AppointmentTicket key={index} ticketNumber={index} appointment={appointment} />;
    });
};

const Appointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post('/api/appointments/patient', { patient: localStorage.getItem('patient') });
                if (response.status === 200) {
                    setAppointments(response.data);
                } else if (response.status === 204) {
                    setErrorMsg('No appointments found.');
                }
            } catch (error: any) {
                setErrorMsg('Something went wrong. Please try again later.');
            }
        })();
    }, []);

    return (
        <Container sx={{ mt: 20 }}>
            <Grid container>{!errorMsg ? renderAppointments(appointments) : <AlertMessage errorMsg={errorMsg} />}</Grid>
        </Container>
    );
};

export default Appointments;
