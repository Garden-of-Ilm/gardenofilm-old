export interface LoginRes {
  success: boolean;
  data: User;
  accessToken: string;
}

export interface User {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Fatwa = {
  _id: string;
  author: string;
  reply: string;
  title: string;
  question: string;
  category: string;
  additionalReferences: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  views: number;
};

export interface Audio {
  _id: string;
  filename: string;
  duration: number;
  size: number;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
}

export interface FatwaById extends Fatwa {
  audios: Audio[];
}

export type Benefit = {
  title: string;
  author: string;
  createdAt: string;
  category: string;
  _id: string;
  views: number;
};

export type Resource = {
  _id: string;
  name: string;
  fileFormat: string;
  downloadUrl: string;
  createdAt: string;
};

export type Category = {
  _id: string;
  name: string;
  createdAt: string;
};
