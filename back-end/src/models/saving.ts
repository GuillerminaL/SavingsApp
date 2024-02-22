import mongoose, { InferSchemaType, Schema } from 'mongoose';

const savingSchema = new Schema({
        currencyId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Currency'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        amount: {
            type: Number,
            default: 0
        },
        movements: [
            {
                movementId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Movement',
                    required: true
                }
            }
        ]
    }, 
    {timestamps: true}
);

export type SavingType = InferSchemaType<typeof savingSchema>;

export default mongoose.model('Saving', savingSchema);

