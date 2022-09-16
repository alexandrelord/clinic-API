import express from 'express';
import controller from '../controllers/Availability/AvailabilityCtrl';

const router = express.Router();

router.post('/', controller.getAvailabilities);

export = router;
