import express from 'express';
import controller from '../controllers/ProviderCtrl';

const router = express.Router();

router.get('/', controller.getProviders);

export = router;
