/** MUI Components */
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/** Date and Time Formats */
const dateFormat: object = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

const timeFormat: object = {
    hour: '2-digit',
    minute: '2-digit'
};

const AppointmentTicket = (props: { appointment: any; ticketNumber: number }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 250,
                    height: 250
                }
            }}
        >
            <Paper elevation={3} sx={{ py: 2, px: 3 }}>
                <Stack spacing={1}>
                    <Typography variant="h5" component="h3" sx={{ margin: 'auto', mb: 2 }}>
                        Appointment #{props.ticketNumber + 1}
                    </Typography>

                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p">
                            Patient:
                        </Typography>
                        <Typography variant="body1" component="p">
                            {props.appointment.patient}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p">
                            Provider:
                        </Typography>
                        <Typography variant="body1" component="p">
                            {props.appointment.provider}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p">
                            Date:
                        </Typography>
                        <Typography variant="body1" component="p">
                            {new Date(props.appointment.availability.startTime).toLocaleDateString('en-GB', dateFormat)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p">
                            Start Time:
                        </Typography>
                        <Typography variant="body1" component="p">
                            {new Date(props.appointment.availability.startTime).toLocaleTimeString('en-GB', timeFormat)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p">
                            End Time:
                        </Typography>
                        <Typography variant="body1" component="p">
                            {new Date(props.appointment.availability.endTime).toLocaleTimeString('en-GB', timeFormat)}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AppointmentTicket;
