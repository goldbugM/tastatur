import { isPlainObject } from "@mkboard/lang";
import { Manifest } from "./manifest.ts";
import { type Entrypoint, type Script, type StylesheetLink } from "./types.ts";

export type ManifestJson = {
  readonly entrypoints: EntrypointsJson;
  readonly assets: AssetsJson;
};

export type EntrypointsJson = Record<string, RawEntrypointJson>;

export type RawEntrypointJson = {
  readonly assets: AssetGroupsJson;
  readonly preload?: AssetGroupsJson;
  readonly prefetch?: AssetGroupsJson;
};

export type AssetGroupsJson = {
  readonly js?: readonly string[];
  readonly css?: readonly string[];
};

export type AssetsJson = Record<string, string>;

export function manifestFromJson(json: ManifestJson): Manifest {
  if (
    !isPlainObject(json) ||
    !isPlainObject(json.entrypoints) ||
    !isPlainObject(json.assets)
  ) {
    throw new TypeError();
  }

  const entrypoints = new Map(
    Object.entries(json.entrypoints).map(([name, value]) => [
      name,
      makeEntrypoint(value),
    ]),
  );

  const assets = new Map(Object.entries(json.assets));

  return new (class extends Manifest {
    entrypoint(name: string): Entrypoint {
      const entrypoint = entrypoints.get(name);
      if (entrypoint == null) {
        throw new Error(`Unknown entrypoint "${name}"`);
      } else {
        return entrypoint;
      }
    }

    assetPath(name: string): string {
      // Try the original path first
      let path = assets.get(name);

      // If not found, try converting forward slashes to backslashes (Windows manifest format)
      if (path == null) {
        const backslashPath = name.replace(/\//g, "\\");
        path = assets.get(backslashPath);
      }

      if (path == null) {
        throw new Error(`Unknown asset "${name}"`);
      } else {
        // Normalize Windows backslashes to forward slashes for web compatibility
        return path.replace(/\\/g, "/");
      }
    }
  })();
}

function makeEntrypoint({
  assets: { js = [], css = [] },
}: RawEntrypointJson): Entrypoint {
  return {
    scripts: js.map(makeEntrypointScript),
    stylesheets: css.map(makeEntrypointStylesheet),
    preload: [],
    prefetch: [],
  };
}

function makeEntrypointScript(path: string): Script {
  return {
    src: path.replace(/\\/g, "/"),
    defer: true,
  };
}

function makeEntrypointStylesheet(path: string): StylesheetLink {
  return {
    href: path.replace(/\\/g, "/"),
    rel: "stylesheet",
  };
}
