import { type ReactNode, type RefObject } from "react";
import {
  type AnchorProps,
  type ClassName,
  type Focusable,
  type FocusProps,
  type KeyboardProps,
  type MouseProps,
} from "../types.ts";

export type LinkButtonProps = {
  readonly children?: ReactNode;
  readonly className?: ClassName;
  readonly label?: ReactNode;
  readonly ref?: RefObject<LinkButtonRef | null>;
  readonly title?: string;
} & FocusProps &
  MouseProps &
  KeyboardProps &
  AnchorProps;

export type LinkButtonRef = Focusable;
