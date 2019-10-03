import crossfilter from '../main.js';

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("groupAll");

function createData(numRows, numColumns) {
  var rows = [];
  for (var i = 0; i < numRows; i++) {
    var rowMax = 0;
    var cols = new Array(numColumns).fill(0).map(Math.random)
    var row = Object.assign({ id: '' + i }, cols);
    rows.push(row);
  }
  return rows;
}

function getColumnMetric(col) {
  return function (row) {
    return row[col];
  }
}

function initContext(numRows, numColumns) {
  var data = createData(numRows, numColumns);
  var cf = crossfilter();
  var colDims = new Array(numColumns).fill(0).map((i, j) => cf.dimension(getColumnMetric(j)));
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

function createBatch(numColumns) {
  return {
    topic: function () {
      var ctx = initContext(8, numColumns);
      testFilter(ctx);
      return ctx;
    },
    'groupAll equals allFiltered': function (ctx) {
      assert.equal(ctx.allGroup.value(), ctx.cf.allFiltered().length);
    }
  }
}

var batch = {};
for (var nc = 1; nc < 300; nc++) {
  batch[nc + ' Dimensions'] = createBatch(nc);
}
suite.addBatch(batch);

suite.export(module);
