import mongoose, { Schema } from 'mongoose';

export interface isAppointment {
    patient: string;
    provider: string;
    availability: {
        startTime: EpochTimeStamp;
        endTime: EpochTimeStamp;
    };
}

const AvailabilitySchema: Schema = new Schema({
    startTime: { type: Number },
    endTime: { type: Number }
});

const AppointmentSchema: Schema = new Schema(
    {
        patient: { type: Schema.Types.String, ref: 'Patient' },
        provider: { type: Schema.Types.String, ref: 'Provider' },
        availability: AvailabilitySchema
    },
    { timestamps: true }
);

export default mongoose.model<isAppointment>('Appointment', AppointmentSchema);
