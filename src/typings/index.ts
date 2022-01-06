export interface ITodo {
  completedAt: string | Date | null;
  id: string;
  name: string;
}

export interface IUser {
  emailVerifiedAt: string | null
  email: string | null
  id: string | null
  name: string | null
}
