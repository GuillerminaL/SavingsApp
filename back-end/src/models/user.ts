import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { PopulatedSavingType } from './saving';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  active: {
      type: Boolean,
      required: true,
      default: true
  },
  savings: [{
      type: Schema.Types.ObjectId,
      ref: 'Saving',
      required: true
    }]
});

type UserType = InferSchemaType<typeof userSchema>;

export type PopulatedUserType = {
  name: String,
  email: String,
  active: Boolean,
  savings: PopulatedSavingType,
  createdAt: Date,
  updatedAt: Date
};

export default mongoose.model('User', userSchema);