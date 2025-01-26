import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import validator from 'validator';
import { IUser, UserModel } from './auth.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email address is required.'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email type.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextpassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextpassword, hashPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
