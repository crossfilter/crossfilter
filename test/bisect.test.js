import { describe, expect, it } from "vitest";
import crossfilter from "../main.js";

describe("bisect", () => {
  it("is the same as bisect right", () => {
    expect(crossfilter.bisect).toEqual(crossfilter.bisect.right);
  });
});

describe("bisect.left", () => {
  const bisect = crossfilter.bisect.left;
  it("finds the index of an exact match", () => {
    var array = [1, 2, 3];
    expect(bisect(array, 1, 0, 3)).toBe(0);
    expect(bisect(array, 2, 0, 3)).toBe(1);
    expect(bisect(array, 3, 0, 3)).toBe(2);
  });

  it("finds the index of the first match", () => {
    var array = [1, 2, 2, 3];
    expect(bisect(array, 1, 0, 4)).toBe(0);
    expect(bisect(array, 2, 0, 4)).toBe(1);
    expect(bisect(array, 3, 0, 4)).toBe(3);
  });

  it("finds the insertion point of a non-exact match", () => {
    var array = [1, 2, 3];
    expect(bisect(array, 0.5, 0, 3)).toBe(0);
    expect(bisect(array, 1.5, 0, 3)).toBe(1);
    expect(bisect(array, 2.5, 0, 3)).toBe(2);
    expect(bisect(array, 3.5, 0, 3)).toBe(3);
  });

  it("observes the lower bound", () => {
    var array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2, 5)).toBe(2);
    expect(bisect(array, 1, 2, 5)).toBe(2);
    expect(bisect(array, 2, 2, 5)).toBe(2);
    expect(bisect(array, 3, 2, 5)).toBe(2);
    expect(bisect(array, 4, 2, 5)).toBe(3);
    expect(bisect(array, 5, 2, 5)).toBe(4);
    expect(bisect(array, 6, 2, 5)).toBe(5);
  });

  it("observes the lower and upper bounds", () => {
    var array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2, 3)).toBe(2);
    expect(bisect(array, 1, 2, 3)).toBe(2);
    expect(bisect(array, 2, 2, 3)).toBe(2);
    expect(bisect(array, 3, 2, 3)).toBe(2);
    expect(bisect(array, 4, 2, 3)).toBe(3);
    expect(bisect(array, 5, 2, 3)).toBe(3);
    expect(bisect(array, 6, 2, 3)).toBe(3);
  });

  it("large arrays", () => {
    var array = [],
      i = 1 << 30;
    array[i++] = 1;
    array[i++] = 2;
    array[i++] = 3;
    array[i++] = 4;
    array[i++] = 5;
    expect(bisect(array, 0, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 1, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 2, i - 5, i)).toBe(i - 4);
    expect(bisect(array, 3, i - 5, i)).toBe(i - 3);
    expect(bisect(array, 4, i - 5, i)).toBe(i - 2);
    expect(bisect(array, 5, i - 5, i)).toBe(i - 1);
    expect(bisect(array, 6, i - 5, i)).toBe(i - 0);
  });
});

describe("bisect.by(value).left", () => {
  const bisect = crossfilter.bisect.by(function (d) {
    return d.value;
  }).left;

  it("finds the index of an exact match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 1, 0, 3)).toBe(0);
    expect(bisect(array, 2, 0, 3)).toBe(1);
    expect(bisect(array, 3, 0, 3)).toBe(2);
  });

  it("finds the index of the first match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 1, 0, 4)).toBe(0);
    expect(bisect(array, 2, 0, 4)).toBe(1);
    expect(bisect(array, 3, 0, 4)).toBe(3);
  });

  it("finds the insertion point of a non-exact match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 0.5, 0, 3)).toBe(0);
    expect(bisect(array, 1.5, 0, 3)).toBe(1);
    expect(bisect(array, 2.5, 0, 3)).toBe(2);
    expect(bisect(array, 3.5, 0, 3)).toBe(3);
  });

  it("observes the lower bound", () => {
    var array = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];
    expect(bisect(array, 0, 2, 5)).toBe(2);
    expect(bisect(array, 1, 2, 5)).toBe(2);
    expect(bisect(array, 2, 2, 5)).toBe(2);
    expect(bisect(array, 3, 2, 5)).toBe(2);
    expect(bisect(array, 4, 2, 5)).toBe(3);
    expect(bisect(array, 5, 2, 5)).toBe(4);
    expect(bisect(array, 6, 2, 5)).toBe(5);
  });

  it("observes the lower and upper bounds", () => {
    var array = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];
    expect(bisect(array, 0, 2, 3)).toBe(2);
    expect(bisect(array, 1, 2, 3)).toBe(2);
    expect(bisect(array, 2, 2, 3)).toBe(2);
    expect(bisect(array, 3, 2, 3)).toBe(2);
    expect(bisect(array, 4, 2, 3)).toBe(3);
    expect(bisect(array, 5, 2, 3)).toBe(3);
    expect(bisect(array, 6, 2, 3)).toBe(3);
  });

  it("large arrays", () => {
    var array = [],
      i = 1 << 30;
    array[i++] = { value: 1 };
    array[i++] = { value: 2 };
    array[i++] = { value: 3 };
    array[i++] = { value: 4 };
    array[i++] = { value: 5 };
    expect(bisect(array, 0, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 1, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 2, i - 5, i)).toBe(i - 4);
    expect(bisect(array, 3, i - 5, i)).toBe(i - 3);
    expect(bisect(array, 4, i - 5, i)).toBe(i - 2);
    expect(bisect(array, 5, i - 5, i)).toBe(i - 1);
    expect(bisect(array, 6, i - 5, i)).toBe(i - 0);
  });
});

describe("bisect.right", () => {
  const bisect = crossfilter.bisect.right;

  it("finds the index after an exact match", () => {
    var array = [1, 2, 3];
    expect(bisect(array, 1, 0, 3)).toBe(1);
    expect(bisect(array, 2, 0, 3)).toBe(2);
    expect(bisect(array, 3, 0, 3)).toBe(3);
  });

  it("finds the index after the last match", () => {
    var array = [1, 2, 2, 3];
    expect(bisect(array, 1, 0, 4)).toBe(1);
    expect(bisect(array, 2, 0, 4)).toBe(3);
    expect(bisect(array, 3, 0, 4)).toBe(4);
  });

  it("finds the insertion point of a non-exact match", () => {
    var array = [1, 2, 3];
    expect(bisect(array, 0.5, 0, 3)).toBe(0);
    expect(bisect(array, 1.5, 0, 3)).toBe(1);
    expect(bisect(array, 2.5, 0, 3)).toBe(2);
    expect(bisect(array, 3.5, 0, 3)).toBe(3);
  });

  it("observes the lower bound", () => {
    var array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2, 5)).toBe(2);
    expect(bisect(array, 1, 2, 5)).toBe(2);
    expect(bisect(array, 2, 2, 5)).toBe(2);
    expect(bisect(array, 3, 2, 5)).toBe(3);
    expect(bisect(array, 4, 2, 5)).toBe(4);
    expect(bisect(array, 5, 2, 5)).toBe(5);
    expect(bisect(array, 6, 2, 5)).toBe(5);
  });

  it("observes the lower and upper bounds", () => {
    var array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2, 3)).toBe(2);
    expect(bisect(array, 1, 2, 3)).toBe(2);
    expect(bisect(array, 2, 2, 3)).toBe(2);
    expect(bisect(array, 3, 2, 3)).toBe(3);
    expect(bisect(array, 4, 2, 3)).toBe(3);
    expect(bisect(array, 5, 2, 3)).toBe(3);
    expect(bisect(array, 6, 2, 3)).toBe(3);
  });

  it("large arrays", () => {
    var array = [],
      i = 1 << 30;
    array[i++] = 1;
    array[i++] = 2;
    array[i++] = 3;
    array[i++] = 4;
    array[i++] = 5;
    expect(bisect(array, 0, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 1, i - 5, i)).toBe(i - 4);
    expect(bisect(array, 2, i - 5, i)).toBe(i - 3);
    expect(bisect(array, 3, i - 5, i)).toBe(i - 2);
    expect(bisect(array, 4, i - 5, i)).toBe(i - 1);
    expect(bisect(array, 5, i - 5, i)).toBe(i - 0);
    expect(bisect(array, 6, i - 5, i)).toBe(i - 0);
  });
});

describe("bisect.by(value).right", () => {
  const bisect = crossfilter.bisect.by(function (d) {
    return d.value;
  }).right;

  it("finds the index after an exact match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 1, 0, 3), 1);
    expect(bisect(array, 2, 0, 3), 2);
    expect(bisect(array, 3, 0, 3), 3);
  });

  it("finds the index after the last match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 1, 0, 4), 1);
    expect(bisect(array, 2, 0, 4), 3);
    expect(bisect(array, 3, 0, 4), 4);
  });

  it("finds the insertion point of a non-exact match", () => {
    var array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(bisect(array, 0.5, 0, 3), 0);
    expect(bisect(array, 1.5, 0, 3), 1);
    expect(bisect(array, 2.5, 0, 3), 2);
    expect(bisect(array, 3.5, 0, 3), 3);
  });

  it("observes the lower bound", () => {
    var array = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];
    expect(bisect(array, 0, 2, 5), 2);
    expect(bisect(array, 1, 2, 5), 2);
    expect(bisect(array, 2, 2, 5), 2);
    expect(bisect(array, 3, 2, 5), 3);
    expect(bisect(array, 4, 2, 5), 4);
    expect(bisect(array, 5, 2, 5), 5);
    expect(bisect(array, 6, 2, 5), 5);
  });

  it("observes the lower and upper bounds", () => {
    var array = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ];
    expect(bisect(array, 0, 2, 3), 2);
    expect(bisect(array, 1, 2, 3), 2);
    expect(bisect(array, 2, 2, 3), 2);
    expect(bisect(array, 3, 2, 3), 3);
    expect(bisect(array, 4, 2, 3), 3);
    expect(bisect(array, 5, 2, 3), 3);
    expect(bisect(array, 6, 2, 3), 3);
  });

  it("large arrays", () => {
    var array = [],
      i = 1 << 30;
    array[i++] = { value: 1 };
    array[i++] = { value: 2 };
    array[i++] = { value: 3 };
    array[i++] = { value: 4 };
    array[i++] = { value: 5 };
    expect(bisect(array, 0, i - 5, i)).toBe(i - 5);
    expect(bisect(array, 1, i - 5, i)).toBe(i - 4);
    expect(bisect(array, 2, i - 5, i)).toBe(i - 3);
    expect(bisect(array, 3, i - 5, i)).toBe(i - 2);
    expect(bisect(array, 4, i - 5, i)).toBe(i - 1);
    expect(bisect(array, 5, i - 5, i)).toBe(i - 0);
    expect(bisect(array, 6, i - 5, i)).toBe(i - 0);
  });
});
