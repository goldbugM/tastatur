import { test } from "node:test";
import { Writer } from "@mkboard/binary";
import { ResultFaker } from "@mkboard/result";
import { HEADER, writeResult } from "@mkboard/result-io";
import { deepEqual } from "rich-assert";
import { checkFile, type FileStatus } from "./check-file.ts";

const faker = new ResultFaker();
const r0 = faker.nextResult();
const r1 = faker.nextResult();
const r2 = faker.nextResult();
const rx = faker.nextResult({ length: 0, time: 0 });

test("check empty file", () => {
  // Arrange.

  const writer = new Writer();
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "bad",
    results: [],
    invalid: [],
  } satisfies FileStatus);
});

test("check invalid header", () => {
  // Arrange.

  const writer = new Writer();
  writer.putInt32(0);
  writer.putInt32(0);
  writer.putInt32(0);
  writer.putInt32(0);
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "bad",
    results: [],
    invalid: [],
  } satisfies FileStatus);
});

test("check empty data", () => {
  // Arrange.

  const writer = new Writer();
  writer.putBuffer(HEADER);
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "bad",
    results: [],
    invalid: [],
  } satisfies FileStatus);
});

test("check invalid data", () => {
  // Arrange.

  const writer = new Writer();
  writer.putBuffer(HEADER);
  writeResult(writer, r0);
  writeResult(writer, r1);
  writeResult(writer, r2);
  writer.putInt32(0);
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "bad",
    results: [r0, r1, r2],
    invalid: [],
  } satisfies FileStatus);
});

test("check invalid results", () => {
  // Arrange.

  const writer = new Writer();
  writer.putBuffer(HEADER);
  writeResult(writer, rx);
  writeResult(writer, r0);
  writeResult(writer, r1);
  writeResult(writer, r2);
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "bad",
    results: [r0, r1, r2],
    invalid: [rx],
  } satisfies FileStatus);
});

test("check valid non-empty data", () => {
  // Arrange.

  const writer = new Writer();
  writer.putBuffer(HEADER);
  writeResult(writer, r0);
  writeResult(writer, r1);
  writeResult(writer, r2);
  const buffer = writer.buffer();

  // Act.

  const status = checkFile(buffer);

  // Assert.

  deepEqual(status, {
    type: "good",
    results: [r0, r1, r2],
  } satisfies FileStatus);
});
