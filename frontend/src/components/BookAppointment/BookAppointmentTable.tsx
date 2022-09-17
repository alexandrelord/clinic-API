import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** MUI Components */
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { IProviders, ITimeSlots } from './types';
import api from '../../services/api';

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

const AppointmentTable = (props: { provider: IProviders | undefined; timeSlots: ITimeSlots[] }) => {
    const navigate = useNavigate();
    const [rowId, setRowId] = useState(-1);
    const [errorMsg, setErrorMsg] = useState('');

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'provider', headerName: 'Provider', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'startTime', headerName: 'Start Time', width: 150 },
        { field: 'endTime', headerName: 'End Time', width: 150 }
    ];

    const rows = props.timeSlots.map((timeSlot, index) => {
        return {
            id: index,
            provider: `${props.provider?.name} ${props.provider?.surname}`,
            date: new Date(timeSlot.startTime).toLocaleDateString('en-GB', dateFormat),
            startTime: new Date(timeSlot.startTime).toLocaleTimeString('en-GB', timeFormat),
            endTime: new Date(timeSlot.endTime).toLocaleTimeString('en-GB', timeFormat)
        };
    });

    const handleBookAppointment = async () => {
        try {
            if (rowId >= 0) {
                const response = await api({
                    url: '/api/appointments/create',
                    method: 'POST',
                    data: {
                        patient: localStorage.getItem('patient'),
                        provider: props.provider?._id,
                        availability: {
                            startTime: props.timeSlots[rowId].startTime,
                            endTime: props.timeSlots[rowId].endTime
                        }
                    }
                });
                response && navigate('/appointments');
            }
        } catch (error) {
            error instanceof Error && setErrorMsg(error.message);
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} onRowClick={(row: GridRowParams) => setRowId(Number(row.id))} />
            <Button type="submit" variant="contained" sx={{ mt: 5, mr: 5 }} onClick={handleBookAppointment}>
                Book Appointment
            </Button>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </div>
    );
};

export default AppointmentTable;
