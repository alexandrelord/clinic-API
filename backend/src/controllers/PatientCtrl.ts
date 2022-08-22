import { Request, Response, NextFunction } from 'express';
import Patient from '../models/Patient';

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patient = new Patient(req.body);
        patient._id = patient.name + patient.surname;
        await patient.save();
        return res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getPatient = async (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.body.name + req.body.surname;
    try {
        const patient = await Patient.findOne({ _id: patientId });
        if (!patient) {
            return res.status(204).send();
        }
        return res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default { createPatient, getPatient };
