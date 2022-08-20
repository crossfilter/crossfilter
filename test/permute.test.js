import crossfilter from "../main.js";
import assert from "assert";
import { describe, expect, it } from "vitest";

describe("permute", () => {
  const permute = crossfilter.permute;

  it("permutes according to the specified index", function () {
    assert.deepStrictEqual(permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
    assert.deepStrictEqual(permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
    assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
  });

  it("does not modify the input array", function () {
    var input = [3, 4, 5];
    permute(input, [2, 1, 0]);
    assert.deepStrictEqual(input, [3, 4, 5]);
  });

  it("can duplicate input values", function () {
    assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
    assert.deepStrictEqual(permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
    assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
  });

  it("can return more elements", function () {
    assert.deepStrictEqual(permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
    assert.deepStrictEqual(permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
  });

  it("can return fewer elements", function () {
    assert.deepStrictEqual(permute([3, 4, 5], [0]), [3]);
    assert.deepStrictEqual(permute([3, 4, 5], [1, 2]), [4, 5]);
    assert.deepStrictEqual(permute([3, 4, 5], []), []);
  });

  it("can return undefined elements", function () {
    var v1 = permute([3, 4, 5], [10]);
    assert.equal(v1.length, 1);
    expect(v1[0]).toBeUndefined();
    var v2 = permute([3, 4, 5], [-1]);
    assert.equal(v2.length, 1);
    expect(v2[0]).toBeUndefined();
    var v3 = permute([3, 4, 5], [0, -1]);
    assert.equal(v3.length, 2);
    assert.equal(v3[0], 3);
    expect(v3[1]).toBeUndefined();
  });
});
