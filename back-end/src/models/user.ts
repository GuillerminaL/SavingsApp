import mongoose, { InferSchemaType, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  savings: {
    currencies: [
      {
        currencyId: {
          type: Schema.Types.ObjectId,
          ref: 'Currency',
          required: true
        }
      }
    ]
  }
});

type UserType = InferSchemaType<typeof userSchema>;

export default mongoose.model('User', userSchema);