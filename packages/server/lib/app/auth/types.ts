import { type User } from "@mkboard/database";
import { type AnyUser } from "@mkboard/pages-shared";

export type AuthState = {
  readonly sessionId: string;
  readonly user: User | null;
  readonly publicUser: AnyUser;
  readonly requireUser: () => User;
};
