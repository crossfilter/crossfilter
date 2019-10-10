// Note(cg): result was previsouly using lodash.result, not ESM compatible.
 
const get = (obj, prop) => {
  const value = obj[prop];
  return (typeof value === 'function') ? value.call(obj) : value;
}

// Note(cg): deep is *very much!* inspired from https://github.com/ranfdev/deepobj
// I prefer removing small dependencies like this one, also for security reasons.
const reg = /\[([\w\d]+)\]/g;
const deep = (action, obj, keys, id, key) => {
  keys = keys.split ? keys.replace(reg, '.$1').split(".") : keys ;
  id = keys.splice(-1, 1);
  for (key in keys) obj = obj[keys[key]] = obj[keys[key]] || {};
  return action(obj, id);
}

/**
 * get value of object at a deep path.
 * if the resolved value is a function,
 * it's invoked with the `this` binding of 
 * its parent object and its result is returned. 
 *  
 * @param  {Object} obj  the object (e.g. { 'a': [{ 'b': { 'c1': 3, 'c2': 4} }], 'd': {e:1} }; )
 * @param  {String} path deep path (e.g. `d.e`` or `a[0].b.c1`. Dot notation (a.0.b)is also supported)
 * @return {Any}      the resolved value
 */
export default (obj, path) => {
  return deep(get, obj, path)
}