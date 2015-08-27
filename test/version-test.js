var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../");

var suite = vows.describe("version");

suite.addBatch({
  "version": {
    topic: crossfilter.version,
    "has the form major.minor.patch[-...]": function(version) {
      assert.match(version, /^[0-9]+\.[0-9]+\.[0-9]+-?[0-9A-Za-z-\.]./);
    }
  }
});

suite.export(module);
