import mongoose, { InferSchemaType, Schema } from 'mongoose';

const currencySchema = new Schema({
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
    {timestamps: true}
);

export type CurrencyType = InferSchemaType<typeof currencySchema>;

export default mongoose.model('Currency', currencySchema);

