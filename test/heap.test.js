import crossfilter from "../main.js";
import assert from "assert";
import { describe, it } from "vitest";

describe("heap", () => {
  const heap = crossfilter.heap;

  it("children are greater than or equal to parents", function () {
    var array = [6, 5, 3, 1, 8, 7, 2, 4],
      n = array.length;
    assert.strictEqual(heap(array, 0, n), array);
    assert.equal(array[0], 1);
    for (var i = 1; i < n; ++i) assert(array[i] >= array[(i - 1) >> 1]);
  });
  it("creates a heap from a subset of the array", function () {
    var array = [6, 5, 3, 1, 8, 7, 2, 4],
      n = 6;
    assert.strictEqual(heap(array, 0, n), array);
    assert.equal(array[0], 1);
    for (var i = 1; i < n; ++i) assert(array[i] >= array[(i - 1) >> 1]);
  });

  describe("sort", () => {
    it("sorts an existing heap in descending order", function () {
      var array = [1, 4, 2, 5, 8, 7, 3, 6],
        n = array.length;
      heap.sort(array, 0, n);
      assert.deepEqual(array, [8, 7, 6, 5, 4, 3, 2, 1]);
    });
    it("sorts a two-element heap in descending order", function () {
      var array = [1, 4],
        n = array.length;
      heap.sort(array, 0, n);
      assert.deepEqual(array, [4, 1]);
    });
  });
});
