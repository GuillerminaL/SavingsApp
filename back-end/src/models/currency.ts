import mongoose, { InferSchemaType, Schema } from 'mongoose';

const currencySchema = new Schema({
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }, 
    {timestamps: false}
);

export type CurrencyType = InferSchemaType<typeof currencySchema>;

export default mongoose.model('Currency', currencySchema);

