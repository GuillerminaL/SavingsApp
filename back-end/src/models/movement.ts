import mongoose, { InferSchemaType, Schema } from 'mongoose';

const movementSchema = new Schema({
        concept: {
            type: String
        },
        amount: {
            type: Number,
            required: true
        },
        savingId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Saving'
        }
    }, 
    {timestamps: true}
);

export type MovementType = InferSchemaType<typeof movementSchema>;

export default mongoose.model('Movement', movementSchema);

