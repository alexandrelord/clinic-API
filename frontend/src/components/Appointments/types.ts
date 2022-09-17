export interface IAppointment {
    _id: string;
    patient: string;
    provider: string;
    availability: {
        startTime: number;
        endTime: number;
    };
}
