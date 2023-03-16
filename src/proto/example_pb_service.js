// package: hello
// file: example.proto

var example_pb = require("./example_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HelloService = (function () {
  function HelloService() {}
  HelloService.serviceName = "hello.HelloService";
  return HelloService;
}());

HelloService.GetHelloReq = {
  methodName: "GetHelloReq",
  service: HelloService,
  requestStream: false,
  responseStream: false,
  requestType: example_pb.HelloRequest,
  responseType: example_pb.HelloResponse
};

exports.HelloService = HelloService;

function HelloServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HelloServiceClient.prototype.getHelloReq = function getHelloReq(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HelloService.GetHelloReq, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.HelloServiceClient = HelloServiceClient;

