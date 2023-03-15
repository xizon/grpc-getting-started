
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


function doGetHelloReq(call, callback) {
    console.log(call.request);
    callback(null, {
        message: call.request.message
    }, copyMetadata(call));

}

function getServer() {
    const server = new grpc.Server();
    server.addService(newsProto.hello.HelloService.service, {
        getHelloReq: doGetHelloReq
    });
    return server;
}

function main() {
    const serverPort = 5001;
    const server = getServer();
    server.bindAsync(
        `localhost:${serverPort}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) throw err;

            console.log(`Server running at http://localhost:${port}`);
            server.start();
        }
    );
}



if (require.main === module) {
    main();
}

exports.getServer = getServer;