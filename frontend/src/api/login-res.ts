export interface LoginRes {
  success: boolean;
  data: User;
  accessToken: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
