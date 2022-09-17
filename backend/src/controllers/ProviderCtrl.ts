import { Request, Response } from 'express';
import Provider from '../models/ProviderModel';

export const getProviders = async (req: Request, res: Response) => {
    try {
        const providers = await Provider.find();
        return res.status(200).json({ providers });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
