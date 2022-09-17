import { useState, useEffect } from 'react';
import api from '../../services/api';

/** Types */
import { IProviders, IDates, ITimeSlots } from './types';

/** Custom components */
import AppointmentTable from './BookAppointmentTable';

/** MUI components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const BookAppointment = () => {
    const [provider, setProvider] = useState<IProviders | undefined>();
    const [providers, setProviders] = useState<IProviders[]>([]);
    const [availabilities, setAvailabilities] = useState<ITimeSlots[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(-1);
    const [selectedDates, setSelectedDates] = useState<IDates>({} as IDates);

    useEffect(() => {
        (async () => {
            try {
                const response = await api({ url: '/api/providers', method: 'GET' });
                if (response.providers) {
                    setProviders(response.providers);
                }
            } catch (error) {
                error instanceof Error && console.log(error.message);
            }
        })();
    }, []);

    const handleAvailabilitySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedDates.startDate) {
            try {
                const response = await api({
                    url: '/api/availabilities',
                    method: 'POST',
                    data: {
                        provider: selectedProvider,
                        startDate: selectedDates.startDate,
                        endDate: selectedDates.endDate
                    }
                });
                if (response.availabilities) {
                    setAvailabilities(response.availabilities);
                    setProvider(providers[selectedProvider]);
                }
            } catch (error) {
                error instanceof Error && console.log(error.message);
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <FormControl sx={{ my: 10 }}>
                <FormLabel>Providers</FormLabel>
                <RadioGroup name="radio-buttons-group" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedProvider(Number(event.target.value))}>
                    {providers.map((provider, index) => {
                        return <FormControlLabel key={index} value={index} control={<Radio />} label={`${provider.name} ${provider.surname}`} />;
                    })}
                </RadioGroup>
            </FormControl>
            {selectedProvider >= 0 ? (
                <Stack direction="row" spacing={2} sx={{ my: 10 }}>
                    <Box component="form" onSubmit={handleAvailabilitySubmit}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={selectedDates.startDate ? selectedDates.startDate : null}
                                    onChange={(date: Date | null) => {
                                        date && setSelectedDates({ ...selectedDates, startDate: date.getTime() });
                                    }}
                                    renderInput={(params) => <TextField {...params} autoComplete="off" />}
                                />
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={selectedDates.endDate ? selectedDates.endDate : null}
                                    onChange={(date: Date | null) => {
                                        date && setSelectedDates({ ...selectedDates, endDate: date.getTime() });
                                    }}
                                    renderInput={(params) => <TextField {...params} autoComplete="off" />}
                                />
                            </LocalizationProvider>
                            <Button type="submit" variant="contained">
                                Check Availabilities
                            </Button>
                        </Stack>
                    </Box>

                    <AppointmentTable provider={provider} timeSlots={availabilities} />
                </Stack>
            ) : null}
        </Container>
    );
};

export default BookAppointment;
