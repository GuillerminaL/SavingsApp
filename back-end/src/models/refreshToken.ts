import mongoose, { InferSchemaType, Schema } from 'mongoose';

const refreshTokenSchema = new Schema({
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, 
  {timestamps: true}
);

export type RefreshTokenType = InferSchemaType<typeof refreshTokenSchema>;

export default mongoose.model('RefreshToken', refreshTokenSchema);
