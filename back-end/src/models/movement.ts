import mongoose, { InferSchemaType, Schema } from 'mongoose';

const movementSchema = new Schema({
        savingId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Saving'
        },
        currencyId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Currency'
        },
        concept: {
            type: String
        },
        amount: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        }
    }, 
    {timestamps: true}
);

export type MovementType = InferSchemaType<typeof movementSchema>;

export default mongoose.model('Movement', movementSchema);

