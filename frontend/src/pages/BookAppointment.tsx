import { useState, useEffect } from 'react';
import axios from '../utils/axios';

/** Custom components */
import AppointmentTable from '../components/AppointmentTable';

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
    const [provider, setProvider] = useState<any | null>({});
    const [providers, setProviders] = useState<any[]>([]);
    const [providerValue, setProviderValue] = useState<number>(-1);
    const [availabilities, setAvailabilities] = useState<EpochTimeStamp[]>([]);
    const [startDateValue, setStartDateValue] = useState<EpochTimeStamp | null>(null);
    const [endDateValue, setEndDateValue] = useState<EpochTimeStamp | null>(null);

    useEffect(() => {
        const getProviders = async () => {
            try {
                const response = await axios.get('/api/providers');
                if (response.status === 200) {
                    setProviders(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProviders();
    }, []);

    const handleAvailabilitySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (startDateValue) {
                const response = await axios.post('/api/availabilities', { provider: providers[providerValue]._id, startDate: startDateValue, endDate: endDateValue });
                setProvider(providers[providerValue]);
                if (response.status === 200) {
                    setAvailabilities(response.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProviderValue(Number(event.target.value));
    };
    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setStartDateValue(date.getTime());
        }
    };
    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            setEndDateValue(date.getTime());
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <FormControl sx={{ my: 10 }}>
                <FormLabel>Providers</FormLabel>
                <RadioGroup name="radio-buttons-group" onChange={handleRadioChange}>
                    {providers.map((provider, index) => {
                        return <FormControlLabel key={index} value={index} control={<Radio />} label={`${provider.name} ${provider.surname}`} />;
                    })}
                </RadioGroup>
            </FormControl>
            {providerValue >= 0 ? (
                <Stack direction="row" spacing={2} sx={{ my: 10 }}>
                    <Box component="form" onSubmit={handleAvailabilitySubmit}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={startDateValue}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => <TextField {...params} autoComplete="off" />}
                                />
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={endDateValue}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => <TextField {...params} autoComplete="off" />}
                                />
                            </LocalizationProvider>
                            <Button type="submit" variant="contained">
                                Check Availabilities
                            </Button>
                        </Stack>
                    </Box>

                    <AppointmentTable provider={provider} availabilities={availabilities} />
                </Stack>
            ) : null}
        </Container>
    );
};

export default BookAppointment;
