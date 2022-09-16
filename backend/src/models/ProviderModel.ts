import mongoose, { Schema } from 'mongoose';

export interface IProvider {
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

export default mongoose.model<IProvider>('Provider', ProviderSchema);
