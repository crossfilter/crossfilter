const reduceIncrement = p => {
  return p + 1;
}

const reduceDecrement = p => {
  return p - 1;
}

const reduceAdd = f => {
  return function(p, v) {
    return p + +f(v);
  };
}

const reduceSubtract = f => {
  return function(p, v) {
    return p - f(v);
  };
}

export default {
  reduceIncrement,
  reduceDecrement,
  reduceAdd,
  reduceSubtract
};
