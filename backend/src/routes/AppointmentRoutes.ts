import express from 'express';
import controller from '../controllers/AppointmentCtrl';

const router = express.Router();

router.get('/', controller.getAppointments);
router.post('/patient', controller.getAppointments);
router.post('/create', controller.createAppointment);
// router.delete('/:id', controller.cancelAppointment);

export = router;
