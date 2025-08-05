import { type Language } from "@mkboard/keyboard";
import { Enum, type EnumItem } from "@mkboard/lang";
import {
  type FontFace,
  FONTS_FACES,
  type Script,
  UBUNTU_MONO,
} from "@mkboard/themes";
import { type CSSProperties } from "react";

export class Font implements EnumItem {
  static readonly ALL = new Enum<Font>(
    ...FONTS_FACES.map((fontFace) => new Font(fontFace)),
  );

  static get default() {
    return (
      Font.ALL.find(({ name }) => name === UBUNTU_MONO.name) ?? Font.ALL.at(0)
    );
  }

  static select(language: Language) {
    return new Enum(
      ...Font.ALL.filter((font) => font.scripts.includes(language.script)),
    );
  }

  static find(fonts: Enum<Font>, font: Font) {
    return fonts.has(font) ? font : fonts.at(0);
  }

  readonly id: string;
  readonly name: string;
  readonly scripts: readonly Script[];
  readonly cssProperties: CSSProperties;

  private constructor(fontFace: FontFace) {
    this.id = `${fontFace.family}-${fontFace.weight}-${fontFace.style}`;
    this.name = fontFace.name;
    this.scripts = fontFace.scripts;
    this.cssProperties = Object.freeze({ ...fontFace.cssProperties });
    Object.freeze(this);
  }

  toString() {
    return this.id;
  }

  toJSON() {
    return this.id;
  }
}
