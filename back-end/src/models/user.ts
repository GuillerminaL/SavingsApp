import mongoose, { InferSchemaType, Schema } from 'mongoose';

const DEFAULT_USER_PICTURE_URL = 'data:image/jpeg;base64,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';

const userSchema = new Schema({
    given_name: {
      type: String,
      required: true
    },
    family_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    photoURL: {
      type: String,
      default: DEFAULT_USER_PICTURE_URL
    },
    active: {
        type: Boolean,
        default: true
    }
});

export type UserType = InferSchemaType<typeof userSchema>;

export default mongoose.model('User', userSchema);