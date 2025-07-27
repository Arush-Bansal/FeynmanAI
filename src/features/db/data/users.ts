import { User } from "@/features/db";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
