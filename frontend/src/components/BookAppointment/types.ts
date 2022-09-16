export interface IProviders {
    _id: string;
    name: string;
    surname: string;
}

export interface IDates {
    startDate: EpochTimeStamp;
    endDate: EpochTimeStamp;
}

export interface ITimeSlots {
    startTime: EpochTimeStamp;
    endTime: EpochTimeStamp;
}
