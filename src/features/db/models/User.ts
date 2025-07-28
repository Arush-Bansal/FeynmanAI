import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  role: 'user' | 'admin' | 'superadmin';
  isActive: boolean;
  preferences: {
    defaultExam?: string;
    notificationSettings: {
      email: boolean;
      push: boolean;
    };
    practiceGoals: {
      dailyTarget: number;
      weeklyTarget: number;
    };
  };
  stats: {
    totalPracticeSessions: number;
    totalPracticeTime: number;
    averageScore: number;
    lastActiveDate: Date;
    streakDays: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    emailVerified: Date,
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preferences: {
      defaultExam: String,
      notificationSettings: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      practiceGoals: {
        dailyTarget: { type: Number, default: 30 }, // 30 minutes
        weeklyTarget: { type: Number, default: 5 }, // 5 sessions
      },
    },
    stats: {
      totalPracticeSessions: { type: Number, default: 0 },
      totalPracticeTime: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: Date.now },
      streakDays: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
