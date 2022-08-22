import Layout from './components/Layout';

import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import Missing from './components/Missing';
import AuthPage from './pages/AuthPage';

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
