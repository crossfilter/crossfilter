import crossfilter from '../main.js';

var vows = require("vows"),
    assert = require("assert"),
    sinon = require("sinon"),
    d3 = require("d3");

var suite = vows.describe("crossfilter");

var testData = [
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,3]},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", tags: [2,4,5]},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: null, type: "cash", tags: [2,4,5]},
  {date: "2011-11-14T17:02:03Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: []},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: null, type: "cash", tags: [2,4,5]},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [-1, 0, 3, 4]},
  {date: "2011-11-14T17:33:46Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T17:33:59Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]},
  {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa", tags: [2,4,5]},
  {date: "2011-11-14T17:52:02Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T18:02:42Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T18:02:51Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,3]},
  {date: "2011-11-14T18:12:54Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]},
  {date: "2011-11-14T18:14:53Z", quantity: 2, total: 100, tip: null, type: "cash", tags: [2,3,4]},
  {date: "2011-11-14T18:45:24Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]},
  {date: "2011-11-14T20:06:33Z", quantity: 1, total: 100, tip: null, type: "cash", tags: [2,4,5]},
  {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T21:05:36Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T21:22:31Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [1,3]},
  {date: "2011-11-14T21:26:30Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T21:30:55Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T21:31:05Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab", tags: [1,3]},
  {date: "2011-11-14T22:34:28Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T22:51:40Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]},
  {date: "2011-11-14T23:06:25Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
  {date: "2011-11-14T23:07:58Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,3]},
  {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]},
  {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]},
  {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
  {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]}
];

suite.addBatch({
  "crossfilter": {
    topic: function() {
      var data = crossfilter(testData);

      // be sure you don't clobber a built-in method if you do this!
      try {
        data.date = data.dimension(function(d) { return new Date(d.date); });
        data.quantity = data.dimension(function(d) { return d.quantity; });
        data.tip = data.dimension(function(d) { return d.tip; });
        data.total = data.dimension(function(d) { return d.total; });
        data.type = data.dimension(function(d) { return d.type; });
        data.typeByString = data.dimension('type');
        data.tags = data.dimension(function(d) { return d.tags; }, true);
        data.firstTag = data.dimension('tags[0]');
        data.firstTagDot = data.dimension('tags.0');
        data.year = data.dimension('getYear');

      } catch (e) {
        console.log(e.stack);
      }

      return data;
    },

    "up to 32 dimensions supported": function() {
      var data = crossfilter([]);
      for (var i = 0; i < 32; i++) data.dimension(function() { return 0; });
    },

    "can add and remove 32 dimensions repeatedly": function() {
      var data = crossfilter([]),
          dimensions = [];
      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 32; i++) dimensions.push(data.dimension(function() { return 0; }));
        while (dimensions.length) dimensions.pop().dispose();
      }
    },

    "empty data": {
      topic: function() {
        var data = crossfilter();
        try {
          data.quantity = data.dimension(function(d) { return d.quantity; });
        } catch (e) {
          console.log(e.stack);
        }
        return data;
      },

      "groupAll": {
        topic: function(data) {
          data.allGrouped = data.groupAll();
          return data;
        },
        "value": function(data) {
          assert.equal(data.allGrouped.value(), 0);
        },
        "value after removing all data": function(data) {
          try {
            data.add([{quantity: 2, total: 190}]);
            assert.equal(data.allGrouped.value(), 1);
          } finally {
            data.remove();
            assert.equal(data.allGrouped.value(), 0);
          }
        }
      },

      "dimension": {

        "groupAll (count, the default)": {
          topic: function(data) {
            data.quantity.count = data.quantity.groupAll();
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.count.value(), 0);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.count.value(), 1);
            } finally {
              data.remove();
              assert.equal(data.quantity.count.value(), 0);
            }
          }
        },

        "groupAll (sum of total)": {
          topic: function(data) {
            data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.total.value(), 0);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.total.value(), 190);
            } finally {
              data.remove();
              assert.equal(data.quantity.total.value(), 0);
            }
          }
        },

        "groupAll (custom reduce)": {
          topic: function(data) {
            data.quantity.custom = data.quantity.groupAll().reduce(add, remove, initial);
            function add(p, v) { return p + 1; }
            function remove(p, v) { return p - 1; }
            function initial() { return 1; }
            return data;
          },
          "value": function(data) {
            assert.equal(data.quantity.custom.value(), 1);
          },
          "value after removing all data": function(data) {
            try {
              data.add([{quantity: 2, total: 190}]);
              assert.equal(data.quantity.custom.value(), 2);
            } finally {
              data.remove();
              assert.equal(data.quantity.custom.value(), 1);
            }
          }
        },

        "groupAll (custom reduce information lifecycle)": {
          "topic": function() {
            var data = crossfilter();
            data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
            data.foo = data.dimension(function(d) { return d.foo; });
            data.bar = data.dimension(function(d) { return d.foo; });
            data.val = data.dimension(function(d) { return d.val; });
            data.groupMax = data.bar.groupAll().reduce(function(p,v,n){
              if(n) {
                p += v.val;
              }
              return p;
            }, function(p,v,n) {
              if(n) {
                p -= v.val;
              }
              return p;
            }, function() {
              return 0;
            });
            data.groupSum = data.bar.groupAll().reduceSum(function(d) { return d.val; });

            return data;
          },
          "on group creation": function(data) {
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          },
          "on filtering": function(data) {
            data.foo.filterRange([1, 3]);
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll();
          },
          "on adding data after group creation": function(data) {
            data.add([{foo: 1, val: 2}]);
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          },
          "on adding data when a filter is in place": function(data) {
            data.foo.filterRange([1,3]);
            data.add([{foo: 3, val: 1}]);
            assert.deepEqual(data.groupMax.value(), 11);
            assert.deepEqual(data.groupSum.value(), 6);
            data.foo.filterAll();
          },
          "on removing data after group creation": function(data) {
            data.val.filter(1);
            data.remove();
            assert.deepEqual(data.groupMax.value(), 10);
            assert.deepEqual(data.groupSum.value(), 0);

            data.val.filterAll();
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          }
        }
      }
    },

    "up to 64 dimensions supported": function() {
      var data = crossfilter([]);
      for (var i = 0; i < 64; i++) data.dimension(function() { return 0; });
    },

    "can add and remove 64 dimensions repeatedly": function() {
      var data = crossfilter([]),
          dimensions = [];
      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 64; i++) dimensions.push(data.dimension(function() { return 0; }));
        while (dimensions.length) dimensions.pop().remove();
      }
    },

    "filtering with more than 32 dimensions": function() {
      var data = crossfilter();
      var dims = {};

      for (var i = 0; i < 50; i++) {
        data.add([{value: i}]);
      }

      var dimfunc = function(i) {
        return function(val) {
          return val.value == i;
        }
      }

      for (var i = 0; i < 50; i++) {
        dims[i] = data.dimension(dimfunc(i));
      }

      for (var i = 0; i < 50; i++) {
        dims[i].filter(1);
        data.remove();
        dims[i].filterAll();
        assert.equal(data.size(), 49 - i);
      }
    },

    "dimension": {

      "accessor": function(data) {
        assert.equal(data.type.accessor({ type: "a type" }), "a type");
      },

      "stringAccessor": function(data) {
        assert.equal(data.typeByString.accessor({ type: "a type" }), "a type");
      },

      "stringPathAccessor": function(data) {
        assert.equal(data.firstTag.accessor({ tags: [2,4,5] }), 2);
        assert.equal(data.firstTag.accessor({ tags: [4,5] }), 4);
      },

      "stringPathDotAccessor": function(data) {
        assert.equal(data.firstTagDot.accessor({ tags: [2,4,5] }), 2);
        assert.equal(data.firstTagDot.accessor({ tags: [4,5] }), 4);
      },

      "stringFunctionCallAccessor": function(data) {
        function getYear() {
          return new Date(this.date).getFullYear();
        }
        assert.equal(data.year.accessor({date: "2011-11-14T16:28:54Z", getYear: getYear }), 2011);
      },

      "top": {
        "returns the top k records by value, in descending order": function(data) {
          assert.deepEqual(data.total.top(3), [
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", tags: [2,4,5]},
            {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab", tags: [2,4,5]},
            {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]}
          ]);
          assert.deepEqual(data.date.top(3), [
            {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
            {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
            {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]}
          ]);
        },
        "returns the top k records, using offset, by value, in descending order": function(data) {
          assert.deepEqual(data.total.top(3, 1), [
            {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab", tags: [2,4,5]},
            {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]},
            {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
          ]);
          assert.deepEqual(data.date.top(3,10), [
            {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab", tags: [1,3]},
            {date: "2011-11-14T21:31:05Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
            {date: "2011-11-14T21:30:55Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
          ]);
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.top(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            assert.deepEqual(data.date.top(10, 2), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.top(10), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            assert.deepEqual(data.date.top(10, 2), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
          } finally {
            data.date.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.top(2), [
              {date: "2011-11-14T20:49:07Z", quantity: 2, total: 290, tip: 200, type: "tab", tags: [2,4,5]},
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]}
            ]);
            assert.deepEqual(data.total.top(2, 8), [
              {date: "2011-11-14T22:34:28Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]},
              {date: "2011-11-14T21:30:55Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.top(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", tags: [2,4,5]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.top(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            assert.deepEqual(data.date.top(2, 8), [
              {date: '2011-11-14T22:30:22Z', quantity: 2, total: 89, tip: 0, type: 'tab', tags: [1,3]},
              {date: '2011-11-14T21:31:05Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [1,2,3]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.quantity.top(0), []);
          assert.deepEqual(data.quantity.top(-1), []);
          assert.deepEqual(data.quantity.top(NaN), []);
          assert.deepEqual(data.quantity.top(-Infinity), []);
          assert.deepEqual(data.quantity.top(0, 0), []);
          assert.deepEqual(data.quantity.top(-1, -1), []);
          assert.deepEqual(data.quantity.top(NaN, NaN), []);
          assert.deepEqual(data.quantity.top(-Infinity, -Infinity), []);
          assert.deepEqual(data.date.top(0), []);
          assert.deepEqual(data.date.top(-1), []);
          assert.deepEqual(data.date.top(NaN), []);
          assert.deepEqual(data.date.top(-Infinity), []);
          assert.deepEqual(data.date.top(0, 0), []);
          assert.deepEqual(data.date.top(-1, -1), []);
          assert.deepEqual(data.date.top(NaN, NaN), []);
          assert.deepEqual(data.date.top(-Infinity, -Infinity), []);
        }
      },

      "bottom": {
        "returns the bottom k records by value, in descending order": function(data) {
          assert.deepEqual(data.total.bottom(3), [
            {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab", tags: [1,3]},
            {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
            {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]}
          ]);
          assert.deepEqual(data.date.bottom(3), [
            {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
            {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,3]},
            {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", tags: [2,4,5]}
         ]);
        },
        "returns the bottom k records, using offset, by value, in descending order": function(data) {
          assert.deepEqual(data.total.bottom(3, 1), [
            {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]},
            {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
            {date: '2011-11-14T16:53:41Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1,3]}
          ]);
          assert.deepEqual(data.date.bottom(3, 10), [
            {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: null, type: "cash", tags: [2,4,5]},
            {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [-1, 0, 3, 4]},
            {date: "2011-11-14T17:33:46Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]}
         ]);
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.total.bottom(3), [
              {date: "2011-11-14T21:18:48Z", quantity: 4, total: 270, tip: 0, type: "tab", tags: [1,2,3]}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]}
            ]);
            assert.deepEqual(data.date.bottom(10, 2), [
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]}
            ]);
            data.date.filterRange([Date.UTC(2011, 10, 14, 19), Date.UTC(2011, 10, 14, 20)]); // also comparable
            assert.deepEqual(data.date.bottom(10), [
              {date: "2011-11-14T19:00:31Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]},
              {date: "2011-11-14T19:04:22Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T19:30:44Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [1,3]}
            ]);
          } finally {
            data.date.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.total.bottom(2), [
              {date: "2011-11-14T22:30:22Z", quantity: 2, total: 89, tip: 0, type: "tab", tags: [1,3]},
              {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab", tags: [2,3,4]}
            ]);
            data.type.filterExact("tab");
            assert.deepEqual(data.total.bottom(2, 8), [
              {date: '2011-11-14T17:52:02Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [2,3,4]},
              {date: '2011-11-14T18:45:24Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [2,4,5]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.total.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tip.bottom(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.bottom(2), [
              {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,3]}
            ]);
            assert.deepEqual(data.date.bottom(2, 8), [
              {date: '2011-11-14T17:33:46Z', quantity: 2, total: 190, tip: 100, type: 'tab', tags: [1,2,3]},
              {date: '2011-11-14T17:33:59Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [1,3]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", tags: [2,4,5]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.bottom(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.quantity.bottom(0), []);
          assert.deepEqual(data.quantity.bottom(-1), []);
          assert.deepEqual(data.quantity.bottom(NaN), []);
          assert.deepEqual(data.quantity.bottom(-Infinity), []);
          assert.deepEqual(data.quantity.bottom(0, 0), []);
          assert.deepEqual(data.quantity.bottom(-1, -1), []);
          assert.deepEqual(data.quantity.bottom(NaN, NaN), []);
          assert.deepEqual(data.quantity.bottom(-Infinity, -Infinity), []);
          assert.deepEqual(data.date.bottom(0), []);
          assert.deepEqual(data.date.bottom(-1), []);
          assert.deepEqual(data.date.bottom(NaN), []);
          assert.deepEqual(data.date.bottom(-Infinity), []);
          assert.deepEqual(data.date.bottom(0, 0), []);
          assert.deepEqual(data.date.bottom(-1, -1), []);
          assert.deepEqual(data.date.bottom(NaN, NaN), []);
          assert.deepEqual(data.date.bottom(-Infinity, -Infinity), []);
        }
      },

      "filterExact": {
        "selects records that match the specified value exactly": function(data) {
          try {
            data.tip.filterExact(100);
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
          } finally {
            data.tip.filterAll();
          }
        },
        "allows the filter value to be null": function(data) {
          try {
            data.tip.filterExact(null); // equivalent to 0 by natural ordering
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]},
              {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab", tags: [2,4,5]}
            ]);
          } finally {
            data.tip.filterAll();
          }
        }
      },

      "filterRange": {
        "selects records greater than or equal to the inclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 100; }));
            data.total.filterRange([110, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 110; }));
          } finally {
            data.total.filterAll();
          }
        },
        "selects records less than the exclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 200]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total < 200; }));
            data.total.filterRange([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total < 190; }));
          } finally {
            data.total.filterAll();
          }
        }
      },

      "filterAll": {
        "clears the filter": function(data) {
          data.total.filterRange([100, 200]);
          assert.lesser(data.date.top(Infinity).length, 43);
          data.total.filterAll();
          assert.equal(data.date.top(Infinity).length, 43);
        }
      },

      "filterFunction": {
        "selects records according to an arbitrary function": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filterAll();
          }
        },
        "respects truthy values": function(data) {
          try {
            var group = data.quantity.groupAll().reduceCount();
            data.total.filterRange([200, Infinity]);
            data.total.filterFunction(function(d) { return "0"; });
            assert.equal(group.value(), 43);
            data.total.filterFunction(function(d) { return ""; });
            assert.equal(group.value(), 0);
          } finally {
            data.total.filterAll();
          }
        },
        "groups on the first dimension are updated correctly": function(data) {
          try {
            var group = data.date.groupAll().reduceCount();
            data.total.filterFunction(function(d) { return d === 90; });
            assert.equal(group.value(), 13);
            data.total.filterFunction(function(d) { return d === 91; });
            assert.equal(group.value(), 1);
          } finally {
            data.total.filterAll();
          }
        },
        "followed by filterRange": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            data.total.filterRange([100, 200]);
            assert.deepEqual(data.date.top(Infinity).length, 19);
          } finally {
            data.total.filterAll();
          }
        }
      },

      "filter": {
        "is equivalent to filterRange when passed an array": function(data) {
          try {
            data.total.filter([100, 190]);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total >= 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterExact when passed a single value": function(data) {
          try {
            data.total.filter(100);
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total == 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterFunction when passed a function": function(data) {
          try {
            data.total.filter(function(d) { return d % 2; });
            assert.isTrue(data.date.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterAll when passed null": function(data) {
          data.total.filter([100, 200]);
          assert.lesser(data.date.top(Infinity).length, 43);
          data.total.filter(null);
          assert.equal(data.date.top(Infinity).length, 43);
        }
      },

      // TODO "undefined" chosen as empty value since "null" is a legitimate value, but this is not consistent with the filter() method
      "currentFilter/hasCurrentFilter": {
        "reflect the currently applied filter": function (data) {
          try {

            var v, w;

            // filter:

            v = 2;
            data.quantity.filterExact(v);
            assert.strictEqual(data.quantity.currentFilter(), v);
            assert.isTrue(data.quantity.hasCurrentFilter());

            v = [2, 3];
            data.quantity.filterRange(v);
            assert.strictEqual(data.quantity.currentFilter(), v);
            assert.isTrue(data.quantity.hasCurrentFilter());

            v = function (d) { return d == 1; };
            data.quantity.filterFunction(v);
            assert.strictEqual(data.quantity.currentFilter(), v);
            assert.isTrue(data.quantity.hasCurrentFilter());

            // no filter:

            data.quantity.filterAll();
            assert.isUndefined(data.quantity.currentFilter());
            assert.isFalse(data.quantity.hasCurrentFilter());

            // special values:

            // falsy
            data.quantity.filterExact(0);
            assert.isZero(data.quantity.currentFilter());
            assert.isTrue(data.quantity.hasCurrentFilter());

            // null: explicitly allowed by spec since naturally orderable
            data.quantity.filterExact(null);
            assert.isNull(data.quantity.currentFilter());
            assert.isTrue(data.quantity.hasCurrentFilter());

            // undefined: not orderable, should not be used as filter, but no error is thrown so check behavior anyway
            data.quantity.filterExact(undefined);
            assert.isUndefined(data.quantity.currentFilter());
            assert.isTrue(data.quantity.hasCurrentFilter());

            // filter on multiple dimensions:

            v = [1, 2], w = 3;
            data.quantity.filterExact(v);
            data.tags.filterExact(w);
            assert.strictEqual(data.quantity.currentFilter(), v);
            assert.isTrue(data.quantity.hasCurrentFilter());
            assert.strictEqual(data.tags.currentFilter(), w);
            assert.isTrue(data.tags.hasCurrentFilter());
            assert.isUndefined(data.total.currentFilter());
            assert.isFalse(data.total.hasCurrentFilter());

          } finally {
            data.quantity.filterAll();
            data.tags.filterAll();
          }
        }
      },

      "groupAll (count, the default)": {
        topic: function(data) {
          data.quantity.count = data.quantity.groupAll();
          return data;
        },

        "does not have top and order methods": function(data) {
          assert.isFalse("top" in data.quantity.count);
          assert.isFalse("order" in data.quantity.count);
        },

        "reduce": {
          "reduces by add, remove, and initial": function(data) {
            try {
              data.quantity.count.reduce(
                  function(p, v) { return p + v.total; },
                  function(p, v) { return p - v.total; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.count.value(), 6660);
            } finally {
              data.quantity.count.reduceCount();
            }
          }
        },

        "reduceCount": {
          "reduces by count": function(data) {
            data.quantity.count.reduceSum(function(d) { return d.total; });
            assert.strictEqual(data.quantity.count.value(), 6660);
            data.quantity.count.reduceCount();
            assert.strictEqual(data.quantity.count.value(), 43);
          }
        },

        "reduceSum": {
          "reduces by sum of accessor function": function(data) {
            try {
              data.quantity.count.reduceSum(function(d) { return d.total; });
              assert.strictEqual(data.quantity.count.value(), 6660);
              data.quantity.count.reduceSum(function() { return 1; });
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.count.reduceCount();
            }
          }
        },

        "value": {
          "returns the count of matching records": function(data) {
            assert.strictEqual(data.quantity.count.value(), 43);
          },
          "does not observe the associated dimension's filters": function(data) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.count.value(), 43);
            } finally {
              data.quantity.filterAll();
            }
          },
          "observes other dimensions' filters": function(data) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.count.value(), 32);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.count.value(), 7);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.count.value(), 5);
            } finally {
              data.type.filterAll();
              data.tip.filterAll();
            }
          }
        },

        "dispose": {
          "detaches from reduce listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d; }),
                other = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when filters change
            callback = false;
            all.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback);
          },
          "detaches from add listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates data has been added and triggered a reduce
                dimension = data.dimension(function(d) { return d; }),
                all = dimension.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            all.value(); // force this group to be reduced when data is added
            callback = false;
            all.dispose();
            data.add([3, 4, 5]);
            assert.isFalse(callback);
          }
        }
      },

      "groupAll (sum of total)": {
        topic: function(data) {
          data.quantity.total = data.quantity.groupAll().reduceSum(function(d) { return d.total; });
          return data;
        },

        "does not have top and order methods": function(data) {
          assert.isFalse("top" in data.quantity.total);
          assert.isFalse("order" in data.quantity.total);
        },

        "reduce": {
          "determines the computed reduce value": function(data) {
            try {
              data.quantity.total.reduce(
                  function(p) { return p + 1; },
                  function(p) { return p - 1; },
                  function() { return 0; });
              assert.strictEqual(data.quantity.total.value(), 43);
            } finally {
              data.quantity.total.reduceSum(function(d) { return d.total; });
            }
          }
        },

        "value": {
          "returns the sum total of matching records": function(data) {
            assert.strictEqual(data.quantity.total.value(), 6660);
          },
          "does not observe the associated dimension's filters": function(data) {
            try {
              data.quantity.filterRange([100, 200]);
              assert.strictEqual(data.quantity.total.value(), 6660);
            } finally {
              data.quantity.filterAll();
            }
          },
          "observes other dimensions' filters": function(data) {
            try {
              data.type.filterExact("tab");
              assert.strictEqual(data.quantity.total.value(), 4760);
              data.type.filterExact("visa");
              assert.strictEqual(data.quantity.total.value(), 1400);
              data.tip.filterExact(100);
              assert.strictEqual(data.quantity.total.value(), 1000);
            } finally {
              data.type.filterAll();
              data.tip.filterAll();
            }
          }
        }
      },

      "group": {
        topic: function(data) {
          data.date.hours = data.date.group(function(d) { d = new Date(+d); d.setHours(d.getHours(), 0, 0, 0); return d; });
          data.type.types = data.type.group();
          return data;
        },

        "key defaults to value": function(data) {
          assert.deepEqual(data.type.types.top(Infinity), [
            {key: "tab", value: 32},
            {key: "visa", value: 7},
            {key: "cash", value: 4}
          ]);
        },

        "cardinality may be greater than 256": function() {
          var data = crossfilter(d3.range(256).concat(256, 256)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [256, 256]);
          assert.deepEqual(indexes.top(1), [{key: 256, value: 2}]);
          assert.equal(indexes.size(), 257);
        },

        "cardinality may be greater than 65536": function() {
          var data = crossfilter(d3.range(65536).concat(65536, 65536)),
              index = data.dimension(function(d) { return d; }),
              indexes = index.group();
          assert.deepEqual(index.top(2), [65536, 65536]);
          assert.deepEqual(indexes.top(1), [{key: 65536, value: 2}]);
          assert.equal(indexes.size(), 65537);
        },

        "adds all records before removing filtered": function(data) {
          try {
            data.quantity.filter(1);
            // Group only adds
            var addGroup = data.type.group().reduce(
                function(p, v) {
                  ++p;
                  return p;
                }, function(p, v) {
                  return p;
                }, function() {
                  return 0;
                }
              );
            // Normal group
            var stdGroup = data.type.group();
            assert.isTrue(addGroup.top(1)[0].value > stdGroup.top(1)[0].value);
          } finally {
            data.quantity.filterAll();
          }
        },

        "size": {
          "returns the cardinality": function(data) {
            assert.equal(data.date.hours.size(), 8);
            assert.equal(data.type.types.size(), 3);
          },
          "ignores any filters": function(data) {
            try {
              data.type.filterExact("tab");
              data.quantity.filterRange([100, 200]);
              assert.equal(data.date.hours.size(), 8);
              assert.equal(data.type.types.size(), 3);
            } finally {
              data.quantity.filterAll();
              data.type.filterAll();
            }
          }
        },

        "reduce": {
          "defaults to count": function(data) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9}
            ]);
          },
          "determines the computed reduce value": function(data) {
            try {
              data.date.hours.reduceSum(function(d) { return d.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 1240}
              ]);
            } finally {
              data.date.hours.reduceCount();
            }
          },
          "gives reduce functions information on lifecycle of data element": {
            "topic": function() {
              var data = crossfilter();
              data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
              data.foo = data.dimension(function(d) { return d.foo; });
              data.bar = data.dimension(function(d) { return d.foo; });
              data.val = data.dimension(function(d) { return d.val; });
              data.groupMax = data.bar.group().reduce(function(p,v,n){
                if(n) {
                  p += v.val;
                }
                return p;
              }, function(p,v,n) {
                if(n) {
                  p -= v.val;
                }
                return p;
              }, function() {
                return 0;
              });
              data.groupSum = data.bar.group().reduceSum(function(d) { return d.val; });

              return data;
            },
            "on group creation": function(data) {
              assert.deepEqual(data.groupMax.all(), data.groupSum.all());
            },
            "on filtering": function(data) {
              data.foo.filterRange([1, 3]);
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 4 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 2 }, { key: 2, value: 2 }, { key: 3, value: 0 }]);
              data.foo.filterAll();
            },
            "on adding data after group creation": function(data) {
              data.add([{foo: 1, val: 2}]);
              assert.deepEqual(data.groupMax.all(), data.groupSum.all());
            },
            "on adding data when a filter is in place": function(data) {
              data.foo.filterRange([1,3]);
              data.add([{foo: 3, val: 1}]);
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 4 }, { key: 2, value: 2 }, { key: 3, value: 5 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 4 }, { key: 2, value: 2 }, { key: 3, value: 0 }]);
              data.foo.filterAll();
            },
            "on removing data after group creation": function(data) {
              data.val.filter(1);
              data.remove();
              assert.deepEqual(data.groupMax.all(), [{ key: 1, value: 4 },{ key: 2, value: 2 },{ key: 3, value: 4 }]);
              assert.deepEqual(data.groupSum.all(), [{ key: 1, value: 0 },{ key: 2, value: 0 },{ key: 3, value: 0 }]);

              data.val.filterAll();
              assert.deepEqual(data.groupMax.all(), data.groupSum.all());
            }
          }
        },

        "top": {
          "returns the top k groups by reduce value, in descending order": function(data) {
            assert.deepEqual(data.date.hours.top(3), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9},
              {key: new Date(Date.UTC(2011, 10, 14, 16, 0, 0)), value: 7},
              {key: new Date(Date.UTC(2011, 10, 14, 21, 0, 0)), value: 6}
            ]);
          },
          "observes the specified order": function(data) {
            try {
              data.date.hours.order(function(v) { return -v; });
              assert.deepEqual(data.date.hours.top(3), [
                {key: new Date(Date.UTC(2011, 10, 14, 20, 0, 0)), value: 2},
                {key: new Date(Date.UTC(2011, 10, 14, 19, 0, 0)), value: 3},
                {key: new Date(Date.UTC(2011, 10, 14, 18, 0, 0)), value: 5}
              ]);
            } finally {
              data.date.hours.order(function(v) { return v; });
            }
          },
          "works correctly on removing and adding back data with array groups": function() {
            var data = crossfilter();
            var dimension = data.dimension('tags', true);
            var group = dimension.group();
            data.add([
              {
                tags: ['A']
              }, {
                tags: ['B']
              }
            ]);
            data.remove(function(data) {
              return data.tags.indexOf('A') !== -1;
            });
            data.add([
              {
                tags: ['A']
              }, {
                tags: ['A']
              }
            ]);
            assert.deepEqual(group.top(Infinity), [
              {
                key: 'A',
                value: 2
              }, {
                key: 'B',
                value: 1
              }
            ]);
          },
          "works correctly on removing and adding back data with array groups 2": function() {
            var data = crossfilter();
            const dimension = data.dimension(e => e.tags, true);
            const group = dimension.group();

            const data1 = [
              {
                id: '0',
                tags: ['A', 'B'],
              },
              {
                id: '1',
                tags: ['C'],
              }
            ];
            data.add(data1);

            data.remove(e => e.id === '0');

            const data2 = [
              {
                id: '0',
                tags: ['A', 'B'],
              }
            ];
            data.add(data2);
            assert.deepEqual(group.top(Infinity), [
              {
                key: 'B',
                value: 1
              }, {
                key: 'C',
                value: 1
              }, {
                key: 'A',
                value: 1
              }
            ]);
          }
        },

        "order": {
          "defaults to the identity function": function(data) {
            assert.deepEqual(data.date.hours.top(1), [
              {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: 9}
            ]);
          },
          "is useful in conjunction with a compound reduce value": function(data) {
            try {
              data.date.hours.reduce(
                  function(p, v) { ++p.count; p.total += v.total; return p; },
                  function(p, v) { --p.count; p.total -= v.total; return p; },
                  function() { return {count: 0, total: 0}; })
                  .order(function(v) { return v.total; });
              assert.deepEqual(data.date.hours.top(1), [
                {key: new Date(Date.UTC(2011, 10, 14, 17, 0, 0)), value: {count: 9, total: 1240}}
              ]);
            } finally {
              data.date.hours.reduceCount().orderNatural();
            }
          }
        },

        "dispose": {
          "detaches from reduce listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d; }),
                other = data.dimension(function(d) { return d; }),
                group = dimension
                  .group(function(d) { return d; })
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback);
          },
          "detaches from add listeners": function() {
            var data = crossfilter([0, 1, 2]),
                callback, // indicates data has been added and the group has been reduced
                dimension = data.dimension(function(d) { return d; }),
                group = dimension
                  .group(function(d) { return d; })
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            data.add([3, 4, 5]);
            assert.isFalse(callback);
          },
          "removes reference to group from dimension": function() {
            var data = crossfilter([0, 1, 2]),
                dimension = data.dimension(function(d) { return d; }),
                group = dimension
                  .group(function(d) { return d; }),
                originalGroupDispose = group.dispose;

            sinon.spy(group, "dispose")

            group.dispose();
            dimension.dispose();

            assert.strictEqual(group.dispose.callCount, 1);
          }
        }
      },

      "dispose": {
        "detaches from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              dimension = data.dimension(function(d) { callback = true; return d; });
          callback = false;
          dimension.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        },
        "detaches groups from reduce listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              dimension = data.dimension(function(d) { return d; }),
              other = data.dimension(function(d) { return d; }),
              group = dimension
                .group(function(d) { return d; })
                .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          group.all(); // force this group to be reduced when filters change
          callback = false;
          dimension.dispose();
          other.filterRange([1, 2]);
          assert.isFalse(callback);
        },
        "detaches groups from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates data has been added and the group has been reduced
              dimension = data.dimension(function(d) { return d; }),
              group = dimension
                .group(function(d) { return d; })
                .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          group.all(); // force this group to be reduced when filters change
          callback = false;
          dimension.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        },
        "clears dimension filters from groups": function() {
          var data = crossfilter([0, 0, 2, 2]),
              d1 = data.dimension(function(d) { return -d; }),
              d2 = data.dimension(function(d) { return +d; }),
              g2 = d2.group(function(d) { return Math.round( d / 2 ) * 2; }),
              all = g2.all();
          d1.filterRange([-1, 1]); // a filter is present when the dimension is disposed
          d1.dispose();
          assert.deepEqual(g2.all(), [{key: 0, value: 2}, {key: 2, value: 2}]);
        }
      }
    },

    "groupAll": {
      topic: function(data) {
        data.allGrouped = data.groupAll().reduceSum(function(d) { return d.total; });
        return data;
      },

      "does not have top and order methods": function(data) {
        assert.isFalse("top" in data.allGrouped);
        assert.isFalse("order" in data.allGrouped);
      },

      "reduce": {
        "determines the computed reduce value": function(data) {
          try {
            data.allGrouped.reduceCount();
            assert.strictEqual(data.allGrouped.value(), 43);
          } finally {
            data.allGrouped.reduceSum(function(d) { return d.total; });
          }
        },

        "gives reduce functions information on lifecycle of data element": {
          "topic": function() {
            var data = crossfilter();
            data.add([{foo: 1, val: 2}, {foo: 2, val: 2}, {foo: 3, val: 2}, {foo: 3, val: 2}]);
            data.foo = data.dimension(function(d) { return d.foo; });
            data.bar = data.dimension(function(d) { return d.foo; });
            data.val = data.dimension(function(d) { return d.val; });
            data.groupMax = data.groupAll().reduce(function(p,v,n){
              if(n) {
                p += v.val;
              }
              return p;
            }, function(p,v,n) {
              if(n) {
                p -= v.val;
              }
              return p;
            }, function() {
              return 0;
            });
            data.groupSum = data.groupAll().reduceSum(function(d) { return d.val; });

            return data;
          },
          "on group creation": function(data) {
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          },
          "on filtering": function(data) {
            data.foo.filterRange([1, 3]);
            assert.deepEqual(data.groupMax.value(), 8);
            assert.deepEqual(data.groupSum.value(), 4);
            data.foo.filterAll();
          },
          "on adding data after group creation": function(data) {
            data.add([{foo: 1, val: 2}]);
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          },
          "on adding data when a filter is in place": function(data) {
            data.foo.filterRange([1,3]);
            data.add([{foo: 3, val: 1}]);
            assert.deepEqual(data.groupMax.value(), 11);
            assert.deepEqual(data.groupSum.value(), 6);
            data.foo.filterAll();
          },
          "on removing data after group creation": function(data) {
            data.val.filter(1);
            data.remove();
            assert.deepEqual(data.groupMax.value(), 10);
            assert.deepEqual(data.groupSum.value(), 0);

            data.val.filterAll();
            assert.deepEqual(data.groupMax.value(), data.groupSum.value());
          }
        }
      },

      "value": {
        "returns the sum total of matching records": function(data) {
          assert.strictEqual(data.allGrouped.value(), 6660);
        },
        "observes all dimension's filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.strictEqual(data.allGrouped.value(), 4760);
            data.type.filterExact("visa");
            assert.strictEqual(data.allGrouped.value(), 1400);
            data.tip.filterExact(100);
            assert.strictEqual(data.allGrouped.value(), 1000);
          } finally {
            data.type.filterAll();
            data.tip.filterAll();
          }
        }
      },

      "dispose": {
        "detaches from reduce listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              other = data.dimension(function(d) { return d; }),
              all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all.value(); // force this group to be reduced when filters change
          callback = false;
          all.dispose();
          other.filterRange([1, 2]);
          assert.isFalse(callback);
        },
        "detaches from add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates data has been added and triggered a reduce
              all = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all.value(); // force this group to be reduced when data is added
          callback = false;
          all.dispose();
          data.add([3, 4, 5]);
          assert.isFalse(callback);
        },
        "does not detach other reduce listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates a reduce has occurred in this group
              other = data.dimension(function(d) { return d; }),
              all = data.groupAll(),
              all2 = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all2.value(); // force this group to be reduced when filters change
          callback = false;
          all.dispose();
          other.filterRange([1, 2]);
          assert.isTrue(callback);
        },
        "does not detach other add listeners": function() {
          var data = crossfilter([0, 1, 2]),
              callback, // indicates data has been added and triggered a reduce
              all = data.groupAll(),
              all2 = data.groupAll().reduce(function() { callback = true; }, function() { callback = true; }, function() {});
          all2.value(); // force this group to be reduced when data is added
          callback = false;
          all.dispose();
          data.add([3, 4, 5]);
          assert.isTrue(callback);
        }
      }
    },

    "size": {
      "returns the total number of elements": function(data) {
        assert.equal(data.size(), 43);
      },
      "is not affected by any dimension filters": function(data) {
        try {
          data.quantity.filterExact(4);
          assert.equal(data.size(), 43);
        } finally {
          data.quantity.filterAll();
        }
      }
    },

    "all": {
      "returns the full data array": function(data) {
        var raw = data.all();
        assert.equal(raw.length, 43);
      },
      "is not affected by any dimension filters": function(data) {
        try {
          data.quantity.filterExact(4);
          var raw = data.all();
          assert.equal(raw.length, 43);
        } finally {
          data.quantity.filterAll();
        }
      }
    },

    "allFiltered": {
      "returns the full data array if no filters applied": function(data) {
        var raw = data.allFiltered();
        assert.equal(raw.length, 43);
      },
      "is affected by all dimension filters": function(data) {
        try {
          data.quantity.filterExact(4);
          var raw = data.allFiltered();
          assert.equal(raw.length, 1);

          data.quantity.filterExact(2);
          var raw = data.allFiltered();
          assert.equal(raw.length, 35);

          data.total.filterRange([190, 300]);
          var raw = data.allFiltered();
          assert.equal(raw.length, 18);
        } finally {
          data.quantity.filterAll();
          data.total.filterAll();
        }
      },
      "is affected by all dimensions filters, except those in ignore_dimensions": function(data) {
        try {
          data.quantity.filterExact(2);
          var raw = data.allFiltered([data.quantity]);
          assert.equal(raw.length, 43);

          data.total.filterRange([190, 300]);
          raw = data.allFiltered([data.total]);
          assert.equal(raw.length, 35);

          raw = data.allFiltered([data.quantity, data.total]);
          assert.equal(raw.length, 43);
        } finally {
          data.quantity.filterAll();
          data.total.filterAll();
        }
      }
    },

    "add": {
      "increases the size of the crossfilter": function() {
        var data = crossfilter([]);
        assert.equal(data.size(), 0);
        data.add([0, 1, 2, 3, 4, 5, 6, 6, 6, 7]);
        assert.equal(data.size(), 10);
        data.add([]);
        assert.equal(data.size(), 10);
      },
      "existing filters are consistent with new records": function(data) {
        var data = crossfilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; });
        assert.deepEqual(foo.top(Infinity), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.deepEqual(foo.top(Infinity), [42]);
        assert.deepEqual(bar.top(Infinity), [42]);
        data.add([43, 42]);
        assert.deepEqual(foo.top(Infinity), [42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42]);
        foo.filterRange([42, 44]);
        data.add([43]);
        assert.deepEqual(foo.top(Infinity), [43, 43, 43, 42, 42]);
        assert.deepEqual(bar.top(Infinity), [42, 42, 43, 43, 43]);
        foo.filterFunction(function(d) { return d % 2 === 1; });
        data.add([44, 44, 45]);
        assert.deepEqual(foo.top(Infinity), [45, 43, 43, 43, 41]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 45]);
        bar.filterExact([-43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43]);
        data.add([43]);
        assert.deepEqual(bar.top(Infinity), [43, 43, 43, 43]);
        bar.filterAll();
        data.add([0]);
        assert.deepEqual(bar.top(Infinity), [41, 43, 43, 43, 43, 45]);
        foo.filterAll();
        assert.deepEqual(bar.top(Infinity), [0, 41, 42, 42, 43, 43, 43, 43, 44, 44, 45]);
      },
      "existing groups are consistent with new records": function(data) {
        var data = crossfilter([]),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return -d; }),
            foos = foo.group(),
            all = data.groupAll();
        assert.equal(all.value(), 0);
        assert.deepEqual(foos.all(), []);
        foo.filterExact(42);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 1}, {key: 42, value: 1}, {key: 43, value: 1}]);
        bar.filterExact(-42);
        assert.equal(all.value(), 1);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 1}, {key: 43, value: 0}]);
        data.add([43, 42, 41]);
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 0}, {key: 42, value: 2}, {key: 43, value: 0}]);
        bar.filterAll();
        assert.equal(all.value(), 2);
        assert.deepEqual(foos.all(), [{key: 41, value: 2}, {key: 42, value: 2}, {key: 43, value: 2}]);
        foo.filterAll();
        assert.equal(all.value(), 6);
      },
      "tag dimension with zero keys": {
        "three empties": function(data) {
          var rows = [{id: 1, links: []}, {id: 2, links: []}, {id: 3, links: []}];
          var ndx = crossfilter(rows);
          var dimLinks = ndx.dimension(r => r.links, true);
          dimLinks.filter("vv");
          assert.equal(dimLinks.top(Infinity).length, 0);
        }
      },
      "tag dimension with one key": {
        "one key once": function(data) {
          var rows = [{id: 1, links: ["vv"]}, {id: 2, links: []}];
          var ndx = crossfilter(rows);
          var dimLinks = ndx.dimension(r => r.links, true);
          dimLinks.filter("vv");
          assert.equal(dimLinks.top(Infinity).length, 1);
        },
        "one key doubled": function(data) {
          var rows = [{id: 1, links: ["vv","vv"]}, {id: 2, links: []}];
          var ndx = crossfilter(rows);
          var dimLinks = ndx.dimension(r => r.links, true);
          dimLinks.filter("vv");
          // doubled key in tag dimension means it shows up in dim.top() twice
          assert.equal(dimLinks.top(Infinity).length, 2);
          assert.equal(ndx.allFiltered().length, 1);
        },
        "one key twice": function(data) {
          var rows = [{id: 1, links: []}, {id: 2, links: ["vv"]}, {id: 3, links: ["vv"]}];
          var ndx = crossfilter(rows);
          var dimLinks = ndx.dimension(r => r.links, true);
          dimLinks.filter("vv");
          assert.equal(dimLinks.top(Infinity).length, 2);
        }
      },
      "can add new groups that are before existing groups": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return +d; }),
            foos = foo.group().reduce(add, remove, initial).order(order);
        data.add([2]).add([1, 1, 1]);
        assert.deepEqual(foos.top(2), [{key: 1, value: {foo: 3}}, {key: 2, value: {foo: 1}}]);
        function order(p) { return p.foo; }
        function add(p, v) { ++p.foo; return p; }
        function remove(p, v) { --p.foo; return p; }
        function initial() { return {foo: 0}; }
      },
      "can add more than 256 groups": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return +d; }),
            bar = data.dimension(function(d) { return +d; }),
            foos = foo.group();
        data.add(d3.range(0, 256));
        assert.deepEqual(foos.all().map(function(d) { return d.key; }), d3.range(0, 256));
        assert(foos.all().every(function(d) { return d.value == 1; }));
        data.add([128]);
        assert.deepEqual(foos.top(1), [{key: 128, value: 2}]);
        bar.filterExact(0);
        data.add(d3.range(-256, 0));
        assert.deepEqual(foos.all().map(function(d) { return d.key; }), d3.range(-256, 256));
        assert.deepEqual(foos.top(1), [{key: 0, value: 1}]);
      },
      "can add lots of groups in reverse order": function(data) {
        var data = crossfilter(),
            foo = data.dimension(function(d) { return -d.foo; }),
            bar = data.dimension(function(d) { return d.bar; }),
            foos = foo.group(Math.floor).reduceSum(function(d) { return d.foo; });
        bar.filterExact(1);
        for (var i = 0; i < 1000; i++) {
          data.add(d3.range(10).map(function(d) {
            return {foo: i + d / 10, bar: i % 4, baz: d + i * 10};
          }));
        }
        assert.deepEqual(foos.top(1), [{key: -998, value: 8977.5}]);
      },
      "can add a record that matches the tag filter": function(data) {
        var data2 = crossfilter();
        var fooDimension = data2.dimension(function(d) { return d.foo; }, true);
        data2.add([
          {foo: [1, 2, 3], bar: 1},
          {foo: [1, 2   ], bar: 2},
          {foo: [   2, 3], bar: 4}
        ]);
        var another =
          {foo: [1,    3], bar: 8};

        var fooGroup = fooDimension.group();
        var allBarSum = data2.groupAll().reduceSum(function (d) { return d.bar; });
        var fooBarSum = fooDimension.group().reduceSum(function (d) { return d.bar; });
        var barDim = data2.dimension(function(d) { return d.bar; });
        var barGroup = barDim.group();

        assert.equal(allBarSum.value(), 7);
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 7 },
          { key: 3, value: 5 }
        ]);

        fooDimension.filter(3);
        assert.equal(allBarSum.value(), 5);

        // add a row that matches tag filter
        data2.add([another]);

        assert.equal(data2.size(), 4);
        assert.equal(allBarSum.value(), 13); // fails: 5
        assert.equal(data2.allFiltered().length, 3); // fails: 2

        // fooGroup and fooBarSum do not observe tag filter
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 3 },
          { key: 3, value: 3 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 11 },
          { key: 2, value: 7 },
          { key: 3, value: 13 }
        ]);

        // barGroup does observe tag filter
        assert.deepEqual(barGroup.all() [
          { key: 1, value: 1 },
          { key: 2, value: 0 },
          { key: 4, value: 1 },
          { key: 8, value: 1 }
        ]);

        fooDimension.filterAll();

        assert.equal(allBarSum.value(), 15); // fails: 7
        assert.equal(data2.allFiltered().length, 4); // fails: 3

        data2.remove(function () {
          return true;
        });
        assert.deepEqual(fooDimension.top(Infinity), []);
      },
      "can add a record that matches the tag filter function": function(data) {
        var data2 = crossfilter();
        var fooDimension = data2.dimension(function(d) { return d.foo; }, true);
        data2.add([
          {foo: [1, 2, 3], bar: 1},
          {foo: [1, 2   ], bar: 2},
          {foo: [   2, 3], bar: 4}
        ]);
        var another =
          {foo: [1,    3], bar: 8};

        var fooGroup = fooDimension.group();
        var allBarSum = data2.groupAll().reduceSum(function (d) { return d.bar; });
        var fooBarSum = fooDimension.group().reduceSum(function (d) { return d.bar; });
        var barDim = data2.dimension(function(d) { return d.bar; });
        var barGroup = barDim.group();

        assert.equal(allBarSum.value(), 7);
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 7 },
          { key: 3, value: 5 }
        ]);

        fooDimension.filterFunction(k => k === 3);
        assert.equal(allBarSum.value(), 5);

        // add a row that matches tag filter
        data2.add([another]);

        assert.equal(data2.size(), 4);
        assert.equal(allBarSum.value(), 13); // fails: 5
        assert.equal(data2.allFiltered().length, 3); // fails: 2

        // fooGroup and fooBarSum do not observe tag filter
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 3 },
          { key: 3, value: 3 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 11 },
          { key: 2, value: 7 },
          { key: 3, value: 13 }
        ]);

        // barGroup does observe tag filter
        assert.deepEqual(barGroup.all() [
          { key: 1, value: 1 },
          { key: 2, value: 0 },
          { key: 4, value: 1 },
          { key: 8, value: 1 }
        ]);

        fooDimension.filterAll();

        assert.equal(allBarSum.value(), 15); // fails: 7
        assert.equal(data2.allFiltered().length, 4); // fails: 3

        data2.remove(function () {
          return true;
        });
        assert.deepEqual(fooDimension.top(Infinity), []);
      },
      "can add a record that doesn't match the tag filter": function(data) {
        var data2 = crossfilter();
        var fooDimension = data2.dimension(function(d) { return d.foo; }, true);
        data2.add([
          {foo: [1, 2, 3], bar: 1},
          {foo: [1, 2   ], bar: 2},
          {foo: [   2, 3], bar: 4}
        ]);
        var yetanother =
          {foo: [   2   ], bar: 8};

        var fooGroup = fooDimension.group();
        var allBarSum = data2.groupAll().reduceSum(function (d) { return d.bar });
        var fooBarSum = fooDimension.group().reduceSum(function (d) { return d.bar });
        var barDim = data2.dimension(function(d) { return d.bar; });
        var barGroup = barDim.group();

        assert.equal(allBarSum.value(), 7);
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 7 },
          { key: 3, value: 5 }
        ]);

        fooDimension.filter(3);
        assert.equal(allBarSum.value(), 5);

        // add a row that doesn't match tag filter
        data2.add([yetanother]);

        assert.equal(data2.size(), 4);
        assert.equal(allBarSum.value(), 5);
        assert.equal(data2.allFiltered().length, 2);

        // fooGroup and fooBarSum do not observe tag filter
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 4 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 15 },
          { key: 3, value: 5 }
        ]);

        // barGroup does observe tag filter
        assert.deepEqual(barGroup.all() [
          { key: 1, value: 1 },
          { key: 2, value: 0 },
          { key: 4, value: 1 },
          { key: 8, value: 0 }
        ]);

        fooDimension.filterAll();

        assert.equal(allBarSum.value(), 15); // fails: 7
        assert.equal(data2.allFiltered().length, 4); // fails: 3

        data2.remove(function () {
          return true;
        });
        assert.deepEqual(fooDimension.top(Infinity), []);
      },
      "can add a record that doesn't match the tag filter function": function(data) {
        var data2 = crossfilter();
        var fooDimension = data2.dimension(function(d) { return d.foo; }, true);
        data2.add([
          {foo: [1, 2, 3], bar: 1},
          {foo: [1, 2   ], bar: 2},
          {foo: [   2, 3], bar: 4}
        ]);
        var yetanother =
          {foo: [   2   ], bar: 8};

        var fooGroup = fooDimension.group();
        var allBarSum = data2.groupAll().reduceSum(function (d) { return d.bar });
        var fooBarSum = fooDimension.group().reduceSum(function (d) { return d.bar });
        var barDim = data2.dimension(function(d) { return d.bar; });
        var barGroup = barDim.group();

        assert.equal(allBarSum.value(), 7);
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 7 },
          { key: 3, value: 5 }
        ]);

        fooDimension.filterFunction(k => k === 3);
        assert.equal(allBarSum.value(), 5);

        // add a row that doesn't match tag filter
        data2.add([yetanother]);

        assert.equal(data2.size(), 4);
        assert.equal(allBarSum.value(), 5);
        assert.equal(data2.allFiltered().length, 2);

        // fooGroup and fooBarSum do not observe tag filter
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 4 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 15 },
          { key: 3, value: 5 }
        ]);

        // barGroup does observe tag filter
        assert.deepEqual(barGroup.all() [
          { key: 1, value: 1 },
          { key: 2, value: 0 },
          { key: 4, value: 1 },
          { key: 8, value: 0 }
        ]);

        fooDimension.filterAll();

        assert.equal(allBarSum.value(), 15); // fails: 7
        assert.equal(data2.allFiltered().length, 4); // fails: 3

        data2.remove(function () {
          return true;
        });
        assert.deepEqual(fooDimension.top(Infinity), []);
      }
    },
    "remove": {
      topic: function() {
        var data = crossfilter();
        data.foo = data.dimension(function(d) { return d.foo; });
        data.foo.div2 = data.foo.group(function(value) { return Math.floor(value / 2); });
        data.foo.positive = data.foo.group(function(value) { return value > 0 | 0; });
        return data;
      },
      "removing a record works for a group with cardinality one": function(data) {
        data.add([{foo: 1}, {foo: 1.1}, {foo: 1.2}]);
        data.foo.filter(1.1);
        data.remove();
        data.foo.filterAll();
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record works for another group with cardinality one": function(data) {
        data.add([{foo: 0}, {foo: -1}]);
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 2}]);
        data.foo.filter(0);
        data.remove();
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 1}]);
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: -1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record updates dimension": function(data) {
        data.add([{foo: 1}, {foo: 2}]);
        data.foo.filterExact(1);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 2}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing records updates group": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 2}, {foo: 1}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 0, value: 1}, {key: 1, value: 2}]);
        data.foo.filterRange([1, 3]);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 1, value: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
        assert.deepEqual(data.foo.div2.all(), []);
      },
      "filtering works correctly after removing a record": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        data.foo.filter(2);
        data.remove();
        data.foo.filterAll();
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 1}]);
        data.remove();
        assert.deepEqual(data.foo.top(Infinity), []);
      }
    },

    "remove with predicate": {
      topic: function() {
        var data = crossfilter();
        data.foo = data.dimension(function(d) { return d.foo; });
        data.foo.div2 = data.foo.group(function(value) { return Math.floor(value / 2); });
        data.foo.positive = data.foo.group(function(value) { return value > 0 | 0; });
        data.allSum = data.groupAll().reduceSum(function(d) { return d.foo });
        return data;
      },
      "removing a record works for a group with cardinality one": function(data) {
        data.add([{foo: 1}, {foo: 1.1}, {foo: 1.2}]);
        data.remove(function (d) {
          return d.foo === 1.1;
        });
        assert.deepEqual(data.all(), [{foo: 1}, {foo: 1.2}]);
        data.remove(function () {
          return true;
        });
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record works for another group with cardinality one": function(data) {
        data.add([{foo: 0}, {foo: -1}]);
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 2}]);
        data.remove(function (d,i) {
          return d.foo === 0;
        });
        assert.deepEqual(data.foo.positive.all(), [{key: 0, value: 1}]);
        assert.deepEqual(data.foo.top(Infinity), [{foo: -1}]);
        data.remove(function () {
          return true;
        });
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing a record updates dimension": function(data) {
        data.add([{foo: 1}, {foo: 2}]);
        data.remove(function (d) {
          return d.foo === 1;
        });
        assert.deepEqual(data.foo.top(Infinity), [{foo: 2}]);
        data.remove(function () {
          return true;
        });
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "removing records updates group": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}, {foo: 2}, {foo: 1}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 0, value: 1}, {key: 1, value: 2}]);
        data.remove(function (d) {
          return d.foo < 3;
        });
        assert.deepEqual(data.foo.top(Infinity), [{foo: 3}]);
        assert.deepEqual(data.foo.div2.all(), [{key: 1, value: 1}]);
        data.remove(function () {
          return true;
        });
        assert.deepEqual(data.foo.top(Infinity), []);
        assert.deepEqual(data.foo.div2.all(), []);
      },
      "can remove records while filtering": function(data) {
        data.add([{foo: 1}, {foo: 2}, {foo: 3}]);

        assert.equal(data.allSum.value(), 6);
        assert.deepEqual(data.foo.positive.all(), [
          { key: 1, value: 3 }
        ]);

        data.foo.filter(2);
        assert.equal(data.allSum.value(), 2);

        data.remove(function (d) {
          return d.foo === 3;
        });
        assert.equal(data.allSum.value(), 2);
        assert.deepEqual(data.foo.positive.all(), [
          { key: 1, value: 2 }
        ]);

        data.remove(function (d) {
          return d.foo === 2;
        });
        assert.equal(data.allSum.value(), 0);

        data.foo.filterAll();
        assert.equal(data.allSum.value(), 1);

        data.remove(function () {
          return true;
        });
        assert.deepEqual(data.foo.top(Infinity), []);
      },
      "can remove records using predicate function while filtering on iterable dimension": function(data) {
        var data2 = crossfilter();
        var fooDimension = data2.dimension(function(d) { return d.foo; }, true);
        data2.add([
          {foo: [1, 2, 3], bar: 1},
          {foo: [1, 2   ], bar: 2},
          {foo: [   2, 3], bar: 4}
        ]);
        var fooGroup = fooDimension.group();
        var allBarSum = data2.groupAll().reduceSum(function (d) { return d.bar });
        var fooBarSum = fooDimension.group().reduceSum(function (d) { return d.bar });

        assert.equal(allBarSum.value(), 7);
        assert.deepEqual(fooGroup.all(), [
          { key: 1, value: 2 },
          { key: 2, value: 3 },
          { key: 3, value: 2 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 1, value: 3 },
          { key: 2, value: 7 },
          { key: 3, value: 5 }
        ]);

        fooDimension.filter(3);
        assert.equal(allBarSum.value(), 5);

        data2.remove(function (d) {
          return d.foo.indexOf(1) >= 0;
        });
        assert.equal(allBarSum.value(), 4);
        assert.deepEqual(fooGroup.all(), [
          { key: 2, value: 1 },
          { key: 3, value: 1 }
        ]);
        assert.deepEqual(fooBarSum.all(), [
          { key: 2, value: 4 },
          { key: 3, value: 4 }
        ]);

        fooDimension.filterAll();
        assert.equal(allBarSum.value(), 4);

        data2.remove(function () {
          return true;
        });
        assert.deepEqual(fooDimension.top(Infinity), []);
      }
    },

    "onChange": {
      "topic": function(){
        var data = crossfilter(testData);
        return data;
      },
      "returns a callback function": function(data) {
        var cb = data.onChange(function(){});
        assert.equal(typeof cb, 'function');
      },
      "sends the eventName with the callback": function(data) {
        var name
        var cb = data.onChange(function(n){name = n});
        data.add([1])
        assert.equal(name, 'dataAdded');
      },
      "callback gets called when adding data": function(data) {
        var pass = false;
        var cb = data.onChange(function(){
          pass = true;
        });
        data.add([1]);
        assert.equal(pass, true);
      },
      "callback gets called when removing all data": function(data) {
        var pass = false;
        var cb = data.onChange(function(){
          pass = true;
        });
        data.remove();
        assert.equal(pass, true);
      },
      "callback gets called when removing some data": function(data) {
        var num = 0;
        var cb = data.onChange(function(){
          num++;
        });
        var dateDim = data.dimension(function(d){
          return d.data;
        });
        dateDim.filter('2011-11-14T16:54:06Z');
        data.remove();
        assert.equal(num, 2);
      },
      "callback gets called when filtering data various ways": function(data) {
        var num = 0;
        var cb = data.onChange(function(){
          num++;
        });
        var totalDim = data.dimension(function(d){
          return d.data;
        });
        totalDim.filter([30, 70]);
        totalDim.filter(55);
        totalDim.filter(function(d) { return d % 2; });
        totalDim.filter();

        assert.equal(num, 4);
      },
      "multiple callbacks gets called in sequence of registration": function(data) {
        var pass1,pass2,pass3,pass4,num = 0;
        var cb1 = data.onChange(function(){
          pass1 = ++num;
        });
        var cb2 = data.onChange(function(){
          pass2 = ++num;
        });
        var cb3 = data.onChange(function(){
          pass3 = ++num;
        });
        var cb4 = data.onChange(function(){
          pass4 = ++num;
        });
        var totalDim = data.dimension(function(d){
          return d.data;
        });

        totalDim.filter(50);

        assert.equal(pass1, 1);
        assert.equal(pass2, 2);
        assert.equal(pass3, 3);
        assert.equal(pass4, 4);
      },
      "callback is removed when the returned function called": function(data) {
        var num = 0;
        var cb = data.onChange(function(){
          num++;
        });
        var totalDim = data.dimension(function(d){
          return d.data;
        });
        totalDim.filter([30, 70]);
        totalDim.filter(55);
        cb();
        totalDim.filter(function(d) { return d % 2; });
        totalDim.filter();

        assert.equal(num, 2);
      },
    },
    "iterablesEmptyRows": {
      topic: function(data) {
        var emptyRowsTestData = [
          {name: "apha", labels: []},
          {name: "bravo", labels: []},
          {name: "charle", labels: []},
          {name: "delta", labels: []},
          {name: "echo", labels: ["courageous"]}
        ];
        var data = crossfilter(emptyRowsTestData);
        data.labels = data.dimension(function(d) { return d.labels; }, true);
        return data;
      },
      "top": {
        "returns the top k records by value, placing non-empty row on top": function(data) {
          assert.deepEqual(data.labels.top(5), [
            {name: "echo", labels: ["courageous"]},
            {name: "apha", labels: []},
            {name: "bravo", labels: []},
            {name: "charle", labels: []},
            {name: "delta", labels: []},
          ]);
        },
        "returns the top k records, using offset, by value": function(data) {
          assert.deepEqual(data.labels.top(3, 2), [
            {name: "bravo", labels: []},
            {name: "charle", labels: []},
            {name: "delta", labels: []}
          ]);
        }
      },
      "bottom": {
        "returns the bottom k records by value, placing non-empty row on bottom": function(data) {
          assert.deepEqual(data.labels.bottom(5), [
            {name: "apha", labels: []},
            {name: "bravo", labels: []},
            {name: "charle", labels: []},
            {name: "delta", labels: []},
            {name: "echo", labels: ["courageous"]}
          ]);
        },
        "returns the bottom k records, using offset, by value, in descending order": function(data) {
          assert.deepEqual(data.labels.bottom(3, 2), [
            {name: "charle", labels: []},
            {name: "delta", labels: []},
            {name: "echo", labels: ["courageous"]}
          ]);
        }
      }
    },
    "iterableDimension": {
      "top":{
        "returns the top k records by value, in descending order": function(data) {
          var top = data.tags.top(3)
          assert.equal(top.length, 3)

          assert.equal(Math.max.apply(null, top[0].tags), 5)
          assert.equal(Math.max.apply(null, top[1].tags), 5)
          assert.equal(Math.max.apply(null, top[2].tags), 5)
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.tags.filterExact(1);

            var top = data.tags.top(3)
            assert.equal(top[0].tags.indexOf(1) > -1, true)
            assert.equal(top[1].tags.indexOf(1) > -1, true)
            assert.equal(top[2].tags.indexOf(1) > -1, true)

          } finally {
            data.tags.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.tags.top(1), [
              {date: '2011-11-14T21:18:48Z', quantity: 4, total: 270, tip: 0, type: 'tab', tags: [1,2,3]}
            ]);
            data.quantity.filterAll();
            data.type.filterExact("visa");
            assert.deepEqual(data.tags.top(1), [
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tags.top(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.date.top(2), [
              {date: "2011-11-14T23:28:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]},
              {date: "2011-11-14T23:23:29Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,3,4]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.date.top(1), [
              {date: "2011-11-14T22:58:54Z", quantity: 2, total: 100, tip: 0, type: "visa", tags: [2,3,4]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.tags.top(0), []);
          assert.deepEqual(data.tags.top(-1), []);
          assert.deepEqual(data.tags.top(NaN), []);
          assert.deepEqual(data.tags.top(-Infinity), []);
        }
      },

      "bottom": {
        "returns the bottom k records by value, in descending order": function(data) {
          var bottom = data.tags.bottom(3)

          assert.equal(bottom[0].tags.length, 0)
          assert.equal(bottom[1].tags[0], -1)
          assert.equal(bottom[2].tags[1], 0)
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.quantity.filterExact(4);
            assert.deepEqual(data.tags.bottom(3), [
              {date: '2011-11-14T21:18:48Z',quantity: 4,total: 270,tip: 0,type: 'tab',tags: [1,2,3]},
              {date: '2011-11-14T21:18:48Z',quantity: 4,total: 270,tip: 0,type: 'tab',tags: [1,2,3]},
              {date: '2011-11-14T21:18:48Z',quantity: 4,total: 270,tip: 0,type: 'tab',tags: [1,2,3]}
            ]);
          } finally {
            data.quantity.filterAll();
          }
          try {
            data.date.filterRange([new Date(Date.UTC(2011, 10, 14, 19)), new Date(Date.UTC(2011, 10, 14, 20))]);
            assert.deepEqual(data.tags.bottom(10), [
              {date: '2011-11-14T19:04:22Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1, 2, 3 ]},
              {date: '2011-11-14T19:30:44Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1, 3 ]},
              {date: '2011-11-14T19:00:31Z', quantity: 2, total: 190, tip: 100, type: 'tab', tags: [ 2, 3, 4 ]},
              {date: '2011-11-14T19:04:22Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1, 2, 3 ]},
              {date: '2011-11-14T19:00:31Z', quantity: 2, total: 190, tip: 100, type: 'tab', tags: [ 2, 3, 4 ]},
              {date: '2011-11-14T19:04:22Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1, 2, 3 ]},
              {date: '2011-11-14T19:30:44Z', quantity: 2, total: 90, tip: 0, type: 'tab', tags: [ 1, 3 ]},
              {date: '2011-11-14T19:00:31Z', quantity: 2, total: 190, tip: 100, type: 'tab', tags: [ 2, 3, 4 ]}
            ]);
          } finally {
            data.date.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.type.filterExact("tab");
            assert.deepEqual(data.tags.bottom(2), [
              {date: '2011-11-14T17:22:59Z',quantity: 2,total: 90,tip: 0,type: 'tab',tags: []},
              {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [1,2,3]}
            ]);
            data.type.filterExact("visa");
            assert.deepEqual(data.tags.bottom(1), [
              {date: '2011-11-14T17:29:52Z', quantity: 1, total: 200, tip: 100, type: 'visa', tags: [ -1, 0, 3, 4]}
            ]);
            data.quantity.filterExact(2);
            assert.deepEqual(data.tags.bottom(1), [
              {date: "2011-11-14T17:38:40Z", quantity: 2, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
          } finally {
            data.type.filterAll();
            data.quantity.filterAll();
          }
        },
        "negative or zero k returns an empty array": function(data) {
          assert.deepEqual(data.tags.bottom(0), []);
          assert.deepEqual(data.tags.bottom(-1), []);
          assert.deepEqual(data.tags.bottom(NaN), []);
          assert.deepEqual(data.tags.bottom(-Infinity), []);
        },
      },

      "filterExact": {
        "selects records that match the specified value exactly": function(data) {
          try {
            data.tip.filterExact(100);
            assert.deepEqual(data.tags.top(2), [
              {date: "2011-11-14T23:21:22Z", quantity: 2, total: 190, tip: 100, type: "tab", tags: [2,4,5]},
              {date: "2011-11-14T23:16:09Z", quantity: 1, total: 200, tip: 100, type: "visa", tags: [2,4,5]}
            ]);
          } finally {
            data.tip.filterAll();
          }
        },
        "allows the filter value to be null": function(data) {
          try {
            data.tip.filterExact(null); // equivalent to 0 by natural ordering
            assert.deepEqual(data.tags.top(2), [
              {date: "2011-11-14T22:48:05Z", quantity: 2, total: 91, tip: 0, type: "tab", tags: [2,4,5]},
              {date: '2011-11-14T20:06:33Z', quantity: 1, total: 100, tip: null, type: 'cash', tags: [ 2, 4, 5 ]}
            ]);
          } finally {
            data.tip.filterAll();
          }
        }
      },

      "filterRange": {
        "selects records greater than or equal to the inclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 190]);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total >= 100; }));
            data.total.filterRange([110, 190]);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total >= 110; }));
          } finally {
            data.total.filterAll();
          }
        },
        "selects records less than the exclusive lower bound": function(data) {
          try {
            data.total.filterRange([100, 200]);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total < 200; }));
            data.total.filterRange([100, 190]);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total < 190; }));
          } finally {
            data.total.filterAll();
          }
        }
      },

      "filterAll": {
        "clears the filter": function(data) {
          data.total.filterRange([100, 200]);
          assert.lesser(data.tags.top(Infinity).length, 120);
          data.total.filterAll();
          assert.equal(data.tags.top(Infinity).length, 120);
        }
      },

      "filterFunction": {
        "selects records according to an arbitrary function": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filterAll();
          }
        },
        "respects truthy values": function(data) {
          try {
            var group = data.tags.groupAll().reduceCount();
            data.total.filterRange([200, Infinity]);
            data.total.filterFunction(function(d) { return "0"; });
            assert.equal(group.value(), 119);
            data.total.filterFunction(function(d) { return ""; });
            assert.equal(group.value(), 0);
          } finally {
            data.total.filterAll();
          }
        },
        "groups on the first dimension are updated correctly": function(data) {
          try {
            var group = data.tags.groupAll().reduceCount();
            data.total.filterFunction(function(d) { return d === 90; });
            assert.equal(group.value(), 33);
            data.total.filterFunction(function(d) { return d === 91; });
            assert.equal(group.value(), 3);
          } finally {
            data.total.filterAll();
          }
        },
        "followed by filterRange": function(data) {
          try {
            data.total.filterFunction(function(d) { return d % 2; });
            data.total.filterRange([100, 200]);
            assert.deepEqual(data.tags.top(Infinity).length, 54);
          } finally {
            data.total.filterAll();
          }
        },
        "group values with multiple filters on and off on standard dimension": function(data) {
          try {
            var group = data.tags.group();
            data.total.filterFunction(function(d) { return d === 90; });
            assert.equal(group.all()[group.all().length-1].value, 1);
            data.total.filterAll();
            data.total.filterFunction(function(d) { return d === 91; });
            assert.equal(group.all()[group.all().length-1].value, 1);
            data.total.filterAll();
            assert.equal(group.all()[group.all().length-1].value, 13);
          } finally {
            data.total.filterAll();
          }
        },
        "group values with multiple filters on and off on iterable dimension": function(data) {
          try {
            var group = data.total.groupAll().reduceCount();
            assert.equal(group.value(), 43);
            data.tags.filterFunction(function(d) { return d === 1; });
            assert.equal(group.value(), 18);
            data.tags.filterAll();
            assert.equal(group.value(), 43);
            data.tags.filterFunction(function(d) { return d === 1; });
            assert.equal(group.value(), 18);
            data.tags.filterAll();
            assert.equal(group.value(), 43);
          } finally {
            data.tags.filterAll();
          }
        },
        "group values with multiple overlapping filters": function(data) {
          try {
            var group = data.total.groupAll().reduceCount();
            assert.equal(group.value(), 43);
            data.tags.filterFunction(function(d) { return d === 1; });
            assert.equal(group.value(), 18);
            data.tags.filterFunction(function(d) { return d === 2; });
            assert.equal(group.value(), 33);
            data.tags.filterAll();
            assert.equal(group.value(), 43);
          } finally {
            data.tags.filterAll();
          }
        }
      },

      "filter": {
        "is equivalent to filterRange when passed an array": function(data) {
          try {
            data.total.filter([100, 190]);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total >= 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterExact when passed a single value": function(data) {
          try {
            data.total.filter(100);
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total == 100; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterFunction when passed a function": function(data) {
          try {
            data.total.filter(function(d) { return d % 2; });
            assert.isTrue(data.tags.top(Infinity).every(function(d) { return d.total % 2; }));
          } finally {
            data.total.filter(null);
          }
        },
        "is equivalent to filterAll when passed null": function(data) {
          data.total.filter([100, 200]);
          assert.lesser(data.tags.top(Infinity).length, 120);
          data.total.filter(null);
          assert.equal(data.tags.top(Infinity).length, 120);
        }
      },

      "group": {
        topic: function(data) {
          data.date.hours = data.date.group(function(d) { d = new Date(+d); d.setHours(d.getHours(), 0, 0, 0); return d; });
          data.tags.all = data.tags.group();
          return data;
        },

        "key defaults to value": function(data) {
          assert.deepEqual(data.tags.all.top(Infinity), [
            { key: 2, value: 33 },
            { key: 3, value: 29 },
            { key: 4, value: 24 },
            { key: 1, value: 18 },
            { key: 5, value: 13 },
            { key: 0, value: 1 },
            { key: -1, value: 1 }
          ]);
        },

        "cardinality may be greater than 256": function() {
          var data = crossfilter(d3.range(256).concat(256, 256).map(function(d){
            return {tags: [d, d+1, d+2]}
          })),
              index = data.dimension(function(d) { return d.tags; }, true),
              indexes = index.group();
          assert.deepEqual(index.top(2), [
            {tags:[256, 257, 258]},
            {tags:[256, 257, 258]}
          ]);
          assert.deepEqual(indexes.top(1), [{ key: 256, value: 4 }]);
          assert.equal(indexes.size(), 259);
        },

        "cardinality may be greater than 65536": function() {
          var data = crossfilter(d3.range(65536).concat(65536, 65536).map(function(d){
            return {tags: [d, d+1, d+2]}
          })),
              index = data.dimension(function(d) { return d.tags; }, true),
              indexes = index.group();
          assert.deepEqual(index.top(2), [
            {tags: [ 65536, 65537, 65538 ]},
            {tags: [ 65536, 65537, 65538 ]}
          ]);
          assert.deepEqual(indexes.top(1), [{key: 65536, value: 4}]);
          assert.equal(indexes.size(), 65539);
        },

        "adds all records before removing filtered": function(data) {
          try {
            data.quantity.filter(1);
            // Group only adds
            var addGroup = data.tags.group().reduce(
                function(p, v) {
                  ++p;
                  return p;
                }, function(p, v) {
                  return p;
                }, function() {
                  return 0;
                }
              );
            // Normal group
            var stdGroup = data.tags.group();
            assert.isTrue(addGroup.top(1)[0].value > stdGroup.top(1)[0].value);
          } finally {
            data.quantity.filterAll();
          }
        },

        "size": {
          "returns the cardinality": function(data) {
            assert.equal(data.date.hours.size(), 8);
            assert.equal(data.tags.all.size(), 7);
          },
          "ignores any filters": function(data) {
            try {
              data.tags.filterExact(1);
              data.quantity.filterRange([100, 200]);
              assert.equal(data.date.hours.size(), 8);
              assert.equal(data.tags.all.size(), 7);
            } finally {
              data.quantity.filterAll();
              data.tags.filterAll();
            }
          }
        },

        "reduce": {
          "defaults to count": function(data) {
            assert.deepEqual(data.tags.all.top(1), [
              { key: 2, value: 33 }
            ]);
          },
          "determines the computed reduce value": function(data) {
            try {
              data.tags.all.reduceSum(function(d) { return d.total; });
              assert.deepEqual(data.tags.all.top(Infinity), [
                { key: 2, value: 5241 },
                { key: 3, value: 4229 },
                { key: 4, value: 3861 },
                { key: 1, value: 2709 },
                { key: 5, value: 2341 },
                { key: 0, value: 200 },
                { key: -1, value: 200 }
              ]);
            } finally {
              data.tags.all.reduceCount();
            }
          },
          "gives reduce functions information on lifecycle of data element": {
            "topic": function() {
              var data = crossfilter();
              data.add([{foo: 1, val: [1, 2]}, {foo: 2, val: [1,2]}, {foo: 3, val: [3, 4, 5]}, {foo: 3, val: [1,2]}]);
              data.foo = data.dimension(function(d) { return d.foo; });
              data.bar = data.dimension(function(d) { return d.foo; });
              data.val = data.dimension(function(d) { return d.val; }, true);
              data.val.groupSumLength = data.val.group().reduce(function(p,v,n){
                if(n) {
                  p += v.val.length;
                }
                return p;
              }, function(p,v,n) {
                if(n) {
                  p -= v.val.length;
                }
                return p;
              }, function() {
                return 0;
              });
              data.val.groupSumEach = data.val.group().reduceSum(function(d) {
                return d.val.length
              });

              return data;
            },
            "on group creation": function(data) {
              assert.deepEqual(data.val.groupSumLength.all(), data.val.groupSumEach.all());
            },
            "on filtering": function(data) {
              data.foo.filterRange([1,2]);
              assert.deepEqual(data.val.groupSumLength.all(), [
                { key: 1, value: 6 },
                { key: 2, value: 6 },
                { key: 3, value: 3 },
                { key: 4, value: 3 },
                { key: 5, value: 3 }
              ]);
              assert.deepEqual(data.val.groupSumEach.all(), [
                { key: 1, value: 2 },
                { key: 2, value: 2 },
                { key: 3, value: 0 },
                { key: 4, value: 0 },
                { key: 5, value: 0 }
              ]);
              data.foo.filterAll();
            },
            "on adding data after group creation": function(data) {
              data.add([{foo: 1, val: [5,6,7]}]);
              assert.deepEqual(data.val.groupSumLength.all(), data.val.groupSumEach.all());
            },
            "on adding data when a filter is in place": function(data) {
              data.foo.filterRange([1,3]);
              data.add([{foo: 3, val: [6]}]);
              assert.deepEqual(data.val.groupSumLength.all(), [
                { key: 1, value: 6 },
                { key: 2, value: 6 },
                { key: 3, value: 3 },
                { key: 4, value: 3 },
                { key: 5, value: 6 },
                { key: 6, value: 4 },
                { key: 7, value: 3 }
              ]);
              assert.deepEqual(data.val.groupSumEach.all(), [
                { key: 1, value: 4 },
                { key: 2, value: 4 },
                { key: 3, value: 0 },
                { key: 4, value: 0 },
                { key: 5, value: 3 },
                { key: 6, value: 3 },
                { key: 7, value: 3 }
              ]);
              data.foo.filterAll();
            },
            "on removing data after group creation": function(data) {
              data.val.filter(2);
              data.remove();
              assert.deepEqual(data.val.groupSumLength.all(), [
                { key: 3, value: 3 },
                { key: 4, value: 3 },
                { key: 5, value: 6 },
                { key: 6, value: 4 },
                { key: 7, value: 3 }
              ]);
              assert.deepEqual(data.val.groupSumEach.all(), [
                { key: 3, value: 3 },
                { key: 4, value: 3 },
                { key: 5, value: 6 },
                { key: 6, value: 4 },
                { key: 7, value: 3 }
              ]);

              data.val.filterAll();
              assert.deepEqual(data.val.groupSumLength.all(), data.val.groupSumEach.all());
            }
          }
        },

        "top": {
          "returns the top k groups by reduce value, in descending order": function(data) {
            assert.deepEqual(data.tags.all.top(3), [
              { key: 2, value: 33 },
              { key: 3, value: 29 },
              { key: 4, value: 24 }
            ]);
          },
          "observes the specified order": function(data) {
            try {
              data.tags.all.order(function(v) { return -v; });
              assert.deepEqual(data.tags.all.top(3), [
                { key: 0, value: 1 },
                { key: -1, value: 1 },
                { key: 5, value: 13 }
              ]);
            } finally {
              data.tags.all.order(function(v) { return v; });
            }
          }
        },

        "order": {
          "defaults to the identity function": function(data) {
            assert.deepEqual(data.tags.all.top(1), [
              { key: 2, value: 33 }
            ]);
          },
          "is useful in conjunction with a compound reduce value": function(data) {
            try {
              data.tags.all.reduce(
                  function(p, v) { ++p.count; p.total += v.total; return p; },
                  function(p, v) { --p.count; p.total -= v.total; return p; },
                  function() { return {count: 0, total: 0}; })
                  .order(function(v) { return v.total; });
              assert.deepEqual(data.tags.all.top(1), [
                {
                    key: 2,
                    value: { count: 33, total: 5241 }
                }
              ]);
            } finally {
              data.tags.all.reduceCount().orderNatural();
            }
          }
        },

        "works for empty arrays in middle or end": function() {
          var data = crossfilter([
              {tags: [1,2,3]},
              {tags: []},
              {tags: [1,2,3]},
              {tags: [3]},
              {tags: []}
            ]),
            dimension = data.dimension(function(d) { return d.tags; }, true),
            group = dimension
                  .group(function(d) { return d;} );
            group.top(10);
        },

        "dispose": {
          "detaches from reduce listeners": function() {
            var data = crossfilter([
              {tags: [1,2,3]},
              {tags: [1,2,3]},
              {tags: [3]}
            ]),
                callback, // indicates a reduce has occurred in this group
                dimension = data.dimension(function(d) { return d.tags; }, true),
                other = data.dimension(function(d) { return d.tags; }, true),
                group = dimension
                  .group(function(d) { return d;} )
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            other.filterRange([1, 2]);
            assert.isFalse(callback);
          },
          "detaches from add listeners": function() {
            var data = crossfilter([
              {tags: [1,2,3]},
              {tags: [1,2,3]},
              {tags: [3]}
            ]),
                callback, // indicates data has been added and the group has been reduced
                dimension = data.dimension(function(d) { return d.tags; }, true),
                group = dimension
                  .group(function(d) { return d; })
                  .reduce(function() { callback = true; }, function() { callback = true; }, function() {});
            group.all(); // force this group to be reduced when filters change
            callback = false;
            group.dispose();
            data.add({tags: [3]}, {tags: [4,5]}, {tags: [4,5,6]});
            assert.isFalse(callback);
          }
        },
      },
    },
    "iterable add": {
      topic: function() {
        var firstSet = [
          {name: "alpha", quantity: 1, tags: [1, 2]},
          {name: "bravo", quantity: 2, tags: [1]},
          {name: "charlie", quantity: 1, tags: []}
        ];
        var secondSet = [
          {name: "delta", quantity: 0, tags: [2]},
          {name: "echo", quantity: 3, tags: []}
        ];
        var data = crossfilter();
        data.tags = data.dimension(function(d) { return d.tags; }, true);
        data.quantity = data.dimension(function(d) { return d.quantity });
        data.add(firstSet);
        data.add(secondSet);
        return data;
      },
      "top": {
        "returns the top k records by value, in descending order": function(data) {
          var top = data.tags.top(7);
          assert.equal(top.length, 6);
          assert.equal(Math.max.apply(null, top[0].tags), 2);
          assert.equal(Math.max.apply(null, top[1].tags), 2);
          assert.equal(Math.min.apply(null, top[2].tags), 1);
          assert.equal(Math.min.apply(null, top[3].tags), 1);
          assert.equal(top[4].tags.length, 0);
          assert.equal(top[5].tags.length, 0);
        },
        "observes the associated dimension's filters": function(data) {
          try {
            data.tags.filterExact(2);

            var top = data.tags.top(3);
            assert.equal(top.length, 2);
            assert.equal(top[0].tags.indexOf(2) > -1, true);
            assert.equal(top[1].tags.indexOf(2) > -1, true);

          } finally {
            data.tags.filterAll();
          }
        },
        "others observe the associated dimension's filters": function(data) {
          try {
            data.tags.filterExact(2);

            var top = data.quantity.top(3);
            assert.equal(top.length, 2);
            assert.equal(top[0].tags.indexOf(2) > -1, true);
            assert.equal(top[1].tags.indexOf(2) > -1, true);

          } finally {
            data.tags.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.quantity.filterExact(1);

            var top = data.tags.top(4);
            assert.equal(top.length, 3);
            assert.equal(top[0].name, "alpha");
            assert.equal(top[1].name, "alpha");
            assert.equal(top[2].name, "charlie");
          } finally {
            data.quantity.filterAll();
          }
        }
      },
      "bottom": {
        "returns the bottom k records by value, in descending order": function(data) {
          var bottom = data.tags.bottom(7);
          assert.equal(bottom.length, 6);
          assert.equal(bottom[0].tags.length, 0);
          assert.equal(bottom[1].tags.length, 0);
          assert.equal(Math.min.apply(null, bottom[2].tags), 1);
          assert.equal(Math.min.apply(null, bottom[3].tags), 1);
          assert.equal(Math.max.apply(null, bottom[4].tags), 2);
          assert.equal(Math.max.apply(null, bottom[5].tags), 2);
        }
      },
      "force order when adding": {
        topic: function() {
          var firstSet = [
            {name: "alpha", quantity: 1, tags: [1, 2]},
            {name: "bravo", quantity: 2, tags: []},
          ];
          var secondSet = [
            {name: "charlie", quantity: 0, tags: [3, 4]},
            {name: "delta", quantity: 0, tags: [2, 3]},
            {name: "echo", quantity: 3, tags: [4, 5]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity });
          data.add(firstSet);
          data.add(secondSet);
          return data;
        },
        "others observe the associated dimension's filters": function(data) {
          try {
            data.tags.filterFunction(function(d) { return d === 1; });

            var top = data.quantity.top(2);
            assert.equal(top.length, 1);
            assert.equal(top[0].tags.indexOf(1) > -1, true);

          } finally {
            data.tags.filterAll();
          }
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.quantity.filterFunction(function(d) { return d === 1; });

            var top = data.tags.top(3);
            assert.equal(top.length, 2);
            assert.equal(top[0].name, "alpha");
            assert.equal(top[1].name, "alpha");
          } finally {
            data.quantity.filterAll();
          }
        }
      },
      "group": {
        topic: function() {
          var firstSet = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
          ];
          var secondSet = [
            {name: "charlie", quantity: 0, tags: [2]},
            {name: "delta", quantity: 2, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.add(secondSet);
          return data;
        },
        "records added correctly": function(data) {
          var top = data.tagGroup.top(5);
          assert.equal(top.length, 4);
          assert.equal(top[0].value, 3);
          assert.equal(top[1].value, 2);
          assert.equal(top[2].value, 2);
          assert.equal(top[3].value, 1);
          assert.equal(top[0].key, 3);
          assert.equal(top[3].key, 4)
        },
        "observes other dimensions' filters": function(data) {
          try {
            data.quantity.filterFunction(function(d) { return d === 0; });
            var top = data.tagGroup.top(5);
            assert.equal(top.length, 4);
            assert.equal(top[0].value, 1);
            assert.equal(top[0].value, 1);
            assert.equal(top[1].value, 1);
            assert.equal(top[2].value, 1);
            assert.equal(top[3].value, 0);
            assert.equal(top[3].key, 4);
          } finally {
            data.quantity.filterAll();
          }
        },
        "one tag with one empty": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.tagGroup = data.tags.group();
          data.add(set);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "one tag then add empty": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: [1]}
          ];
          var secondSet = [
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.add(secondSet);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "empty tag then add one tag": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: []}
          ];
          var secondSet = [
            {name: "bravo", quantity: 1, tags: [1]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.add(secondSet);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "one tag then add one more tag": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: [1]}
          ];
          var secondSet = [
            {name: "bravo", quantity: 1, tags: [2]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.add(secondSet);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1},
            {key: 2, value: 1}
          ]);
        }
      }
    },
    "iterable remove" : {
      "dimension": {
        "other dimension filtered remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.add(set);
          data.quantity.filterExact(3);
          data.remove();
          data.quantity.filterAll();
          var top = data.tags.top(7);
          assert.equal(top.length, 6);
          assert.equal(Math.max.apply(null, top[0].tags), 4);
          assert.equal(Math.max.apply(null, top[1].tags), 3);
          assert.equal(Math.min.apply(null, top[1].tags), 1);
          assert.equal(Math.max.apply(null, top[2].tags), 3);
          assert.equal(Math.min.apply(null, top[2].tags), 1);
          assert.equal(Math.max.apply(null, top[3].tags), 3);
          assert.equal(Math.min.apply(null, top[3].tags), 1);
          assert.equal(Math.max.apply(null, top[4].tags), 3);
          assert.equal(Math.min.apply(null, top[4].tags), 1);
          assert.equal(top[5].tags.length, 0);
        },
        "self filterExact remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.add(set);
          data.tags.filterExact(2);
          data.remove();
          data.tags.filterAll();
          var top = data.tags.top(7);
          assert.equal(top.length, 6);
          assert.equal(Math.max.apply(null, top[0].tags), 4);
          assert.equal(Math.max.apply(null, top[1].tags), 3);
          assert.equal(Math.min.apply(null, top[1].tags), 1);
          assert.equal(Math.max.apply(null, top[2].tags), 3);
          assert.equal(Math.min.apply(null, top[2].tags), 1);
          assert.equal(Math.max.apply(null, top[3].tags), 3);
          assert.equal(Math.min.apply(null, top[3].tags), 1);
          assert.equal(Math.max.apply(null, top[4].tags), 3);
          assert.equal(Math.min.apply(null, top[4].tags), 1);
          assert.equal(top[5].tags.length, 0);
        },
        "self filterFunction remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.add(set);
          data.tags.filterFunction(function(d) { return d === 2; });
          data.remove();
          data.tags.filterAll();
          var top = data.tags.top(7);
          assert.equal(top.length, 6);
          assert.equal(Math.max.apply(null, top[0].tags), 4);
          assert.equal(Math.max.apply(null, top[1].tags), 3);
          assert.equal(Math.min.apply(null, top[1].tags), 1);
          assert.equal(Math.max.apply(null, top[2].tags), 3);
          assert.equal(Math.min.apply(null, top[2].tags), 1);
          assert.equal(Math.max.apply(null, top[3].tags), 3);
          assert.equal(Math.min.apply(null, top[3].tags), 1);
          assert.equal(Math.max.apply(null, top[4].tags), 3);
          assert.equal(Math.min.apply(null, top[4].tags), 1);
          assert.equal(top[5].tags.length, 0);
        },
        "other dimension filtered then self filterFunction remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity; });
          data.add(set);
          data.quantity.filterExact(3);
          data.remove();
          data.quantity.filterAll();
          data.tags.filterFunction(function(d) { return d === 1; });
          data.remove();
          data.tags.filterAll();
          assert.deepEqual(data.tags.top(3), [
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ]);
        },
        "remove then add": function() {
          var firstSet = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var secondSet = [
            {name: "golf", quantity: 3, tags: [1]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity; });
          data.add(firstSet);
          data.quantity.filterExact(3);
          data.remove();
          data.quantity.filterAll();
          data.tags.filterFunction(function(d) { return d === 1; });
          data.remove();
          data.tags.filterAll();
          data.add(secondSet);
          assert.deepEqual(data.tags.top(3), [
            {name: "echo", quantity: 2, tags: [4]},
            {name: "golf", quantity: 3, tags: [1]},
            {name: "foxtrot", quantity: 1, tags: []}
          ]);
        },
        "filter then remove empty tag to only one tag": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.add(set);
          data.quantity.filterExact(1);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tags.top(2), [
            {name: "alpha", quantity: 2, tags: [1]}
          ]);
        },
        "filter remove one tag to only empty tag": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.add(set);
          data.quantity.filterExact(2);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tags.top(2), [
            {name: "bravo", quantity: 1, tags: []}
          ]);
        },
        "remove multiple tag, add single tag, others observer filter": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: [2, 3]}
          ];
          var secondSet = [
            {name: "charlie", quantity: 3, tags: [4]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.add(firstSet);
          data.quantity.filterExact(1);
          data.remove();
          data.quantity.filterAll();
          data.add(secondSet);
          data.tags.filterExact(1);
          assert.deepEqual(data.quantity.top(2), [
            {name: "alpha", quantity: 2, tags: [1]},
          ]);
        }
      },
      "group": {
        "other dimension filtered remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(set);
          data.quantity.filterExact(3);
          var top2 = data.tagGroup.top(5);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 2},
            {key: 3, value: 2},
            {key: 4, value: 1}
          ]);
        },
        "self filterExact remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.tagGroup = data.tags.group();
          data.add(set);
          data.tags.filterExact(2);
          data.remove();
          data.tags.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 2},
            {key: 3, value: 2},
            {key: 4, value: 1}
          ]);
        },
        "self filterFunction remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.tagGroup = data.tags.group();
          data.add(set);
          data.tags.filterFunction(function(d) { return d === 2; });
          data.remove();
          data.tags.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 2},
            {key: 3, value: 2},
            {key: 4, value: 1}
          ]);
        },
        "other dimension filtered then self filterFunction remove": function() {
          var set = [
            {name: "alpha", quantity: 1, tags: [1, 3]},
            {name: "bravo", quantity: 0, tags: [1, 3]},
            {name: "charlie", quantity: 3, tags: [2]},
            {name: "delta", quantity: 3, tags: [2, 3]},
            {name: "echo", quantity: 2, tags: [4]},
            {name: "foxtrot", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) { return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(set);
          data.quantity.filterExact(3);
          data.remove();
          data.quantity.filterAll();
          data.tags.filterFunction(function(d) { return d === 1; });
          data.remove();
          data.tags.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 4, value: 1}
          ]);
        },
        "filter then remove to one tag with one empty": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []},
            {name: "charlie", quantity: 0, tags: [2]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(set);
          data.quantity.filterExact(0);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "filter then remove empty tag to only one tag": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(set);
          data.quantity.filterExact(1);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "filter then remove one tag to only empty tag": function() {
          var set = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(set);
          data.quantity.filterExact(2);
          data.remove();
          data.quantity.filterAll();
          assert.deepEqual(data.tagGroup.all(), []);
        },
        "remove then add one tag back": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var secondSet = [
            {name: "alpha", quantity: 2, tags: [1]}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.quantity.filterExact(2);
          data.remove();
          data.quantity.filterAll();
          data.add(secondSet);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
        "remove then add empty tag back": function() {
          var firstSet = [
            {name: "alpha", quantity: 2, tags: [1]},
            {name: "bravo", quantity: 1, tags: []}
          ];
          var secondSet = [
            {name: "bravo", quantity: 1, tags: []}
          ];
          var data = crossfilter();
          data.tags = data.dimension(function(d) { return d.tags; }, true);
          data.quantity = data.dimension(function(d) {return d.quantity; });
          data.tagGroup = data.tags.group();
          data.add(firstSet);
          data.quantity.filterExact(1);
          data.remove();
          data.quantity.filterAll();
          data.add(secondSet);
          assert.deepEqual(data.tagGroup.all(), [
            {key: 1, value: 1}
          ]);
        },
      }
    },
    "isElementFiltered": {
      "Test if elements are filtered": function(data) {
        try {
          assert.isTrue(data.isElementFiltered(0)); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2)); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6)); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.quantity])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.quantity])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity])); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.total])); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.quantity,data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.quantity,data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity,data.total])); // quantity = 1; total = 100;

          data.quantity.filterExact(1);
          assert.isFalse(data.isElementFiltered(0)); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2)); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6)); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.quantity])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.quantity])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity])); // quantity = 1; total = 100;
          assert.isFalse(data.isElementFiltered(0,[data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.total])); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.quantity,data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.quantity,data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity,data.total])); // quantity = 1; total = 100;

          data.total.filterExact(100);
          assert.isFalse(data.isElementFiltered(0)); // quantity = 2; total = 190;
          assert.isFalse(data.isElementFiltered(2)); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6)); // quantity = 1; total = 100;
          assert.isFalse(data.isElementFiltered(0,[data.quantity])); // quantity = 2; total = 190;
          assert.isFalse(data.isElementFiltered(2,[data.quantity])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity])); // quantity = 1; total = 100;
          assert.isFalse(data.isElementFiltered(0,[data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.total])); // quantity = 1; total = 100;
          assert.isTrue(data.isElementFiltered(0,[data.quantity,data.total])); // quantity = 2; total = 190;
          assert.isTrue(data.isElementFiltered(2,[data.quantity,data.total])); // quantity = 1; total = 300;
          assert.isTrue(data.isElementFiltered(6,[data.quantity,data.total])); // quantity = 1; total = 100;
        } finally {
          data.quantity.filterAll();
          data.total.filterAll();
        }
      },
    },
    "filter the 32nd dimension": function() {
      var dataSet = [];

      var itemBuilder = (fieldCount, value) => {
        var item = {};
        for (var i = 0; i < fieldCount; i++) {
          item['f' + (i + 1)] = value;
        }
        return item;
      }

      dataSet.push(itemBuilder(34, 'a'));
      dataSet.push(itemBuilder(34, 'b'));
      var data = crossfilter(dataSet);

      var dimensions = Object.keys(dataSet[0]).map(key => data.dimension(d => d[key]));
      var groups = dimensions.map(d => d.group());
      dimensions[31].filterExact('a');
      // correct group value
      const correctGroupValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
      assert.deepEqual(groups.map(g => g.all()[1].value), correctGroupValue);

      dimensions[31].filter(null);
      dimensions[31].filterExact('a');

      assert.deepEqual(groups.map(g => g.all()[1].value), correctGroupValue);
    },
  }
});

function key(d) {
  return d.key;
}

suite.export(module);
