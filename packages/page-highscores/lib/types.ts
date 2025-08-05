import { type Layout } from "@mkboard/keyboard";
import { type AnyUser } from "@mkboard/pages-shared";

export type Entry = {
  readonly user: AnyUser;
  readonly layout: Layout;
  readonly speed: number;
  readonly score: number;
};

export type EntriesProps = {
  readonly entries: readonly Entry[];
};
