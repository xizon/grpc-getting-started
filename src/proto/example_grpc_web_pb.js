/**
 * @fileoverview gRPC-Web generated client stub for hello
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v4.22.2
// source: example.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hello = require('./example_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.HelloServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.HelloServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.hello.HelloRequest,
 *   !proto.hello.HelloResponse>}
 */
const methodDescriptor_HelloService_GetHelloReq = new grpc.web.MethodDescriptor(
  '/hello.HelloService/GetHelloReq',
  grpc.web.MethodType.UNARY,
  proto.hello.HelloRequest,
  proto.hello.HelloResponse,
  /**
   * @param {!proto.hello.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.HelloResponse.deserializeBinary
);


/**
 * @param {!proto.hello.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.hello.HelloResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.HelloResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.HelloServiceClient.prototype.getHelloReq =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.HelloService/GetHelloReq',
      request,
      metadata || {},
      methodDescriptor_HelloService_GetHelloReq,
      callback);
};


/**
 * @param {!proto.hello.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.HelloResponse>}
 *     Promise that resolves to the response
 */
proto.hello.HelloServicePromiseClient.prototype.getHelloReq =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/hello.HelloService/GetHelloReq',
      request,
      metadata || {},
      methodDescriptor_HelloService_GetHelloReq);
};


module.exports = proto.hello;
