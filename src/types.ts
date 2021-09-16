export interface User {
  id: string;
  name: string;
}

export interface Post {
  userId: string;
  title: string;
  body: string;
}

export type FieldError = string | undefined;

export type Validator = (value: string) => FieldError;

export interface StringMap<V = string> {
  [key: string]: V;
}
