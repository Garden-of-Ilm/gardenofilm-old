export interface FatwaListRoot {
  success: boolean;
  data: {
    fatwaList: FatwaRes[];
    totalPages: number;
    currentPage: number;
  };
}

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

export interface FatwaRes {
  _id: string;
  user_id: any;
  author: string;
  detailed_answer: string;
  question_headline: string;
  full_question: string;
  additional_preference: string;
  generated_id: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FatwaById extends FatwaRes {
  audios: Audio[];
}
