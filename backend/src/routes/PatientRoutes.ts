import express from 'express';
import controller from '../controllers/PatientCtrl';

const router = express.Router();

router.post('/login', controller.getPatient);
router.post('/create', controller.createPatient);

export = router;
