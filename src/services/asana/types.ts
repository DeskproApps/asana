import type { DateAt, DateOn } from "../../types";

export type AsanaAPIError = {
  error: {
    code: number,
    message: string,
  }
};

export type Photo = {
  image_21x21: string,
  image_27x27: string,
  image_36x36: string,
  image_60x60: string,
  image_128x128: string,
  image_1024x1024: string,
};

export type Tag = {
  gid: string,
  name: string,
  color:
    | "dark-red"
    | "dark-orange"
    | "light-orange"
    | "dark-brown"
    | "light-green"
    | "dark-green"
    | "light-teal"
    | "dark-teal"
    | "light-blue"
    | "dark-purple"
    | "light-purple"
    | "light-pink"
    | "dark-pink"
    | "light-red"
    | "light-warm-gray"
  ,
};

export type Member = {
  gid: string,
  email: string,
  name: string,
  photo: Photo,
};

export type Workspace = {
  gid: string,
  name: string,
};

export type Project = {
  gid: string,
  name: string,
  permalink_url: string,
};

export type Task = {
  gid: string,
  name: string,
  completed: boolean,
  due_at: DateAt,
  due_on: DateOn,
  notes: string,
  html_notes: string,
  created_at: DateAt,
  permalink_url: string,
  assignee: Member,
  projects: Project[],
  tags: Tag[],
};

export type Story = {
  gid: string,
  type: string,
  html_text: string,
  created_at: DateAt,
  created_by: Member,
};
