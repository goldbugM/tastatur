import { test } from "node:test";
import { equal } from "rich-assert";
import { DataDir } from "./datadir.ts";

test("get file name for user id", () => {
  const dataDir = new DataDir("/mkboard");

  equal(dataDir.userSettingsFile(1), "/mkboard/user_settings/000/000/000000001");
  equal(
    dataDir.userSettingsFile(123_456_789),
    "/mkboard/user_settings/123/456/123456789",
  );
  equal(dataDir.userStatsFile(1), "/mkboard/user_stats/000/000/000000001");
  equal(
    dataDir.userStatsFile(123_456_789),
    "/mkboard/user_stats/123/456/123456789",
  );
});
