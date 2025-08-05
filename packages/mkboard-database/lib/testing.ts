import { after, before, beforeEach } from "node:test";
import { makeKnex } from "@mkboard/config";
import { Model } from "objection";
import { Order, User, UserExternalId, UserLoginRequest } from "./model.ts";
import { createSchema } from "./schema.ts";

export function useDatabase() {
  const knex = makeKnex();

  before(async () => {
    await createSchema(knex);
  });

  beforeEach(async () => {
    await clearTables();
    await seedModels();
  });

  after(async () => {
    await knex.destroy();
  });
}

export async function seedModels() {
  await User.query().delete();
  await User.query().insertGraph([
    {
      email: "user1@mkboard.com",
      name: "user1",
      createdAt: new Date("2001-02-03T04:05:06Z"),
      externalIds: [
        {
          provider: "provider1",
          externalId: "externalId1",
          name: "externalName1",
          url: "url1",
          imageUrl: "imageUrl1",
          createdAt: new Date("2001-02-03T04:05:06Z"),
        } as UserExternalId,
      ],
    } as User,
    {
      email: "user2@mkboard.com",
      name: "user2",
      createdAt: new Date("2001-02-03T04:05:06Z"),
      externalIds: [
        {
          provider: "provider2",
          externalId: "externalId2",
          name: "externalName2",
          url: "url2",
          imageUrl: "imageUrl2",
          createdAt: new Date("2001-02-03T04:05:06Z"),
        } as UserExternalId,
      ],
    } as User,
    {
      email: "user3@mkboard.com",
      name: "user3",
      createdAt: new Date("2001-02-03T04:05:06Z"),
      externalIds: [
        {
          provider: "provider3",
          externalId: "externalId3",
          name: "externalName3",
          url: "url3",
          imageUrl: "imageUrl3",
          createdAt: new Date("2001-02-03T04:05:06Z"),
        } as UserExternalId,
      ],
    } as User,
  ]);
}

export async function clearTables() {
  await clearTable(UserLoginRequest.tableName);
  await clearTable(Order.tableName);
  await clearTable(UserExternalId.tableName);
  await clearTable(User.tableName);
}

export async function clearTable(name: string) {
  const knex = Model.knex();
  const tpl = (sql: string) => {
    return sql.replaceAll("{name}", name);
  };
  await knex.raw(tpl("DELETE FROM `{name}`"));
  switch (knex.client.config.__client) {
    case "mysql":
      await knex.raw(tpl("ALTER TABLE `{name}` AUTO_INCREMENT = 1"));
      break;
    case "sqlite":
      await knex.raw(
        tpl("UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = '{name}';"),
      );
      break;
  }
}
