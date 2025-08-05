import { allToRoutes } from "@fastr/controller";
import { type Middleware } from "@fastr/core";
import { Router } from "@fastr/middleware-router";
// Removed AuthController - no authentication needed
// import { Controller as AuthController } from "./auth/index.ts";
import { Controller as CheckoutController } from "./checkout/index.ts";
import { Controller as GameController } from "./game/index.ts";
import { Controller as HighScoresController } from "./highscores/index.ts";
import { Controller as PageController } from "./page/index.ts";
import { Controller as ProfileController } from "./profile/index.ts";
import { Controller as SettingsController } from "./settings/index.ts";
import { Controller as SitemapController } from "./sitemap/index.ts";
import { Controller as SyncController } from "./sync/index.ts";

export function mainRoutes(): Middleware<any> {
  return new Router()
    .registerAll(
      allToRoutes(
        // AuthController, // Removed - no authentication needed
        CheckoutController,
        HighScoresController,
        PageController,
        ProfileController,
        SettingsController,
        SitemapController,
        SyncController,
      ),
    )
    .middleware();
}

export function gameRoutes(): Middleware<any> {
  return new Router().registerAll(allToRoutes(GameController)).middleware();
}
