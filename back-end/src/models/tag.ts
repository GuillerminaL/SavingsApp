import mongoose, { InferSchemaType, Schema } from 'mongoose';

const tagSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }, 
    {timestamps: false}
);

export type TagType = InferSchemaType<typeof tagSchema>;

export default mongoose.model('Tag', tagSchema);