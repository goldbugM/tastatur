import { join } from "node:path";
import { type Binder, inject, type Module, provides } from "@fastr/invert";
import { loadManifestSync, Manifest } from "@mkboard/assets";

export class ManifestModule implements Module {
  configure(binder: Binder) {}

  @provides({ singleton: true })
  provideManifest(@inject("publicDir") publicDir: string): Manifest {
    return loadManifestSync(join(publicDir, "assets", "manifest.json"));
  }
}
