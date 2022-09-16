import express from 'express';
import { loginPatient, registerPatient } from '../controllers/PatientCtrl';

const router = express.Router();

router.post('/login', loginPatient);
router.post('/create', registerPatient);

export = router;
