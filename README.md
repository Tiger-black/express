# express初始
一、安装
    1、首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。
    $ mkdir myapp
    $ cd myapp
    2、通过 npm init 命令为你的应用创建一个 package.json 文件。
    $ npm init
    3、此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受默认设置即可，下面这个除外：键入 app.js 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 index.js 文件名，只需按“回车”键即可。
    entry point: (index.js)
    4、接下来安装 Express 并将其保存到依赖列表中：如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可
    $ npm install express --save

二、Hello world 实例
    注意：这里所创建是一个最最简单的 Express 应用，并且仅仅只有一个文件 — 和通过 Express 应用生成器 所创建的应用_完全不一样_，Express 应用生成器所创建的应用框架包含多个 JavaScript 文件、Jade 模板和针对不同用途的子目录。
    进入 myapp 目录，创建一个名为 app.js 的文件，然后将下列代码复制进去：
    var express = require('express');
    var app = express();

    app.get('/', function (req, res) {
    res.send('Hello World!');
    });

    var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
    });
    上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。对于其他所有路径全部返回 404 Not Found。
    req (请求) 和 res (响应) 与 Node 提供的对象完全一致，因此，你可以调用 req.pipe()、req.on('data', callback) 以及任何 Node 提供的方法。
    通过如下命令启动此应用：

    $ node app.js
    然后在浏览器中打开 http://localhost:3000/ 并查看输出结果。

三、Express 应用生成器
    通过应用生成器工具 express 可以快速创建一个应用的骨架。

    通过如下命令安装：
    
    $ npm install express-generator -g
    -h 选项可以列出所有可用的命令行选项：
    $ express -h
    例如，下面的示例就是在当前工作目录下创建一个命名为 myapp 的应用。
    $ express myapp
    然后安装所有依赖包：

    $ cd myapp 
    $ npm install
    启动这个应用（MacOS 或 Linux 平台）：

    $ DEBUG=myapp npm start

    Windows 平台使用如下命令：

    > set DEBUG=myapp & npm start
    然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。i
    通过 Express 应用生成器创建的应用一般都有如下目录结构：
    ├── app.js
    ├── bin
    │   └── www
    ├── package.json
    ├── public
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    │       └── style.css
    ├── routes
    │   ├── index.js
    │   └── users.js
    └── views
        ├── error.jade
        ├── index.jade
        └── layout.jade

    7 directories, 9 files
    通过 Express 应用生长期创建应用只是众多方法中的一种。你可以不使用它，也可以修改它让它符合你的需求，都是开源的嘛！

四、一个简单的 Express 路由
    这篇教程只是对 Express 路由做一个简单的介绍。路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。
    每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。
    路由的定义由如下结构组成：app.METHOD(PATH, HANDLER)。
    其中，app 是一个 express 实例；
    METHOD 是某个 HTTP 请求方式中的一个；
    PATH 是服务器端的路径；
    HANDLER 是当路由匹配到时需要执行的函数。
    下面的代码展示了几个路由实例：
    // 对网站首页的访问返回 "Hello World!" 字样
    app.get('/', function (req, res) {
    res.send('Hello World!');
    });

    // 网站首页接受 POST 请求
    app.post('/', function (req, res) {
    res.send('Got a POST request');
    });

    // /user 节点接受 PUT 请求
    app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
    });

    // /user 节点接受 DELETE 请求
    app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
    });
    关于路由的详细资料，请参考 路由指南 章节。

五、利用 Express 托管静态文件
    通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

    将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

    app.use(express.static('public'));
    现在，public 目录下面的文件就可以访问了。
    http://localhost:3000/images/kitten.jpg
    http://localhost:3000/css/style.css
    http://localhost:3000/js/app.js
    http://localhost:3000/images/bg.png
    http://localhost:3000/hello.html
    所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。
    
    如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：
    app.use(express.static('public'));
    app.use(express.static('files'));

    访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。
    如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

    app.use('/static', express.static('public'));
    现在，你就爱可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。