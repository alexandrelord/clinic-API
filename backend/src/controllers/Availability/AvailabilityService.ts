import { ITimeSlot } from './types';

const timeSlotInMs = 1000 * 60 * 15; // 15 minutes in milliseconds
const nextDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
let timeSlots: ITimeSlot[] = [];

export const getTimeSlotsForRange = (startDate: EpochTimeStamp, endDate: EpochTimeStamp | null, bookedTimeSlots: ITimeSlot[]) => {
    timeSlots = [];
    let currentDate = startDate;
    if (!endDate) endDate = startDate;
    while (currentDate <= endDate) {
        getTimeSlotsForDay(currentDate, 9, 11, bookedTimeSlots);
        currentDate += nextDay;
    }
    return timeSlots;
};

const getTimeSlotsForDay = (date: EpochTimeStamp, start: number, end: number, bookedTimeSlots: ITimeSlot[]): void => {
    const startTime = new Date(date).setHours(start, 0, 0, 0);
    const endTime = new Date(date).setHours(end, 0, 0, 0);
    let currentTime = startTime;

    while (currentTime < endTime) {
        if (bookedTimeSlots.length) {
            const booked = bookedTimeSlots.find((bookedTimeSlot) => {
                return bookedTimeSlot.startTime === currentTime;
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
