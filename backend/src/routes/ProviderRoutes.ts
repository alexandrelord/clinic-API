import express from 'express';
import { getProviders } from '../controllers/ProviderCtrl';

const router = express.Router();

router.get('/', getProviders);

export = router;
