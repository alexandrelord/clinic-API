import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

/** MUI Components */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

/** Date and Time Formats */
const dateFormat: object = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

const timeFormat: object = {
    hour: 'numeric',
    minute: 'numeric'
};

const AppointmentTable = (props: { provider: any; availabilities: any[] | null }) => {
    const navigate = useNavigate();
    const [rowId, setRowId] = useState<number>(-1);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const providerName = props.provider.name;
    const providerSurname = props.provider.surname;
    const provider = `${providerName} ${providerSurname}`;
    const providerId = props.provider._id;

    const date = props.availabilities ? props.availabilities : null;
    let columns: GridColDef[] = [];
    let rows: object[] = [];

    if (props.availabilities) {
        columns = [
            { field: 'id', headerName: 'ID', width: 50 },
            { field: 'provider', headerName: 'Provider', width: 150 },
            { field: 'date', headerName: 'Date', width: 150 },
            { field: 'startTime', headerName: 'Start Time', width: 150 },
            { field: 'endTime', headerName: 'End Time', width: 150 }
        ];

        for (let i = 0; i < props.availabilities.length; i++) {
            rows.push({
                id: i,
                provider: provider,
                date: new Date(props.availabilities[i].startTime).toLocaleDateString('en-GB', dateFormat),
                startTime: new Date(props.availabilities[i].startTime).toLocaleTimeString('en-US', timeFormat),
                endTime: new Date(props.availabilities[i].endTime).toLocaleTimeString('en-US', timeFormat)
            });
        }
    }

    const handleRowClick = (row: any) => {
        setRowId(row.id);
    };

    const handleBookAppointment = async () => {
        try {
            if (rowId >= 0) {
                const response = await axios.post('/api/appointments/create', {
                    patient: localStorage.getItem('patient'),
                    provider: providerId,
                    availability: {
                        startTime: props.availabilities ? props.availabilities[rowId].startTime : null,
                        endTime: props.availabilities ? props.availabilities[rowId].endTime : null
                    }
                });
                if (response.status === 200) {
                    navigate('/appointments');
                }
            }
        } catch (error: any) {
            if (error.response.status === 409) {
                setErrorMsg('Time slot already exist, please choose another.');
            } else {
                setErrorMsg('Something went wrong, please try again.');
            }
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={handleRowClick} />
            <Button type="submit" variant="contained" sx={{ mt: 5, mr: 5 }} onClick={handleBookAppointment}>
                Book Appointment
            </Button>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </div>
    );
};

export default AppointmentTable;
