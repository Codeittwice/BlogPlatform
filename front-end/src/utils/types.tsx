import { ObjectId } from "mongodb";

export type PostType = {
  _id: ObjectId | undefined;
  key: string | undefined;
  title: string | undefined;
  description: string | undefined;
};
export type PostTypeWithTimestamps = {
  _id: ObjectId | undefined;
  key: string | undefined;
  title: string | undefined;
  description: string | undefined;
  createdAt: Date;
  updatedAt: Date;
};
