import { body, controller, http, pathParam } from "@fastr/controller";
import { Context } from "@fastr/core";
import { BadRequestError } from "@fastr/errors";
import { injectable } from "@fastr/invert";
import { type RouterState } from "@fastr/middleware-router";
import { HighScoresFactory } from "@mkboard/highscores";
import { type NamedUser } from "@mkboard/pages-shared";
import { PublicId } from "@mkboard/publicid";
import { type Result } from "@mkboard/result";
import { parseMessage } from "@mkboard/result-io";
import { UserDataFactory } from "@mkboard/result-userdata";
import { type AuthState, pProfileOwner } from "../auth/index.ts";

@injectable()
@controller()
export class Controller {
  constructor(
    readonly highScores: HighScoresFactory,
    readonly userData: UserDataFactory,
  ) {}

  @http.GET("/_/sync/data/{id:[a-zA-Z0-9]+}")
  async getPublicData(
    ctx: Context<RouterState & AuthState>,
    @pathParam("id", pProfileOwner) profileOwner: NamedUser,
  ) {
    const { id } = profileOwner;
    await this.userData.load(PublicId.of(id)).serve(ctx);
  }

  @http.GET("/_/sync/data")
  async getData(ctx: Context<RouterState & AuthState>) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    await this.userData.load(new PublicId(sessionId)).serve(ctx);
  }

  @http.POST("/_/sync/data")
  async postData(
    ctx: Context<RouterState & AuthState>,
    @body.binary(null, { maxLength: 1048576 }) value: Buffer,
  ) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    const results = await parseResults(value);
    await this.userData.load(new PublicId(sessionId)).append(results);
    await this.highScores.append(sessionId, results);
    ctx.response.status = 204;
  }

  @http.DELETE("/_/sync/data")
  async deleteData(ctx: Context<RouterState & AuthState>) {
    // Use session ID instead of user ID for anonymous users
    const sessionId = ctx.state.sessionId;
    await this.userData.load(new PublicId(sessionId)).delete();
    ctx.response.status = 204;
  }
}

// TODO Parse asynchronously in batches.
// TODO Convert to middleware.
async function parseResults(buffer: Buffer): Promise<Result[]> {
  const results = [];
  try {
    for (const result of parseMessage(buffer)) {
      if (result.validate()) {
        results.push(result);
      }
    }
  } catch (err: any) {
    throw new BadRequestError(err.message);
  }
  return results;
}
