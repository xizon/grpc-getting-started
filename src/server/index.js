
const path = require('path');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = path.resolve(__dirname, '../../proto/example.proto');

function doGetHelloReq(call, callback) {
    console.log(call.request);
    callback(null, {
        message: call.request.message
    }, copyMetadata(call));

}

function main() {

    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
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

    const serverPort = 5001;
    const server = new grpc.Server();

    server.addService(newsProto.hello.HelloService.service, {
        getHelloReq: doGetHelloReq
    });
    // 'Access-Control-Expose-Headers': 'grpc-status, grpc-message'

    server.bindAsync(
        `localhost:${serverPort}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) throw err;

            console.log(`Server running at http://localhost:${serverPort}`);
            server.start();
        }
    );

}

main();
