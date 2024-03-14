import mongoose, { InferSchemaType, Schema } from 'mongoose';

const savingSchema = new Schema({
        tag: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Tag'
        },
        currency: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Currency'
        },
        amount: {
            type: Number,
            default: 0
        }
    }, 
    {timestamps: true}
);

export type SavingType = InferSchemaType<typeof savingSchema>;

export default mongoose.model('Saving', savingSchema);

