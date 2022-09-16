import { Request, Response } from 'express';
import Appointment, { IAppointment } from '../../models/Appointment';
import { getTimeSlotsForRange } from './AvailabilityService';
import { ITimeSlot } from './types';

const getAvailabilities = async (req: Request, res: Response) => {
    const { provider }: { provider: number } = req.body;
    const { startDate }: { startDate: EpochTimeStamp } = req.body;
    const { endDate }: { endDate: EpochTimeStamp } = req.body || null;
    let bookedAppointments: IAppointment[] = [];

    try {
        if (!endDate) {
            bookedAppointments = await Appointment.find({ provider: provider, 'availability.startTime': { $gte: startDate } });
        } else {
            bookedAppointments = await Appointment.find({ provider: provider, 'availability.startTime': { $gte: startDate, $lte: startDate } });
        }
        //get time booked time slots for each appointment
        const bookedTimeSlots = bookedAppointments.map((bookedAppointment) => bookedAppointment.availability);
        // get available time slots for date range
        const timeSlots: ITimeSlot[] = getTimeSlotsForRange(startDate, endDate, bookedTimeSlots);
        res.status(200).json({ availabilities: timeSlots });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default { getAvailabilities };
