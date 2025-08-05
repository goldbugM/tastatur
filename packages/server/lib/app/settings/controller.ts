import { body, controller, http } from "@fastr/controller";
import { Context } from "@fastr/core";
import { injectable } from "@fastr/invert";
import { type RouterState } from "@fastr/middleware-router";
import { Settings } from "@mkboard/settings";
import { SettingsDatabase } from "@mkboard/settings-database";
import { type AuthState } from "../auth/index.ts";

@injectable()
@controller()
export class Controller {
  constructor(readonly database: SettingsDatabase) {}

  @http.GET("/_/sync/settings")
  async getSettings(ctx: Context<RouterState & AuthState>) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    ctx.response.body = (await this.database.get(sessionId))?.toJSON() ?? {};
    ctx.response.headers.set("Cache-Control", "private, no-cache");
  }

  @http.PUT("/_/sync/settings")
  async putSettings(
    ctx: Context<RouterState & AuthState>,
    @body.json(null, { maxLength: 65536 }) value: unknown,
  ) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    await this.database.set(sessionId, new Settings(value as any));
    ctx.response.status = 204;
  }

  @http.DELETE("/_/sync/settings")
  async deleteSettings(ctx: Context<RouterState & AuthState>) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    await this.database.set(sessionId, null);
    ctx.response.status = 204;
  }
}
