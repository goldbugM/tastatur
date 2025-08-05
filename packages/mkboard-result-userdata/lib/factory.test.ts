import { test } from "node:test";
import { DataDir } from "@mkboard/config";
import { PublicId } from "@mkboard/publicid";
import { equal, throws } from "rich-assert";
import { UserDataFactory } from "./index.ts";

test("get file name for user id", () => {
  const factory = new UserDataFactory(new DataDir("/mkboard"));

  equal(
    factory.getFile(new PublicId(1)).name,
    "/mkboard/user_stats/000/000/000000001",
  );
  equal(
    factory.getFile(new PublicId(123_456_789)).name,
    "/mkboard/user_stats/123/456/123456789",
  );
  throws(() => {
    factory.getFile(PublicId.example1);
  });
});
