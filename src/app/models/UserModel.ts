export type UserModel = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthUserModel = { authToken?: string } & Omit<
  UserModel,
  'createdAt' | 'updatedAt'
>;
