
/*
localstore-type:

  This module does the trick encapsulating the data
  in a object and then JSON.stringify it to preserve
  the data type in browsers that always return the data
  as string (like Safari).

  This allows to store arrays and objects also for the
  browsers that don't suport it.
 */
(function() {
  var _getItem, _setItem, getItem, setItem, testLocalStorage, testLocalStorageType;
  testLocalStorage = function() {
    if (localStorage) {
      return true;
    } else {
      return false;
    }
  };
  testLocalStorageType = function() {
    var data, results;
    console.log('>> testing localStorage type preservation...');
    data = {
      bool: true,
      number: 1.628,
      string: 'test',
      array: [1, 'two', false],
      object: {
        bool: true,
        number: 13,
        string: 'test',
        array: [1, 'two', false]
      }
    };
    localStorage.setItem('localstorage-test-bool', data.bool);
    localStorage.setItem('localstorage-test-number', data.number);
    localStorage.setItem('localstorage-test-string', data.string);
    localStorage.setItem('localstorage-test-array', data.array);
    localStorage.setItem('localstorage-test-object', data.object);
    results = {
      bool: localStorage.getItem('localstorage-test-bool'),
      number: localStorage.getItem('localstorage-test-number'),
      string: localStorage.getItem('localstorage-test-string'),
      array: localStorage.getItem('localstorage-test-array'),
      object: localStorage.getItem('localstorage-test-oject')
    };
    console.log('>> test data:');
    console.log(data);
    console.log('>> result data:');
    console.log(results);
    if (data.bool === results.bool && data.number === results.number && data.string === results.string && data.array === results.array && data.object === results.object) {
      console.log('>> test passed.');
      return true;
    } else {
      console.log('>> test failed.');
      return false;
    }
  };
  _setItem = localStorage.setItem;
  _getItem = localStorage.getItem;
  setItem = function(key, val) {
    var data;
    data = {
      value: val
    };
    return _setItem(key, JSON.stringify(data));
  };
  getItem = function(key) {
    var data, err, error, item;
    item = _getItem(key);
    if (item) {
      try {
        data = JSON.parse(item);
        if (data && data.value) {
          item = value;
        }
      } catch (error) {
        err = error;
        console.error(err);
      }
    }
    return item;
  };
  if (testLocalStorage()) {
    if (!testLocalStorageType()) {
      console.log('>> setting fixed versions of localStorage setItem and getItem.');
      localStorage.setItem = setItem;
      localStorage.getItem = getItem;
      return console.log('>> localStorge fix done ;)');
    } else {
      return console.log('>> nothing to fix :)');
    }
  } else {
    return console.log('>> localStorge not present at all :(');
  }
})();
