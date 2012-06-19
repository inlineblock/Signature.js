Signature.js
============

Signature.js is jQuery plugin that allows developers to embed a signature pad into their websites or mobile applications.
It supports both mouse and touch events, utilizing Modernizr to determine the proper events.

Requirements
------------
Signature.js needs 2 things:
* jQuery v1.0 or greater
* Modernizr (with touch detection)

Usage
-----
To initialize or clear (options being optional):

$('.el').signature({... options ...});

To get the image out, just do the same, but send a string of the type you'd image type you'd like (png or jpeg):

var dataurl = $('.el').signature('png');


Initialization Options (w/ defaults)
----------------------
```json
{
  strokeColor: '#000000',
  strokeWidth: 2,
  backgroundColor: '#FFF',
  width: 500,
  height: 250
}
```

License
-------
[MIT License](Signature.js/blob/master/LICENSE)

Contribute
----------
If you contribute and submit a pull request, I'll will take the time to look over each and ever request.
