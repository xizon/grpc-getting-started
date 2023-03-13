# gRPC Getting Started

Demonstration of the use of gRPC and front-end.

## Getting Started


### Step 1. Install the [grpc-web](https://github.com/grpc/grpc-web) runtime library

```sh
$ cd /{your_directory}/grpc-getting-started
$ npm i grpc-web
```


### Step 2. Install the code generator plugin [protoc](https://github.com/protocolbuffers/protobuf/releases)

```sh
$ PROTOC_ZIP=protoc-22.2-osx-x86_64.zip
$ curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v22.2/$PROTOC_ZIP
$ sudo unzip -o $PROTOC_ZIP -d /usr/local bin/protoc
$ sudo unzip -o $PROTOC_ZIP -d /usr/local 'include/*'
$ rm -f $PROTOC_ZIP
```


You can also use the following command to install (macOS)：

```sh
$ brew install protobuf
```


Check the version after the installation is complete

```sh
$ protoc --version
```


### Step 3. Proceed to install the plugin [protoc-gen-js](https://www.npmjs.com/package/protoc-gen-js)

```sh
$ sudo npm i -g protoc-gen-js
```



### Step 4. Compile and execute

Run the following command to compile the `.proto` file and generate a `.js` file we can recognize.

You can download [protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript) to test


Or create your own files


`proto/example.proto`: 

```sh
syntax = "proto3";

package hello;

// Greeting represents a message you can tell a user.
message Greeting {
  string message = 1;
}
```

The way to compile it:

```sh
$ mkdir hello
$ protoc  --proto_path=./proto --js_out=import_style=commonjs,binary:hello  proto/example.proto
```

or 

```sh
$ npm run build
```


It will generate a file `hello/example_pb.js`






## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).
