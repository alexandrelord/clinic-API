import { useState, useEffect, FunctionComponent } from 'react';

/** Types */
import { IAppointment } from './types';

/** Custom Components */
import AppointmentTicket from './AppointmentTicket';
import AlertMessage from '../AlertMessage';

/** MUI Components */
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import api from '../../services/api';

const renderAppointments = (appointments: IAppointment[]) => {
    return appointments.map((appointment: IAppointment, index: number) => {
        return <AppointmentTicket key={index} ticketNumber={index} appointment={appointment} />;
    });
};

const Appointments: FunctionComponent = (): JSX.Element => {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await api({ url: '/api/appointments/patient', method: 'POST', data: { patient: localStorage.getItem('patient') } });
                if (response.appointments) {
                    setAppointments(response.appointments);
                }
            } catch (error) {
                error instanceof Error && setErrorMsg(error.message);
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
