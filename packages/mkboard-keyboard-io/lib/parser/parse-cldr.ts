/**
 * Parses layout definitions from the CLDR project into our own internal representation.
 *
 * @see https://cldr.unicode.org/index/keyboard-workgroup
 * @see https://unicode.org/reports/tr35/tr35-keyboards.html
 */

import { type Character, type KeyId, KeyModifier } from "@mkboard/keyboard";
import { type CodePoint, toCodePoints } from "@mkboard/unicode";
import { type Element, xml2js } from "xml-js";
import { LayoutBuilder } from "../layoutbuilder.ts";
import { makeDeadCharacter } from "./diacritics.ts";
import { type ParseResult } from "./types.ts";

export function parseCldr(text: string): ParseResult {
  const result: ParseResult = { layout: new LayoutBuilder(), warnings: [] };
  process(xml2js(text) as Element, result);
  return result;
}

function process(root: Element, result: ParseResult) {
  unescape(root);

  const combiners = new Set<CodePoint>();

  const toCharacter = (
    key: KeyId,
    codePoint: CodePoint,
    keep: boolean,
  ): Character | null => {
    return !keep && combiners.has(codePoint)
      ? makeDeadCharacter(result, key, codePoint)
      : codePoint;
  };

  const handleTransform = (stack: readonly Element[], path: string) => {
    if (path === "/keyboard/transforms/transform") {
      const [_0, _1, transformsEl, transformEl] = stack;
      const typeAttr = (transformsEl.attributes?.type ?? "") as string;
      const fromAttr = (transformEl.attributes?.from ?? "") as string;
      const toAttr = (transformEl.attributes?.to ?? "") as string;

      if (typeAttr === "simple") {
        const fromCp = [...toCodePoints(fromAttr)];
        const toCp = [...toCodePoints(toAttr)];
        if (fromCp.length === 2 && toCp.length === 1) {
          combiners.add(fromCp[0]);
        }
      }
    }
  };

  const handleMap = (stack: readonly Element[], path: string) => {
    if (path === "/keyboard/keyMap/map") {
      const [_0, _1, keyMapEl, mapEl] = stack;
      const modifiersAttr = (keyMapEl.attributes?.modifiers ?? "") as string;
      const isoAttr = (mapEl.attributes?.iso ?? "") as string;
      const toAttr = (mapEl.attributes?.to ?? "") as string;
      const transformAttr = (mapEl.attributes?.transform ?? "") as string;

      const key = toKeyId[isoAttr];
      if (key == null) {
        result.warnings.push(`Unknown iso: ${isoAttr}`);
        return;
      }

      const toCp = [...toCodePoints(toAttr)];
      const character =
        toCp.length > 1
          ? { ligature: String.fromCodePoint(...toCp) }
          : toCharacter(key, toCp[0], transformAttr === "no");
      for (const modifier of parseModifiers(modifiersAttr)) {
        result.layout.setOne(key, modifier, character);
      }
    }
  };

  walkTree(root, handleTransform);
  walkTree(root, handleMap);
}

function* parseModifiers(attr: string): Iterable<KeyModifier> {
  if (attr === "") {
    yield KeyModifier.None;
  } else {
    for (const item of attr.split(/\s+/g)) {
      switch (item) {
        case "shift":
        case "shift+caps?":
          yield KeyModifier.Shift;
          break;
        case "altR":
        case "altR+caps?":
        case "altR+caps?+shift?":
          yield KeyModifier.Alt;
          break;
        case "shift+altR":
        case "shift+altR+caps?":
        case "altR+shift":
        case "altR+shift+caps?":
          yield KeyModifier.ShiftAlt;
          break;
      }
    }
  }
}

function walkTree(
  root: Element,
  enter: (stack: readonly Element[], path: string) => void,
): void {
  const stack: Element[] = [];

  const walk = (parent: Element) => {
    stack.push(parent);
    enter(stack, stack.map(({ name }) => name).join("/"));
    for (const element of parent.elements ?? []) {
      walk(element);
    }
    stack.pop();
  };

  walk(root);
}

function unescape(root: Element): void {
  const { text, attributes, elements } = root;
  if (typeof text === "string") {
    root.text = unescapeCodePoints(text);
  }
  if (attributes != null) {
    for (const key of Object.keys(attributes)) {
      const value = attributes[key];
      if (typeof value === "string") {
        attributes[key] = unescapeCodePoints(value);
      }
    }
  }
  if (elements != null) {
    for (const element of elements) {
      unescape(element);
    }
  }
}

function unescapeCodePoints(v: string): string {
  return v.replace(/\\u\{([a-zA-Z0-9]+)\}/g, (_, m) =>
    String.fromCodePoint(Number.parseInt(m, 16)),
  );
}

const toKeyId: Record<string, KeyId> = {
  // Row E
  E00: "Backquote",
  E01: "Digit1",
  E02: "Digit2",
  E03: "Digit3",
  E04: "Digit4",
  E05: "Digit5",
  E06: "Digit6",
  E07: "Digit7",
  E08: "Digit8",
  E09: "Digit9",
  E10: "Digit0",
  E11: "Minus",
  E12: "Equal",
  // Row D
  D01: "KeyQ",
  D02: "KeyW",
  D03: "KeyE",
  D04: "KeyR",
  D05: "KeyT",
  D06: "KeyY",
  D07: "KeyU",
  D08: "KeyI",
  D09: "KeyO",
  D10: "KeyP",
  D11: "BracketLeft",
  D12: "BracketRight",
  D13: "Backslash",
  // Row C
  C01: "KeyA",
  C02: "KeyS",
  C03: "KeyD",
  C04: "KeyF",
  C05: "KeyG",
  C06: "KeyH",
  C07: "KeyJ",
  C08: "KeyK",
  C09: "KeyL",
  C10: "Semicolon",
  C11: "Quote",
  C12: "Backslash",
  // Row B
  B00: "IntlBackslash",
  B01: "KeyZ",
  B02: "KeyX",
  B03: "KeyC",
  B04: "KeyV",
  B05: "KeyB",
  B06: "KeyN",
  B07: "KeyM",
  B08: "Comma",
  B09: "Period",
  B10: "Slash",
  B11: "IntlRo",
  // Row A
  A03: "Space",
};
