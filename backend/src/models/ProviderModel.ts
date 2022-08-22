import mongoose, { Schema } from 'mongoose';

export interface isProvider {
    _id: string;
    name: string;
    surname: string;
}

const ProviderSchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<isProvider>('Provider', ProviderSchema);
