
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