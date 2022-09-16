import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const registerPatient = async (req: Request, res: Response) => {
    try {
        const patient = new Patient(req.body);
        patient._id = patient.name + patient.surname;
        console.log(patient);
        if (await Patient.findOne({ _id: patient._id })) {
            res.status(400).json({ error: 'Patient already exists.' });
        }
        await patient.save();
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export const loginPatient = async (req: Request, res: Response) => {
    const patientId: string = req.body.name + req.body.surname;
    try {
        const patient = await Patient.findOne({ _id: patientId });
        if (!patient) {
            res.status(404).send('Patient not found.');
        }
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
