import mongoose, { Schema } from 'mongoose';

export interface IPatient {
    _id: string;
    name: string;
    surname: string;
}

const PatientSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', PatientSchema);

/** Ovewritting _id must be done before => https://mongoosejs.com/docs/guide.html#_id */
// PatientSchema.pre('save', async function (next) {
//     try {
//         const patient = this;
//         patient._id = patient.name + patient.surname;
//         next();
//     } catch (error: any) {
//         next(error);
//     }
// });
