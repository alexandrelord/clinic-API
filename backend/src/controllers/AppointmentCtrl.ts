import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(200).json({ appointment });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find({ patient: req.body.patient });
        if (appointments.length > 0) {
            res.status(200).json({ appointments });
        } else {
            res.status(404).json({ message: 'No appointments found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
