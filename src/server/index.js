
const path = require('path');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = path.resolve(__dirname, '../../proto/example.proto');


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


function getHelloReqImpl(call, callback) {
    const { firstName, lastName } = call.request;
    callback({
        code: grpc.status.ABORTED,
        message: `Hello: ${firstName} ${lastName}`
    });

}


function getServer() {
    const server = new grpc.Server();

    server.addService(newsProto.hello.HelloService.service, {
        getHelloReq: getHelloReqImpl
    });

    return server;
}

function main() {
    const server = getServer();
    server.bindAsync(
        '127.0.0.1:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) throw err;

            console.log(`Server running at http://127.0.0.1:${port}`);
            server.start();
        }
    );
}

main();