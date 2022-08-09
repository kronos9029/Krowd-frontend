import { FormikProps } from 'formik';

// ----------------------------------------------------------------------

export type NewPostFormValues = {
  name: string;
  businessId: string;
  managerId: string;
  fieldId: string;
  areaId: string;
  address: string;
  description: string;
  investmentTargetCapital: string;
  investedCapital: string;
  sharedRevenue: string;
  multiplier: string;
  duration: string;
  numOfStage: string;
  businessLicense: string;
  startDate: string;
  endDate: string;
  image: File | any;
};

export type NewPostViewFormikInstance = FormikProps<NewPostFormValues>;

export type BlogState = {
  isLoading: boolean;
  error: boolean;
  posts: Post[];
  post: Post | null;
  recentPosts: Post[];
  hasMore: boolean;
  index: number;
  step: number;
};

export type BlogUser = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type ReplyComment = {
  id: string;
  userId: string;
  message: string;
  postedAt: Date;
  tagUser?: string;
};

export type PostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: BlogUser[];
  replyComment: ReplyComment[];
};

export type Post = {
  id: string;
  cover: string;
  title: string;
  description: string;
  createdAt: Date | string | number;
  view: number;
  comment: number;
  share: number;
  favorite: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  body: string;
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  comments: PostComment[];
};
