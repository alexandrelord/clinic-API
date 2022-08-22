import { Request, Response, NextFunction } from 'express';
import Appointment, { isAppointment } from '../models/Appointment';

interface isTimeSlot {
    startTime: EpochTimeStamp;
    endTime: EpochTimeStamp;
}

const timeSlotInMs = 1000 * 60 * 15; // 15 minutes in milliseconds
const nextDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
let timeSlots: isTimeSlot[] = [];
let bookedAvailabilities: isTimeSlot[] = [];

const getAvailabilities = async (req: Request, res: Response, next: NextFunction) => {
    const startDate: EpochTimeStamp = req.body.startDate;
    const endDate: EpochTimeStamp = req.body.endDate;
    let bookedAppointments: isAppointment[] = [];

    try {
        if (!endDate) {
            bookedAppointments = await Appointment.find({ provider: req.body.provider, 'availability.startTime': { $gte: startDate } });
        } else {
            bookedAppointments = await Appointment.find({ provider: req.body.provider, 'availability.startTime': { $gte: startDate, $lte: startDate } });
        }
        bookedAvailabilities = bookedAppointments.map((bookedAppointment) => bookedAppointment.availability);
        getTimeSlotsForRange(startDate, endDate);
        return res.status(200).json(timeSlots);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const getTimeSlotsForRange = (startDate: EpochTimeStamp, endDate: EpochTimeStamp) => {
    timeSlots = [];
    let currentDate: EpochTimeStamp = startDate;
    if (!endDate) endDate = startDate;
    while (currentDate <= endDate) {
        getTimeSlotsForDay(currentDate, 9, 11);
        currentDate += nextDay;
    }

    return timeSlots;
};

const getTimeSlotsForDay = (date: EpochTimeStamp, start: number, end: number): void => {
    const startTime: EpochTimeStamp = new Date(date).setHours(start, 0, 0, 0);
    const endTime: EpochTimeStamp = new Date(date).setHours(end, 0, 0, 0);
    let currentTime: EpochTimeStamp = startTime;

    while (currentTime < endTime) {
        if (bookedAvailabilities.length) {
            const booked = bookedAvailabilities.find((bookedAvailability) => {
                return bookedAvailability.startTime === currentTime;
            });
            if (!booked) {
                timeSlots.push({ startTime: currentTime, endTime: currentTime + timeSlotInMs });
            }
            currentTime += timeSlotInMs;
        } else {
            timeSlots.push({ startTime: currentTime, endTime: currentTime + timeSlotInMs });
            currentTime += timeSlotInMs;
        }
    }
};

export default { getAvailabilities };

// backend receives request (provider, startDate, endDate)
// Queries database for all appointments that are within the range of startDate and endDate for the provider
// maps the appointments to an array of availabilities (i.e. time slots)
// creates an array of 15 min time slots for the range of startDate and endDate and omits any time slots that are booked
// returns the array of time slots as a response to the client
