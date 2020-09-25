let array8 = arrayUntyped,
    array16 = arrayUntyped,
    array32 = arrayUntyped,
    arrayLengthen = arrayLengthenUntyped,
    arrayWiden = arrayWidenUntyped;
if (typeof Uint8Array !== "undefined") {
  array8 = function(n) { return new Uint8Array(n); };
  array16 = function(n) { return new Uint16Array(n); };
  array32 = function(n) { return new Uint32Array(n); };

  arrayLengthen = function(array, length) {
    if (array.length >= length) return array;
    var copy = new array.constructor(length);
    copy.set(array);
    return copy;
  };

  arrayWiden = function(array, width) {
    var copy;
    switch (width) {
      case 16: copy = array16(array.length); break;
      case 32: copy = array32(array.length); break;
      default: throw new Error("invalid array width!");
    }
    copy.set(array);
    return copy;
  };
}

function arrayUntyped(n) {
  var array = new Array(n), i = -1;
  while (++i < n) array[i] = 0;
  return array;
}

function arrayLengthenUntyped(array, length) {
  var n = array.length;
  while (n < length) array[n++] = 0;
  return array;
}

function arrayWidenUntyped(array, width) {
  if (width > 32) throw new Error("invalid array width!");
  return array;
}

// An arbitrarily-wide array of bitmasks
function bitarray(n) {
  this.length = n;
  this.subarrays = 1;
  this.width = 8;
  this.masks = {
    0: 0
  }

  this[0] = array8(n);
}

bitarray.prototype.lengthen = function(n) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    this[i] = arrayLengthen(this[i], n);
  }
  this.length = n;
};

// Reserve a new bit index in the array, returns {offset, one}
bitarray.prototype.add = function() {
  var m, w, one, i, len;

  for (i = 0, len = this.subarrays; i < len; ++i) {
    m = this.masks[i];
    w = this.width - (32 * i);
    // isolate the rightmost zero bit and return it as an unsigned int of 32 bits, if NaN or -1, return a 0 
    one = (~m & (m + 1)) >>> 0;

    if (w >= 32 && !one) {
      continue;
    }

    if (w < 32 && (one & (1 << w))) {
      // widen this subarray
      this[i] = arrayWiden(this[i], w <<= 1);
      this.width = 32 * i + w;
    }

    this.masks[i] |= one;

    return {
      offset: i,
      one: one
    };
  }

  // add a new subarray
  this[this.subarrays] = array8(this.length);
  this.masks[this.subarrays] = 1;
  this.width += 8;
  return {
    offset: this.subarrays++,
    one: 1
  };
};

// Copy record from index src to index dest
bitarray.prototype.copy = function(dest, src) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    this[i][dest] = this[i][src];
  }
};

// Truncate the array to the given length
bitarray.prototype.truncate = function(n) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    for (var j = this.length - 1; j >= n; j--) {
      this[i][j] = 0;
    }
  }
  this.length = n;
};

// Checks that all bits for the given index are 0
bitarray.prototype.zero = function(n) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n]) {
      return false;
    }
  }
  return true;
};

// Checks that all bits for the given index are 0 except for possibly one
bitarray.prototype.zeroExcept = function(n, offset, zero) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (i === offset ? this[i][n] & zero : this[i][n]) {
      return false;
    }
  }
  return true;
};

// Checks that all bits for the given index are 0 except for the specified mask.
// The mask should be an array of the same size as the filter subarrays width.
bitarray.prototype.zeroExceptMask = function(n, mask) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n] & mask[i]) {
      return false;
    }
  }
  return true;
}

// Checks that only the specified bit is set for the given index
bitarray.prototype.only = function(n, offset, one) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n] != (i === offset ? one : 0)) {
      return false;
    }
  }
  return true;
};

// Checks that only the specified bit is set for the given index except for possibly one other
bitarray.prototype.onlyExcept = function(n, offset, zero, onlyOffset, onlyOne) {
  var mask;
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    mask = this[i][n];
    if (i === offset)
      mask = (mask & zero) >>> 0;
    if (mask != (i === onlyOffset ? onlyOne : 0)) {
      return false;
    }
  }
  return true;
};

export default {
  array8: arrayUntyped,
  array16: arrayUntyped,
  array32: arrayUntyped,
  arrayLengthen: arrayLengthenUntyped,
  arrayWiden: arrayWidenUntyped,
  bitarray: bitarray
};
