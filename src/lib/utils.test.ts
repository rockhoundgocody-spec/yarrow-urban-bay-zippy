import assert from "node:assert/strict";
import test from "node:test";
import { uid } from "./utils.ts";

test("uid generates string with default prefix", () => {
  const id = uid();
  assert.ok(id.startsWith("id_"), `Expected ${id} to start with 'id_'`);
});

test("uid generates string with custom prefix", () => {
  const id = uid("tr");
  assert.ok(id.startsWith("tr_"), `Expected ${id} to start with 'tr_'`);
});

test("uid generates unique values", () => {
  const ids = new Set(Array.from({ length: 100 }, () => uid("test")));
  assert.equal(ids.size, 100);
});
