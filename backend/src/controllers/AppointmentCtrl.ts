import { Request, Response, NextFunction } from 'express';
import Appointment from '../models/Appointment';

const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    const provider = req.body.provider;
    const availability = req.body.availability;
    console.log(req.body);

    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let appointments: object[] = [];
        if (req.method === 'GET') {
            appointments = await Appointment.find({});
        } else if (req.method === 'POST') {
            appointments = await Appointment.find({ patient: req.body.patient });
        }
        if (appointments.length > 0) {
            return res.status(200).json(appointments);
        } else {
            return res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default { createAppointment, getAppointments };
