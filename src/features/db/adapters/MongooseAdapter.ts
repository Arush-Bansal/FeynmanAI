import { Adapter, AdapterUser, AdapterSession, AdapterAccount } from "next-auth/adapters";
import dbConnect from "../dbConnect";
import User from "../models/User";
import mongoose from "mongoose";

// Create Account model
const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
}, { timestamps: true });

const Account = mongoose.models.Account || mongoose.model("Account", AccountSchema);

// Create Session model
const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionToken: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
}, { timestamps: true });

const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);

// Create VerificationToken model
const VerificationTokenSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
}, { timestamps: true });

const VerificationToken = mongoose.models.VerificationToken || mongoose.model("VerificationToken", VerificationTokenSchema);

export default function MongooseAdapter(): Adapter {
  return {
    async createUser(data: Partial<AdapterUser>) {
      await dbConnect();
      const user = await User.create(data);
      return user.toObject() as AdapterUser;
    },

    async getUser(id: string) {
      await dbConnect();
      const user = await User.findById(id);
      return user ? user.toObject() as AdapterUser : null;
    },

    async getUserByEmail(email: string) {
      await dbConnect();
      const user = await User.findOne({ email });
      return user ? user.toObject() as AdapterUser : null;
    },

    async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await dbConnect();
      const account = await Account.findOne({ provider, providerAccountId });
      if (!account) return null;
      
      const user = await User.findById(account.userId);
      return user ? user.toObject() as AdapterUser : null;
    },

    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
      await dbConnect();
      const user = await User.findByIdAndUpdate(data.id, data, { new: true });
      if (!user) {
        throw new Error(`User with id ${data.id} not found`);
      }
      return user.toObject() as AdapterUser;
    },

    async deleteUser(userId: string) {
      await dbConnect();
      await User.findByIdAndDelete(userId);
      await Account.deleteMany({ userId });
      await Session.deleteMany({ userId });
    },

    async linkAccount(data: AdapterAccount) {
      await dbConnect();
      const account = await Account.create(data);
      return account.toObject() as AdapterAccount;
    },

    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await dbConnect();
      await Account.findOneAndDelete({ provider, providerAccountId });
    },

    async createSession(data: AdapterSession) {
      await dbConnect();
      const session = await Session.create(data);
      return session.toObject() as AdapterSession;
    },

    async getSessionAndUser(sessionToken: string) {
      await dbConnect();
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      
      const user = await User.findById(session.userId);
      if (!user) return null;
      
      return {
        session: session.toObject() as AdapterSession,
        user: user.toObject() as AdapterUser,
      };
    },

    async updateSession(data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">) {
      await dbConnect();
      const session = await Session.findOneAndUpdate(
        { sessionToken: data.sessionToken },
        data,
        { new: true }
      );
      return session ? session.toObject() as AdapterSession : null;
    },

    async deleteSession(sessionToken: string) {
      await dbConnect();
      await Session.findOneAndDelete({ sessionToken });
    },

    async createVerificationToken(data: { identifier: string; token: string; expires: Date }) {
      await dbConnect();
      const verificationToken = await VerificationToken.create(data);
      return verificationToken.toObject();
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
      await dbConnect();
      const verificationToken = await VerificationToken.findOneAndDelete({
        identifier,
        token,
      });
      return verificationToken ? verificationToken.toObject() : null;
    },
  };
} 