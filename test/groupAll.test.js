import { describe, expect, it } from "vitest";
import crossfilter from "../main.js";

function createData(numRows, numColumns) {
  var rows = [];
  for (var i = 0; i < numRows; i++) {
    var cols = new Array(numColumns).fill(0).map(Math.random);
    var row = Object.assign({ id: "" + i }, cols);
    rows.push(row);
  }
  return rows;
}

function getColumnMetric(col) {
  return function (row) {
    return row[col];
  };
}

function initContext(numRows, numColumns) {
  var data = createData(numRows, numColumns);
  var cf = crossfilter();
  var colDims = new Array(numColumns)
    .fill(0)
    .map((i, j) => cf.dimension(getColumnMetric(j)));
  var allGroup = cf.groupAll();
  cf.add(data);
  return { cf, data, colDims, allGroup };
}

function testFilter(ctx) {
  // Calculates value, which clears a reset flag.
  ctx.allGroup.value();
  // ctx.idDim.filterFunction(id => false);
  ctx.colDims[ctx.colDims.length - 1].filterRange([2, 3]); // Should filter out all values
}

var cases = [];
for (var nc = 1; nc < 300; nc++) {
  cases.push({ nc });
}

describe.each(cases)("$nc Dimensions", ({ nc }) => {
  const ctx = initContext(8, nc);
  testFilter(ctx);

  it("groupAll equals allFiltered", () => {
    expect(ctx.allGroup.value()).toBe(ctx.cf.allFiltered().length);
  });
});
