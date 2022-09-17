import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const registerPatient = async (req: Request, res: Response) => {
    try {
        const patient = new Patient(req.body);
        patient._id = patient.name + patient.surname;

        const foundPatient = await Patient.findOne({ _id: patient._id });
        if (foundPatient) {
            return res.status(400).json({ message: 'Patient already exists.' });
        }
        await patient.save();
        return res.status(200).json({ patient });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export const loginPatient = async (req: Request, res: Response) => {
    const patientId: string = req.body.name + req.body.surname;
    console.log(patientId);
    try {
        const patient = await Patient.findOne({ _id: patientId });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }
        return res.status(200).json({ patient });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
