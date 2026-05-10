import mongoose, { Schema } from 'mongoose';
import type { AuthRole } from '@/lib/auth';

export type UserDoc = {
  _id: mongoose.Types.ObjectId;
  email: string;
  name?: string;
  passwordHash: string;
  role: AuthRole;
  /** false = must verify email; undefined/true = can sign in */
  emailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: false, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true, default: 'user' },
    emailVerified: { type: Boolean, required: false },
    emailVerificationToken: { type: String, required: false },
    emailVerificationExpires: { type: Date, required: false },
    passwordResetToken: { type: String, required: false },
    passwordResetExpires: { type: Date, required: false },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || mongoose.model<UserDoc>('User', UserSchema);

