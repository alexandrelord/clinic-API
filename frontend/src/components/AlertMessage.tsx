/** MUI Components */
import Alert from '@mui/material/Alert';

const AlertMessage = (props: { errorMsg: string }) => {
    return (
        <Alert severity="info" sx={{ margin: 'auto' }}>
            {props.errorMsg}
        </Alert>
    );
};

export default AlertMessage;
