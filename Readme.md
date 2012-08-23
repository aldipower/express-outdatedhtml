[![build status](https://secure.travis-ci.org/aldipower/express-outdatedhtml.png)](http://travis-ci.org/aldipower/express-outdatedhtml)

# express-outdatedhtml
      
Replace HTML5-element-names with proven old ones to reach IE compatibility, on-the-fly during view render.
  
Make sites outdated by replace the new HTML5-element-names, such as 'canvas', 'section', etc. with proven ones like 'div'.
This is happening on-the-fly by parsing the 'view render results'-string of the Express-framework.
Of course, only if an outdated browser is detected, in this case the Internet Explorer smaller than 9, so the browser can handle the retrieved HTML correctly.
Otherwise the Internet Explorer (smaller 9) discards all unknown elements and you can't see anything on your website.

### Installation

Install node.js (http://nodejs.org) first, then npm (http://npmjs.org), then Express (http://expressjs.com):

    $ npm install express-outdatedhtml

or to access the module install globally:

    $ npm install -g express-outdatedhtml

### Usage

```javascript
var outdatedhtml = require('express-outdatedhtml');
```

Simply pass the 'makeoutdated'-function as third argument to the Express view render function.
The 'makeoutdated'-function returns a callback for the render function.

There is an automatically detection which browser type is used and the replacement is only done while using the Internet Explorer smaller 9.

```javascript
app.get('/', function(req, res) {
    res.render('index.jade', 
		    	{ title: 'My Site' },
		    	outdatedhtml.makeoutdated(req, res)
    );
});
```

If you want to force the replacement with any browser, you can set the third argument to 'true'.

```javascript
outdatedhtml.makeoutdated(req, res, true)
```

You also can pass another view render callback for further processing.

```javascript
outdatedhtml.makeoutdated(req, res, viewrendercallback)
``` 

### Arguments

outdatedhtml.makeoutdated(req, res, [force, [viewrendercallback]])

### Authors

The following are the major authors of the express-makeoutdated module.

  * Felix Gertz (https://github.com/aldipower)

### Node Compatibility

Module should be compatible with node 0.4.x

### License 

(The MIT License)

Copyright(c) 2011 Felix Gertz &lt;nihil.baxter.dev@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.