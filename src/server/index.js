
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH_SENDINFO = path.resolve(__dirname, '../../proto/example.proto');
const PROTO_PATH_POST = path.resolve(__dirname, '../../proto/post.proto');
const { Empty } = require("google-protobuf/google/protobuf/empty_pb");
const { postsData } = require('./db.js');

const loadConfig = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const sendinfoProto = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_PATH_SENDINFO, loadConfig));
const postProto = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_PATH_POST, loadConfig));

/* postProto:

{
    mypost: {
        Post: {
            format: 'Protocol Buffer 3 DescriptorProto',
            type: [Object],
            fileDescriptorProtos: [Array]
        },
        PostList: {
            format: 'Protocol Buffer 3 DescriptorProto',
            type: [Object],
            fileDescriptorProtos: [Array]
        },
        FilterId: {
            format: 'Protocol Buffer 3 DescriptorProto',
            type: [Object],
            fileDescriptorProtos: [Array]
        },
        PostService: [class ServiceClientImpl extends Client] {
            service: [Object],
            serviceName: 'PostService'
        }
    },
    google: {
        protobuf: {
            Empty: [Object]
        }
    }
}
*/


class gRPC extends grpc.Server {
    constructor() {
        super();
        this.addService(sendinfoProto.hello.HelloService.service, {
            getHelloReq: this.getHelloReq
        });

        this.addService(postProto.mypost.PostService.service, {
            getPost: this.getPost,
            addPost: this.addPost,
            findId: this.findId
        });

    }

    /**
     * request handler.
     */
    getHelloReq(call, callback) {
        const { firstName, lastName } = call.request;

        if (firstName !== '') {
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

    getPost(call, callback) {
        callback(null, {
            items_list: postsData
        });
    }

    addPost(call, callback) {
        call.on('data', (item) => {
            /*
            // item:
            {
                id: 66,
                title: 'New Post Title 66',
                cat_name: 'newtype',
                post_property: { post_id: '66', post_path: '/example66' },
                log_name: 'newlog',
                _log_name: 'log_name'
            }   
            */
            postsData.push(item);
        });
        call.on('end', () => callback(null, new Empty()));
    }

    findId(call, callback) {
        console.log(call.request);
        const res = postsData.filter(post => post.id === call.request.id);
        call.write({
            items_list: res
        });
      
        call.end();
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


/* ++++ A simple example: ++++

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
    server.addService(sendinfoProto.hello.HelloService.service, {
        getHelloReq: getHelloReq
    });
    ...
}

*/