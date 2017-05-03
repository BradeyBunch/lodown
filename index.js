'use strict';

// YOU KNOW WHAT TO DO //
/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * @param {Array or Object} collection: The collection over which to iterate
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/** 
 * identity: returns the argument unchanged
 * @param {Anything} value: Whatever value you want returned untouched
*/
function identity(value) {
    return value;
}
module.exports.identity = identity;

/** 
 * typeOf: Returns the type of a value in a string format
 * @param {Anything} value: Whatever value you want to know the type of
*/
function typeOf(value) {
  if(Array.isArray(value)) return 'array';
  if(value === null) return 'null';
  if(value instanceof Date) return 'date';
  return typeof value;  
}
module.exports.typeOf = typeOf;

/** 
 * first: Returns the first <n> elements in your array. If no number
 * is given or if the value given is not a number than it will
 * just return the first element of the array
 * @param {Array} arr: The array you want to loop through
 * @param {Number} n: The first number of elements in the array you want
 * to return
*/
function first(arr, n){
    if(!Array.isArray(arr) || n < 0) return [];
    if(n === undefined) return arr[0];
    return arr.slice(0, n);
}
module.exports.first = first;

/** 
 * last: Returns the last <n> elements of an array. If no number is given
 * or the value given is not a number then it will return only the
 * last element of the array
 * @param {Array} arr: The array you want to loop through
 * @param {number} n: The last number of elements in the array you want
 * to return
*/
function last(arr, n) {
    if(!Array.isArray(arr) || n < 0) return [];
    if(n === undefined) return arr[arr.length -1];
    return arr.slice(-n); 
}
module.exports.last = last;

/** 
 * indexOf: Returns the index of <arr> that is the first occurrance of <value>.
 * Returns -1 if <value> is not in <arr>
 * @param {Array} arr: the array you want to loop through
 * @param {Value} value: The item you want the index of
*/
function indexOf(arr, value) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === value) return i;
    }
    return -1;
}
module.exports.indexOf = indexOf;

/** 
 * filter: Calls <func> for each element in <arr> passing the arguments:
 * the element, it's index, <arr>. Returns a new array of elements for
 * which calling <func> returned true
 * @param {Array} arr: The array you want to loop through
 * @param {Function} func: The function yuo want carried out
*/
function filter(arr, func) {
    const filtered = [];
    each(arr, function(value, pos, arr) {
        if(func(value, pos, arr)) filtered.push(value);
    });
    return filtered;
}
module.exports.filter = filter;

/** 
 * reject: Calls <func> for each element in <arr> passing the arguments:
 * the element, it's index, <arr>. Returns a new array of elements for
 * which calling <func> returned false
 * @param {Array} arr: The array you want to loop through
 * @param {Function} func: The function you want carried out
*/
function reject(arr, func) {
    const rejected = [];
    filter(arr, function(value, pos, arr) {
        if(!func(value, pos, arr)) rejected.push(value);
    });
    return rejected;
}
module.exports.reject = reject;

/** 
 * partition: Calls <function> for each element in <array> passing it the
 * arguments-element, key, <array>. Returns an array that is made up of 2 sub
 * arrays: 1 of items that returned truthy, 1 of items that returned falsey
 * @param {Array} arr: The array you want to loop through
 * @param {Function} func: The function you want carried out
*/
function partition(arr, func) {
    return [filter(arr, func), reject(arr, func)];
}
module.exports.partition = partition;

/** 
 * unique: Returns a new array of all elements from <arr> with duplicates
 * removed
 * @param {Array} arr: The array you want to loop through
*/
function unique(arr) {
  const uniques = [];
  each(arr, function(value, pos, arr) {
      if(indexOf(uniques, value) === -1) {
          uniques.push(value);
      }
  });
  return uniques;
}
module.exports.unique = unique;

/**
 * map: Designed to transform each element in a collection, save the new values
 * in a new array, and then return the new array
 * @param {Collection} collection: The array or object being iterated over
 * @param {Function} transform: The function which will generate new return values
 * when the collections elements are passed through them
 * @return A new array filled with the new values
 */
 
 function map(collection, transform) {
  const output = [];
  each(collection, function(value, position, collection){
  output.push(transform(value, position, collection));
});
return output;
}
module.exports.map = map;

/**
 * pluck: Designed to return and array filled with the value of a property for 
 * every element in an array
 * @param {Collection} array: The collection being iterated over
 * @param {Value} property: The value of the property that is being pulled from the elements
 * @return An array with the property that has the value of all the elements in the array
 */
 
 function pluck(arr, property) {
 return  map(arr, function(obj, pos, array){
   return obj[property];
 });

}
module.exports.pluck = pluck;

/**
 * contains: Designed to iterate over an array and return true if (value) is in the array
 * otherwise return false
 * @param {Collection} array: The collection being iterated over
 * @param {Value} value: The certain value that is being sought after in the array
 * @return True is (value) is in the array, false if not
 */
 
 function contains(arr, value) {
  if(indexOf(arr, value) > -1) {
    return true;
  }
  else if(value === false){
    return false;
  }
  else {
    return false;
  }
}
module.exports.contains = contains;

/**
 * every: Designed to perform a function for every element in an array, or for every
 * value in an object. If the return value for every element or value is true return
 * true, if even one of the element/values is false return false. If no function is
 * provided return true if all the elements/values are truthy values, otherwise return false.
 * @param {Collection} collection: The collection can either be object or array 
 * @param {Function} test: The test function which will determine if the elements/values
 * are equal to either truthy of falsey
 * @return True if every element/value resolves to true, or if there is no test function
 * return true if all the elements/values are of the truthy variety, otherwise 
 * return false if any of them are false
 */
 
 function every(collection, test) {
  if(typeOf(test) === "undefined" || test == null) {
    var falseFound = false;
      each(collection, function(element){
      if(!element) {
        falseFound = true;
      }
    });
    return !falseFound;
  }
  else {
    var values;
    if(typeOf(collection) === "object" || Array.isArray(collection)){
      values =  map(collection, function(key, value, object){
        return test(key, value, object);
      });
    } else {
      values = map(collection, function(element){
         return test(element);
      });
    }
    return  indexOf(values, false) == -1;
  }
}
module.exports.every = every;

/**
 * some: Designed to pass every element in a collection through a function to determine
 * if the current value/element, index/key, and object/array resolve to true. If
 * at least one of them resolves to true, true will be returned, but if all elements
 * return false then false will be returned. If there is no function provided then 
 * a check will be made on the elements and if there is at least one truthy value 
 * true will be returned.
 * @param {Object, Array} collection: The collection can be either object or an array
 * @param {Function} test: The elements are going to be tested by a funtion to determine true or false
 * @return True if at least one value is true, false otherwise. If no function is given then
 * the it will return true as long as one of the values is truthy, false otherwise.
 */
 
 function some(collection, test) {
  if(typeOf(test) === "undefined" || test == null) {
    var trueFound = false
    each(collection, function(element){
      if(element) {
        trueFound = true;
      }
    });
    return trueFound;
  }
  else {
    var values;
    if(typeOf(collection) === "object" || Array.isArray(collection)){
      values =  map(collection, function(key, value, object){
        return test(key, value, object);
      });
    } else {
      values = map(collection, function(element){
         return test(element);
      });
    }
    return  indexOf(values, true) !== -1;
  }
}
module.exports.some = some;

/**
 * reduce: Designed to pass every element from a collection through a function where it will get 
 * the return for previous result, element, and index. It will use the previous result that 
 * it just got for the next iteration. For the very first iteration it will use the 
 * seed as "previous result", and if there is no seed then use the first element/value
 * of a <collection> as <seed>. After the last iteration it will return the value of the 
 * final fucntion call.
 * @param {Collection} array: The type of collection being used in the function
 * @param {Function} combine: The type of action the function is doing
 * @param {Seed} seed: The "previous result" to be used upon the first iteration
 * @return The return value of the final function call
 */
function reduce(arr, combine, seed) {
  let 
    combined = seed,
    i = 0;
  if(combined === undefined) {
    combined = arr[0];
    i = 1;
  } 
  for(; i < arr.length; i++) {
    combined = combine(combined, arr[i], i, arr);
  }
  return combined;
  }
  module.exports.reduce = reduce;
  
  /**
   * extend: Designed to take two objects and copy properties of a second object and place them within the
   * first object. If there are more than two objects copy all of their properties into
   * object 1. Return the updated object 1.
   * @param {Collection} object1: The first object that everything will be copied into
   * @param {Collection} object2: The second object where the values will be copied into object1
   * @param {Collection} objects: All the extra objects that will have their properties copied into object1
   * @return The updated object1 with all the new properties copied inside.
   */
   
  function extend(object1, object2, objects) {
  each(object2, function(value, key){
    object1[key] = value;
  });
  each(objects, function(value, key){
    object1[key] = value;
  });
  return object1;
}
module.exports.extend = extend;