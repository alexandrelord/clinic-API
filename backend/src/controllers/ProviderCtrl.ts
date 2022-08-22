import { Request, Response, NextFunction } from 'express';
import Provider from '../models/ProviderModel';

const getProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providers = await Provider.find();
        return res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default { getProviders };
