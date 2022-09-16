import { ITimeSlots } from '../BookAppointment/types';

export interface IAppointment {
    _id: string;
    patient: string;
    provider: string;
    availability: ITimeSlots;
}
