# gRPC 入门指引 (最初版)

gRPC 与前端应用实现过程及其演示包。

---

- [(original version)English Documentation](README_TUTORIAL.md)
- [(最初版)中文版说明文档](README_TUTORIAL_CN.md)

---


![quick overview](preview.gif)


#### 目录结构（最初版的目录，并非github资源目录）

> **注意：** 以下教程是最初版(最简洁版)，本资源是最初版+扩展版


```sh
your-grpc-app/
├── package.json
├── package-lock.json
├── envoy.yaml
├── server.js
├── build/          
├── scripts/  
├── dist/
│   ├── client-main.js
│   └── index.html
├── proto/                
│   ├── example.proto
│   └── other.proto
├── src/
│   ├── proto/
│   ├── client/
│   └── server/
└──
```

项目开始之前，你需要新建一个基础的 `package.json` 文件，安装 webpack，然后再继续下面的步骤。示例代码：

```json
{
  "name": "demo",
  "version": "1.0.0",
  "main": "none",
  "description": "",
  "scripts": {
    "build": "webpack --config prod.config.js"
  },
  "devDependencies": {
    "webpack": "^5.76.1",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  },
  "license": "MIT"
}

```

也可以直接使用下面的命令创建 `package.json` 文件，详细内容请参看 [Webpack](https://webpack.js.org/configuration/)
```sh
$ npx webpack init
```



## (1) 定义服务

我们首先定义一个服务，指定可以远程调用的方法及其参数和返回类型。

这是使用在 .proto 文件中使用协议缓冲完成的，它们还用于描述有效负载消息的结构。

创建一个 proto 文件 `proto/example.proto`：

```c

// 步骤 1. 基本配置
// ================================================ ====
// 第一行告诉编译器这个文件中使用了什么语法。
// 第二行属于命名空间，用来防止不同的消息类型有命名冲突

syntax = "proto3";
package hello;


// 步骤 2. 定义消息结构
// ================================================ ====
// 这定义了请求负载。 此处进入消息的每个属性都与其类型一起定义。
// 需要为每个属性分配一个唯一的编号，称为标签。 协议缓冲区使用此标记来表示属性，而不是使用属性名称。
// 所以，不像 JSON 我们每次都会传递属性名称 firstName，protocol buffer 会使用数字 1 来表示 firstName。 响应负载定义类似于请求。


message HelloRequest {
    string firstName = 1;
    string lastName = 2;
}

message HelloResponse {
    string greeting = 1;
}


// 步骤 3. 定义服务契约
// ================================================ ====
// 最后，让我们定义服务契约。 对于我们的 HelloService，我们定义了一个 GetHelloReq() 操作：

service HelloService {
    rpc GetHelloReq(HelloRequest) returns (HelloResponse);
}
```


## (2) 生成代码 —— 将 `.proto` 文件编译为 `.js`



### 步骤 2.1。 安装 [grpc-web](https://github.com/grpc/grpc-web) 运行时库

```sh
$ cd /{your_directory}/grpc-getting-started
$ npm i --save-dev grpc-web
```


### 步骤 2.2。 安装生成 TypeScript 的插件 [ts-protoc-gen](https://github.com/improbable-eng/ts-protoc-gen)

```sh
$ npm i --save-dev ts-protoc-gen @improbable-eng/grpc-web
```


### 步骤 2.3。 安装代码生成器插件 [protoc](https://github.com/protocolbuffers/protobuf/releases)

```sh
$ PROTOC_ZIP=protoc-22.2-osx-x86_64.zip
$ curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v22.2/$PROTOC_ZIP
$ sudo unzip -o $PROTOC_ZIP -d /usr/local bin/protoc
$ sudo unzip -o $PROTOC_ZIP -d /usr/local 'include/*'
$ rm -f $PROTOC_ZIP
```


也可以使用如下命令安装（macOS）：

```sh
$ brew install protobuf
```


安装完成后查看版本

```sh
$ protoc --version
```


### 步骤 2.4。 继续安装插件 [protoc-gen-js](https://www.npmjs.com/package/protoc-gen-js) 和 [protoc-gen-grpc-web](https://www.npmjs.com/package/protoc-gen-grpc-web)

```sh
$ sudo npm i -g protoc-gen-js protoc-gen-grpc-web
```



### 步骤 2.5。 编译执行

运行以下命令编译`.proto`文件，生成我们可以识别的`.js`文件。

```sh
$ npm run build:protos
```

它会生成四个文件: 

- `src/proto/example_pb.js`
- `src/proto/example_pb.d.ts`
- `src/proto/example_pb_service.js`
- `src/proto/example_pb_service.d.ts`


---

<blockquote>

可以下载[protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript)进行测试。 教程请访问[这里](https://grpc.io/docs/platforms/web/basics/)。

```sh
$ mkdir src/proto
```

要生成 **protobuf 消息类**，请运行以下命令：

```sh
$ protoc  --proto_path=./proto --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:src/proto --ts_out="src/proto" proto/example.proto
```


要生成 **客户端存根**，请运行以下命令：

```sh
$ protoc  --proto_path=./proto --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --ts_out="service=grpc-web:src/proto"  proto/example.proto
```


⚠️ **注意：** 如果使用 windows，插件的路径要写成 `--plugin=protoc-gen-ts=.\node_modules\.bin\protoc-gen-ts.cmd` 


</blockquote>


## (3) 服务器入口

接下来，我们在后端 gRPC 服务中使用 Node 实现我们的 `HelloService` 接口。 这将处理来自客户的请求。 教程请访问[这里](https://grpc.io/docs/platforms/web/basics/)。



### 步骤 3.1。 安装插件 [grpc-node](https://github.com/grpc/grpc-node/tree/master)

```sh
$ npm i --save-dev @grpc/grpc-js @grpc/proto-loader
```


### 步骤 3.2。 创建文件 `src/server/index.js`：

```js

const path = require('path');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = path.resolve(__dirname, '../../proto/example.proto');


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,  // 如果使用 `keepUserse`, 数据将采用驼峰命名
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const newsProto = grpc.loadPackageDefinition(packageDefinition);
/*
{
    hello: {
        HelloRequest: {
            format: 'Protocol Buffer 3 DescriptorProto',
            type: [Object],
            fileDescriptorProtos: [Array]
        },
        HelloResponse: {
            format: 'Protocol Buffer 3 DescriptorProto',
            type: [Object],
            fileDescriptorProtos: [Array]
        },
        HelloService: [class ServiceClientImpl extends Client] {
            service: [Object],
            serviceName: 'HelloService'
        }
    }
} 
*/


class gRPC extends grpc.Server {
    constructor() {
        super();
        this.addService(newsProto.hello.HelloService.service, {
            getHelloReq: this.getHelloReq
        });
    }

    /**
     * request handler.
     */
    getHelloReq(call, callback) {
        const { firstName, lastName } = call.request;

        if( firstName !== '' ) {
            callback(null, {
                greeting: `Hello: ${firstName} ${lastName}`
            });
        } else {
            callback({
                message: 'Name not found',
                code: grpc.status.INVALID_ARGUMENT
            });
        }
    }
}


function main() {
    const server = new gRPC();
    server.bindAsync(
        '127.0.0.1:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) throw err;

            console.log(`Server running at http://127.0.0.1:${port}`);
            server.start();
        }
    );
}

main();


/*

function copyMetadata(call) { 
    const metadata = call.metadata.getMap();
    const responseMetadata = new grpc.Metadata();
    for (let key in metadata) {
        responseMetadata.set(key, metadata[key]);
    }
    return responseMetadata;
}
function getHelloReq(call, callback) { 
    const { firstName, lastName } = call.request;

    if( firstName !== '' ) {
        callback(null, {
            greeting: `Hello: ${firstName} ${lastName}`
        }, copyMetadata(call));
    } else {
        callback({
            message: 'Name not found',
            code: grpc.status.INVALID_ARGUMENT
        });
    }
}
function main() {
    const server = new grpc.Server();
    server.addService(newsProto.hello.HelloService.service, {
        getHelloReq: getHelloReq
    });
    ...
}

*/
```


## (4) 客户端入口


创建文件 `src/client/index.js`：


```js
const { HelloRequest } = require('../proto/example_pb.js');
const { HelloServiceClient } = require('../proto/example_pb_service.js');


const client = new HelloServiceClient('http://' + window.location.hostname + ':12345', null, null);


function todo(str1, str2) {

    return new Promise((resolve, reject) => {
        const req = new HelloRequest();
        req.setFirstname(str1);
        req.setLastname(str2);

        client.getHelloReq(req, function (err, response) {
            if (err) {
                resolve(err);
                //reject(err);
            } else {
                resolve(response.getGreeting());
            }
        });
        
    })
}

// 创建一个表单
//===================
const container = document.createElement("div");

const input1 = document.createElement("input");
input1.type = "text";
input1.id = "input1";
input1.placeholder = 'FirstName'
container.appendChild(input1);

const input2 = document.createElement("input");
input2.type = "text";
input2.id = "input2";
input2.placeholder = 'LastName'
container.appendChild(input2);

const hr = document.createElement("hr");
container.appendChild(hr);

const btn = document.createElement("button");
btn.innerHTML = "Submit";
btn.id = "btn";
container.appendChild(btn);

document.body.appendChild(container);

const $btn = document.getElementById('btn');
$btn.addEventListener('click', (e) => {
    e.preventDefault();
    main(document.getElementById('input1').value, document.getElementById('input2').value);
});


// 显示后端服务器响应的内容
//===================
async function main(str1, str2) {
    const data = await todo(str1, str2);
    console.log(data);

    const div = document.createElement("h3");
    div.innerHTML = data;
    document.body.appendChild(div);
}


```



## (5) 生成客户端文件

最后，将所有这些放在一起，我们可以将所有相关的 JS 文件编译成一个可以在浏览器中使用的 JS 库。


### 步骤 5.1。 安装依赖

```sh
$ npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin browserify google-protobuf
```


### 步骤 5.2。 为自定义 webpack 配置创建一个文件

`build/client.config.js`: 

```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientPort = process.env.PORT || 10005;
const clientHost = process.env.HOST || 'localhost';
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'production',
    performance: {
        hints: !devMode ? "warning" : false
    }, 
    resolve: {
        fallback: {
            "fs": false
          },
        extensions: ['.js']
    },
    entry: {
        'client-main': './src/client/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
        }),
    ],
    devServer: {
        
        // Enable compression
        compress: false,

        //
        host: clientHost,
        port: clientPort

    }
};

```


### 步骤 5.3。 编译JS库

```sh
$ npm run build:client
```

或者

```sh
$ npx webpack --progress --mode production --config ./build/client.config.js
```

它将生成一个 js 文件 `dist/client-main.js` 和一个 html 文件 `dist/index.html`



### 步骤 5.4。 Webpack 服务器配置

创建一个新的服务器文件 `server.js`


```js
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./client.config.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();
```



## (6) 部署后端服务并测试


### 步骤 6.1。 安装 [envoy](https://www.envoyproxy.io/)

编译 envoy 需要完整安装 Xcode.app。 仅安装命令行工具是不够的。

如 **macOS 12.6.3**，需要下载：
[Xcode_14.2](https://developer.apple.com/services-account/download?path=/Developer_Tools/Xcode_14.2/Xcode_14.2.xip)


```sh
$ brew update
$ brew install envoy
$ envoy --version
$ go version
```


> #### ⚠️ a) 如果运行 `brew update` 或 `brew install envoy` 出错，输入以下命令修复它：
>
> **macOS 或 Linux**
>
> 打开你的终端并执行
>
>
> ```sh
> $ xcode-select --install
> $ cd /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/
> $ git pull
> $ brew update-reset
> $ brew install envoy
> ```
> 
> 
> #### ⚠️ b) 使用go启动服务时报错 dial tcp xx.xx.xx.xx:443: i/o timeout
>
>
> 手动配置源
> 
> ```sh
> $ export GO111MODULE=on
> $ export GOPROXY=https://goproxy.cn
> ```
> 
> 以上配置步骤只会在当前终端生效，如何长期生效，这样就不用每次都配置环境变量了。
> 
> ```sh
> $ echo "export GO111MODULE=on" >> ~/.profile
> $ echo "export GOPROXY=https://goproxy.cn" >> ~/.profile
> $ source ~/.profile
> ```
> 
> 
> #### ⚠️ c) `bazelisk` 不支持旧版本。
>
>
> 升级您的操作系统。
>
>
>
> #### ⚠️ d) 使用 docker 安装envoy，并使用 `.yaml` 自定义配置，更多内容参看 [Using the Envoy Docker Image](https://www.envoyproxy.io/docs/envoy/latest/start/docker)
>
>
> （d-1）拉取镜像（envoy 1.27.0-dev-65273b），成功后可以在 docker 镜像中找到它，
> 
> ```sh
> $ docker pull envoyproxy/envoy:dev-65273b2a9b25e9650a4379c9eeb0c1c48f29089c
> $ docker run --rm envoyproxy/envoy:dev-65273b2a9b25e9650a4379c9eeb0c1c48f29089c --version
> $ docker image ls
> ```
> 
> （d-2）使用 envoy 镜像并应用 `.yaml` 自定义配置。首先你需要新建一个项目文件夹，并在根目录创建文件 `Dockerfile` 和 `envoy.yaml`, `Dockerfile` 的内容如下：
> 
> ```sh
> FROM envoyproxy/envoy:dev-65273b2a9b25e9650a4379c9eeb0c1c48f29089c
> COPY envoy.yaml /etc/envoy/envoy.yaml
> RUN chmod go+r /etc/envoy/envoy.yaml
> ```
> 
> （d-3）进入你的项目目录，然后运行下面的命令：
> 
> ```sh
> # 构建新的 envoy 镜像：
> $ docker build -t envoy:v1 .
> # 假设 Envoy 配置为侦听端口 9901 和 10000，您现在可以使用以下命令启动它（根据 `envoy.yaml` 文件的端口来配置自己想要侦听的端口）：
> $ docker run -d --name envoy -p 9901:9901 -p 10000:10000 envoy:v1
> ```
> 
> （d-4）启动以后 envoy 代理服务将运行。
> 





### 步骤 6.2。 配置 Envoy 代理

创建一个新文件 `envoy.yaml`：

```yaml

static_resources:
  listeners:
    - name: listener_0
      address:
        socket_address: { address: 127.0.0.1, port_value: 12345 }
      filter_chains:
        - filters:
          - name: envoy.filters.network.http_connection_manager
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
              codec_type: auto
              stat_prefix: ingress_http
              route_config:
                name: local_route
                virtual_hosts:
                  - name: local_service
                    domains: ["*"]
                    routes:
                      - match: { prefix: "/" }
                        route:
                          cluster: hello_service
                          timeout: 0s
                          max_stream_duration:
                            grpc_timeout_header_max: 0s
                    cors:
                      allow_origin_string_match:
                        - prefix: "*"
                      allow_methods: GET, PUT, DELETE, POST, OPTIONS
                      allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                      max_age: "1728000"
                      expose_headers: custom-header-1,grpc-status,grpc-message
              http_filters:
                - name: envoy.filters.http.grpc_web
                  typed_config:
                    "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
                - name: envoy.filters.http.cors
                  typed_config:
                    "@type": type.googleapis.com/envoy.extensions.filters.http.cors.v3.Cors
                - name: envoy.filters.http.router
                  typed_config:
                    "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
  clusters:
    - name: hello_service
      connect_timeout: 0.25s
      type: logical_dns
      http2_protocol_options: {}
      lb_policy: round_robin
      # win/mac hosts: Use address: host.docker.internal instead of address: localhost in the line below
      load_assignment:
        cluster_name: cluster_0
        endpoints:
          - lb_endpoints:
            - endpoint:
                address:
                  socket_address:
                    address: 127.0.0.1
                    port_value: 9090
```


> ⚠️ 如果您在 Mac/Windows 上运行 Docker，请将最后一个地址：`localhost` 更改为
> 
> ```yaml
>     ...
>     socket_address:
>         address: host.docker.internal
> ```
>
>  或者如果您在 Mac 上的 Docker 版本比 v18.03.0 更早，请将其更改为：
>
> ```yaml
>     ...
>     socket_address:
>         address: docker.for.mac.localhost
> ```

### 步骤 6.3。 运行特使代理。

**envoy.yaml** 文件将 Envoy 配置为在端口 `12345` 监听浏览器请求，并将它们转发到端口 `9090`。

```sh
$ npm run proxy
```
or 

```sh
$ envoy -c ./envoy.yaml
```


### 步骤 6.4。 当这些都准备好后，您可以打开浏览器选项卡并导航到 `http://localhost:10005`

  - NodeJS gRPC 服务（端口 `9090`）
  - webpack 服务器（端口 `10005`）


运行以下命令进行测试：

```sh
$ npm run start
```

或者

```sh
$ node ./server.js & node ./src/server/index.js
```


### 步骤 6.5。 测试连接

使用下面的命令检测：

```sh
$ curl -I http://localhost:12345/hello.HelloService/GetHelloReq?firstName=Amy&lastName=Grant
```


## 许可证

基于 [MIT](https://opensource.org/licenses/MIT).
