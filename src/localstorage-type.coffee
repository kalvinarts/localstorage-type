###
localstore-type:

  This module does the trick encapsulating the data
  in a object and then JSON.stringify it to preserve
  the data type in browsers that always return the data
  as string (like Safari).

  This allows to store arrays and objects also for the
  browsers that don't suport it.
###

(() ->
  # Tests for localstorage presence
  testLocalStorage = () ->
    if localStorage then true else false

  # Tests for localstorage type preservation
  testLocalStorageType = () ->
    console.log '>> testing localStorage type preservation...'
    # Prepare the test data
    data =
      bool: true
      number: 1.628
      string: 'test'
      array: [1, 'two', false]
      object:
        bool: true
        number: 13
        string: 'test'
        array: [1, 'two', false]
    # Store the data
    localStorage.setItem 'localstorage-test-bool', data.bool
    localStorage.setItem 'localstorage-test-number', data.number
    localStorage.setItem 'localstorage-test-string', data.string
    localStorage.setItem 'localstorage-test-array', data.array
    localStorage.setItem 'localstorage-test-object', data.object
    # Retrieve the data
    results =
      bool: localStorage.getItem 'localstorage-test-bool'
      number: localStorage.getItem 'localstorage-test-number'
      string: localStorage.getItem 'localstorage-test-string'
      array: localStorage.getItem 'localstorage-test-array'
      object: localStorage.getItem 'localstorage-test-oject'
    # Log results
    console.log '>> test data:'
    console.log data
    console.log '>> result data:'
    console.log results
    # Test the data
    if data.bool is results.bool and
    data.number is results.number and
    data.string is results.string and
    data.array is results.array and
    data.object is results.object
      console.log '>> test passed.'
      return true
    else
      console.log '>> test failed.'
      return false

  # get references to original functions
  _setItem = localStorage.setItem
  _getItem = localStorage.getItem

  # setItem replacing function
  setItem = (key, val) ->
    data =
      value: val
    _setItem key, JSON.stringify(data)

  # getItem replacing function
  getItem = (key) ->
    item = _getItem key
    if item
      try
        data = JSON.parse(item)
        if data and data.value
          item = value
      catch err
        console.error err
    item

  # Perform the tests
  if testLocalStorage()
    if not testLocalStorageType()
      console.log '>> setting fixed versions of localStorage setItem and getItem.'
      # replace functions with the hacked ones
      localStorage.setItem = setItem
      localStorage.getItem = getItem
      console.log '>> localStorge fix done ;)'
    else
      console.log '>> nothing to fix :)'
  else
    console.log '>> localStorge not present at all :('
)()
