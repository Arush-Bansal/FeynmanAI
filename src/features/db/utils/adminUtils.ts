import { IUser } from '../models/User';

export const isAdmin = (user: IUser | null): boolean => {
  return user?.role === 'admin' || user?.role === 'superadmin';
};

export const isSuperAdmin = (user: IUser | null): boolean => {
  return user?.role === 'superadmin';
};

export const isActiveUser = (user: IUser | null): boolean => {
  return user?.isActive === true;
};

export const canManageUsers = (user: IUser | null): boolean => {
  return isAdmin(user) && isActiveUser(user);
};

export const canManageContent = (user: IUser | null): boolean => {
  return isAdmin(user) && isActiveUser(user);
};

export const canManageSystem = (user: IUser | null): boolean => {
  return isSuperAdmin(user) && isActiveUser(user);
}; 