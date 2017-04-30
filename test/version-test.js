var vows = require("vows"),
    assert = require("assert"),
    crossfilter = require("../"),
    semver = require('semver');

var suite = vows.describe("version");

suite.addBatch({
  "version": {
    topic: crossfilter.version,
    "has the form major.minor.patch[-...]": function(version) {
      var result = semver.satisfies(version, version)
      assert.equal(result, true)
    }
  }
});

suite.export(module);
