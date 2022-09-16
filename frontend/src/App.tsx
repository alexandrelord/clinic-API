import Layout from './components/Layout';

import BookAppointment from './components/BookAppointment/BookAppointment';
import Appointments from './components/Appointments/Appointments';
import Missing from './components/Missing';
import AuthPage from './components/Auth/AuthPage';

import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<AuthPage />} />
                <Route path="book_appointment" element={<BookAppointment />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
};

export default App;
