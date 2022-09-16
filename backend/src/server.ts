import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import chalk from 'chalk';
import { config } from './config/config';

import providerRoutes from './routes/ProviderRoutes';
import patientRoutes from './routes/PatientRoutes';
import appointmentRoutes from './routes/AppointmentRoutes';
import availabilityRoutes from './routes/AvailabilityRoutes';

const router: Express = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log(chalk.green('MongoDB connected'));
    })
    .catch((err) => {
        console.error(err);
    });

/** Middleware */
router.use(morgan('dev'));
router.use(express.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/** HealthCheck */
router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

/** Routes */
router.use('/api/providers', providerRoutes);
router.use('/api/patients', patientRoutes);
router.use('/api/appointments', appointmentRoutes);
router.use('/api/availabilities', availabilityRoutes);
router.use((req, res) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Error handling */

/**  Server */
const PORT = process.env.SERVER_PORT;
router.listen(PORT, () => {
    console.log(chalk.white(`Server is running on port ${PORT}`));
});
