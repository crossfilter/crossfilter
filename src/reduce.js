function reduceIncrement(p) {
  return p + 1;
}

function reduceDecrement(p) {
  return p - 1;
}

function reduceAdd(f) {
  return function(p, v) {
    return p + +f(v);
  };
}

function reduceSubtract(f) {
  return function(p, v) {
    return p - f(v);
  };
}

export default {
  reduceIncrement: reduceIncrement,
  reduceDecrement: reduceDecrement,
  reduceAdd: reduceAdd,
  reduceSubtract: reduceSubtract
};
