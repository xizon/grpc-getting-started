// package: myarray
// file: array.proto

var array_pb = require("./array_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ArrayService = (function () {
  function ArrayService() {}
  ArrayService.serviceName = "myarray.ArrayService";
  return ArrayService;
}());

ArrayService.SaveArrList = {
  methodName: "SaveArrList",
  service: ArrayService,
  requestStream: false,
  responseStream: false,
  requestType: array_pb.SaveArrListReq,
  responseType: array_pb.SaveArrListRes
};

exports.ArrayService = ArrayService;

function ArrayServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ArrayServiceClient.prototype.saveArrList = function saveArrList(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ArrayService.SaveArrList, {
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

exports.ArrayServiceClient = ArrayServiceClient;

