import { type Context } from "@fastr/core";
import { NotFoundError } from "@fastr/errors";
import { type RouterState } from "@fastr/middleware-router";
import { User } from "@mkboard/database";
import { type AbstractAdapter } from "@mkboard/oauth";
import { type NamedUser } from "@mkboard/pages-shared";
import { PublicId } from "@mkboard/publicid";
import { AdapterFactory } from "./module.ts";

export const pAdapter = (
  ctx: Context<RouterState>,
  value: string,
): AbstractAdapter => {
  const { container } = ctx;
  const redirectUri = ctx.state.router.makePath("oauth-callback", {
    adapter: value,
  });
  if (container.has(AdapterFactory, value)) {
    return container.get(AdapterFactory, value).makeAdapter(redirectUri);
  }
  throw new NotFoundError();
};

export const pProfileOwner = async (
  ctx: Context<RouterState>,
  value: string,
): Promise<NamedUser> => {
  const publicId = PublicId.parse(value);
  if (publicId != null) {
    const profileOwner = await User.loadProfileOwner(publicId);
    if (profileOwner != null) {
      return profileOwner;
    }
  }
  throw new NotFoundError();
};
