import { type Context, type Middleware, type Next } from "@fastr/core";
import { randomString, type SessionState } from "@fastr/middleware-session";
import { User } from "@mkboard/database";
import { type AuthState } from "./types.ts";

export function loadUser(): Middleware<SessionState & AuthState> {
  return async (
    ctx: Context<SessionState & AuthState>,
    next: Next,
  ): Promise<void> => {
    const { state } = ctx;
    Object.assign(state, await makeAuthState(state));
    await next();
  };
}

async function makeAuthState(
  state: SessionState & AuthState,
): Promise<AuthState> {
  const { session } = state;
  const sessionId = session.id ?? randomString(10);
  // Always use anonymous user - no authentication required
  const user: User | null = null;
  const publicUser = User.toPublicUser(user, sessionId);
  return {
    sessionId,
    user,
    publicUser,
    requireUser: () => {
      // Return null instead of throwing error - no authentication required
      return null as any;
    },
  };
}
