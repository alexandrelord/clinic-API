import express from 'express';
import controller from '../controllers/Availability';

const router = express.Router();

router.post('/', controller.getAvailabilities);

export = router;
