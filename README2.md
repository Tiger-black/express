使用指南
一、路由
    1、路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

    路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： 
    app.METHOD(path, [callback...], callback)， 
    app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

    下面是一个基本的路由示例：
    var express = require('express');
    var app = express();
        // respond with "hello world" when a GET request is made to the homepage
        app.get('/', function(req, res) {
        res.send('hello world');
    });

    2、路由方法
    路由方法源于 HTTP 请求方法，和 express 实例相关联。
    下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：
    // GET method route
    app.get('/', function (req, res) {
        res.send('GET request to the homepage');
    });

    // POST method route
    app.post('/', function (req, res) {
        res.send('POST request to the homepage');
    });
    Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。
    有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...

    app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
    在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何http模块支持的 HTTP 请求，句柄都会得到执行。
    app.all('/secret', function (req, res, next) {
        console.log('Accessing the secret section ...');
        next(); // pass control to the next handler
    });

    3、路由路径
    路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。
    Express 使用 path-to-regexp（模块） 匹配路由路径，请参考文档查阅所有定义路由路径的方法。 Express Route Tester 是测试基本 Express 路径的好工具，但不支持模式匹配。
    查询字符串不是路由路径的一部分。    

    使用字符串的路由路径示例：
        // 匹配根路径的请求
        app.get('/', function (req, res) {
            res.send('root');
        });

        // 匹配 /about 路径的请求
        app.get('/about', function (req, res) {
            res.send('about');
        });

        // 匹配 /random.text 路径的请求
        app.get('/random.text', function (req, res) {
            res.send('random.text');
        });

    使用字符串模式的路由路径示例：
        // 匹配 acd 和 abcd
        app.get('/ab?cd', function(req, res) {
            res.send('ab?cd');
        });

        // 匹配 abcd、abbcd、abbbcd等
        app.get('/ab+cd', function(req, res) {
            res.send('ab+cd');
        });

        // 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
        app.get('/ab*cd', function(req, res) {
            res.send('ab*cd');
        });

        // 匹配 /abe 和 /abcde
        app.get('/ab(cd)?e', function(req, res) {
            res.send('ab(cd)?e');
        });
        字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。
    
    使用正则表达式的路由路径示例：
        // 匹配任何路径中含有 a 的路径：
        app.get(/a/, function(req, res) {
            res.send('/a/');
        });

        // 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
        app.get(/.*fly$/, function(req, res) {
            res.send('/.*fly$/');
        });
    4、路由句柄
    可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

    路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.
    
    使用一个回调函数处理路由：
        app.get('/example/a', function (req, res) {
            res.send('Hello from A!');
        });

    使用多个回调函数处理路由（记得指定 next 对象）：
        app.get('/example/b', function (req, res, next) {
            console.log('response will be sent by the next function ...');
            next();
        }, function (req, res) {
            res.send('Hello from B!');
        });

    使用回调函数数组处理路由：

        var cb0 = function (req, res, next) {
            console.log('CB0');
            next();
        }

        var cb1 = function (req, res, next) {
            console.log('CB1');
            next();
        }

        var cb2 = function (req, res) {
            res.send('Hello from C!');
        }

        app.get('/example/c', [cb0, cb1, cb2]);

    混合使用函数和函数数组处理路由：

        var cb0 = function (req, res, next) {
            console.log('CB0');
            next();
        }

        var cb1 = function (req, res, next) {
            console.log('CB1');
            next();
        }

        app.get('/example/d', [cb0, cb1], function (req, res, next) {
            console.log('response will be sent by the next function ...');
            next();
        }, function (req, res) {
            res.send('Hello from D!');
        });

    5、响应方法
    下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。
    