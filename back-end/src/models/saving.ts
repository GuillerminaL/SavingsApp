import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { CurrencyType } from './currency';
import { TagType } from './tag';

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
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }, 
    {timestamps: true}
);

export type SavingType = InferSchemaType<typeof savingSchema>;

export type PopulatedSavingType = {
    tag: TagType,
    currency: CurrencyType,
    amount: Number,
    active: Boolean,
    createdAt: Date,
    updatedAt: Date
};

export default mongoose.model('Saving', savingSchema);

