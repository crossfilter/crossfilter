var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("..");

var suite = vows.describe("groupAll2");

function createData(numRows, numColumns) {
  // return [{0: 0.04584263637661934, 1: 0.027260150760412216, 2: 0.029145950451493263, 3: 0.029257070273160934, 4: 0.028009066358208656, 5: 0.03344950079917908, 6: 0.05687376856803894, 7: 0.028147263452410698, 8: 0.03733937814831734, 9: 0.027629362419247627, 10: 0.02972426451742649, 11: 0.049829669296741486, 12: 0.030096372589468956, 13: 0.030459284782409668, 14: 0.029009085148572922, 15: 0.02696641907095909, 16: 0.03072061948478222, 17: 0.02805091254413128, 18: 0.02742941863834858, 19: 0.027721112594008446, 20: 0.031193511560559273, 21: 0.0398358553647995, 22: 0.027959173545241356, 23: 0.03184787556529045, 24: 0.05329184979200363, 25: 0.030220724642276764, 26: 0.028163563460111618, 27: 0.039673853665590286, 28: 0.029225096106529236, 29: 0.03562719747424126, id: "0"}];
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    let rowMax = 0;
    const cols = new Array(numColumns).fill(0).map(Math.random)
    const row = {id: '' + i, ...cols};
    rows.push(row);
  }
  return rows;
}

function getColumnMetric(col) {
  return function(row) {
    return row[col];
  }
}

// function idMetric(row) { return row.id; }

function initContext(numRows, numColumns) {
  const data = createData(numRows, numColumns);
  const cf = crossfilter();
  const colDims = new Array(numColumns).fill(0).map((i, j) => cf.dimension(getColumnMetric(j)));
  // const idDim = cf.dimension(idMetric);
  const allGroup = cf.groupAll();
  cf.add(data);
  return { cf, data, colDims, allGroup };
}

function testA(ctx) {
  console.log('PRE value: ' + ctx.allGroup.value()); // <--- This line causes the problem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // ctx.idDim.filterFunction(id => false);
  ctx.colDims[ctx.colDims.length - 1].filterRange([2, 3]); // Should filter out all values
}

function createBatch(numColumns) {
  return {
    topic: function() {
      const ctx = initContext(100, numColumns);
      testA(ctx);
      return ctx;
    },
    'groupAll equals allFiltered': function(ctx) {
      assert.equal(ctx.allGroup.value(), ctx.cf.allFiltered().length);
    }
  }
}

const batch = {};
for(let nc = 1; nc < 300; nc++) {
  batch[nc + ' Dimensions'] = createBatch(nc);
}
suite.addBatch(batch);

suite.export(module);