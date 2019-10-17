import deep from "@ranfdev/deepobj"
// Note(cg): result was previsouly using lodash.result, not ESM compatible.
 
const get = (obj, prop) => {
  const value = obj[prop];
  return (typeof value === 'function') ? value.call(obj) : value;
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
const reg = /\[([\w\d]+)\]/g;
export default (obj, path) => {
  return deep(get, obj, path.replace(reg, '.$1'))
}
