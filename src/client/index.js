const { HelloRequest } = require('../proto/example_pb.js');
const { HelloServiceClient } = require('../proto/example_grpc_web_pb.js');


const serverPort = 5001;
const myService = new HelloServiceClient(`localhost:${serverPort}`);


function todo() {

    return new Promise((resolve, reject) => {
        const req = new HelloRequest();
        req.setFirstname('Amy');
        req.setLastname('Grant');

        myService.getHelloReq(req, {}, function (err, response) {
            if (err) {
                resolve(err);
                //reject(err);
            } else {
                resolve(response);
            }
        });

    })
}
async function main() {
    const data = await todo();

    console.log(data);
    const div = document.createElement("h3");
    div.innerHTML = JSON.stringify(data);
    document.body.appendChild(div);
}
main();

