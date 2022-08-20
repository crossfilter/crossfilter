import crossfilter from "../main.js";
import assert from "assert";
import { describe, it } from "vitest";

describe("select", () => {
  describe("heapselect", () => {
    const select = crossfilter.heapselect;

    it("can select from a small array of positive integers", function () {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.deepStrictEqual(select(array, 0, array.length, 1), [8]);
      assert.deepStrictEqual(
        select(array, 0, array.length, 2).sort(descending),
        [8, 7]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 3).sort(descending),
        [8, 7, 6]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 4).sort(descending),
        [8, 7, 6, 5]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 5).sort(descending),
        [8, 7, 6, 5, 4]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 6).sort(descending),
        [8, 7, 6, 5, 4, 3]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 7).sort(descending),
        [8, 7, 6, 5, 4, 3, 2]
      );
      assert.deepStrictEqual(
        select(array, 0, array.length, 8).sort(descending),
        [8, 7, 6, 5, 4, 3, 2, 1]
      );
    });

    it("does not affect the original order; returns a copy", function () {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      select(array, 0, array.length, 4);
      assert.deepStrictEqual(array, [6, 5, 3, 1, 8, 7, 2, 4]);
    });

    it("returns fewer than k elements when k is too big", function () {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      assert.deepStrictEqual(
        select(array, 0, array.length, 8).sort(descending),
        [8, 7, 6, 5, 4, 3, 2, 1]
      );
    });

    it("returns an empty array when selecting nothing", function () {
      const array = [];
      const select2 = select.by(function (d) {
        return d.value;
      });
      assert.deepStrictEqual(select2(array, 0, array.length, 1), []);
    });

    it("the returned array is a binary heap", function () {
      var array = [6, 5, 3, 1, 8, 7, 2, 4];
      for (var i = 0; i < 10; ++i)
        assert(heapy(select(array, 0, array.length, i)), array + "");
    });
  });
});

function descending(a, b) {
  return a > b ? -1 : a < b ? 1 : 0;
}

function heapy(array) {
  var n = array.length;
  for (var i = 1; i < n; ++i) {
    if (array[i] < array[(i - 1) >> 1]) {
      return false;
    }
  }
  return true;
}
