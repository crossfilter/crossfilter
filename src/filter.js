const filterExact = (bisect, value) => {
  return function(values) {
    var n = values.length;
    return [bisect.left(values, value, 0, n), bisect.right(values, value, 0, n)];
  };
}

const filterRange = (bisect, range) => {
  var min = range[0],
      max = range[1];
  return function(values) {
    var n = values.length;
    return [bisect.left(values, min, 0, n), bisect.left(values, max, 0, n)];
  };
}

const filterAll = values => {
  return [0, values.length];
}

export default {
  filterExact,
  filterRange,
  filterAll
};
