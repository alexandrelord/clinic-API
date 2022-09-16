import express from 'express';
import { getAppointments, createAppointment } from '../controllers/AppointmentCtrl';

const router = express.Router();

router.post('/patient', getAppointments);
router.post('/create', createAppointment);

export = router;
