import { ObjectId } from "mongodb";

export type PostType = {
  _id?: ObjectId;
  title?: string;
  description?: string;
};

export type PostTypeWithTimestamps = {
  _id?: ObjectId;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostUpdate = {
  title?: string;
  description?: string;
};

export type PostCreate = {
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
