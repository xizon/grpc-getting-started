const { HelloRequest } = require('../proto/example_pb.js');
const { HelloServiceClient } = require('../proto/example_grpc_web_pb.js');


const client = new HelloServiceClient('http://' + window.location.hostname + ':12345', null, null);


function todo(str1, str2) {

    return new Promise((resolve, reject) => {
        const req = new HelloRequest();
        req.setFirstname(str1);
        req.setLastname(str2);

        client.getHelloReq(req, {}, function (err, response) {
            if (err) {
                resolve(err);
                //reject(err);
            } else {
                resolve(response.getGreeting());
            }
        });
        
    })
}

// create form
//===================
const container = document.createElement("div");

const input1 = document.createElement("input");
input1.type = "text";
input1.id = "input1";
input1.placeholder = 'FirstName'
container.appendChild(input1);

const input2 = document.createElement("input");
input2.type = "text";
input2.id = "input2";
input2.placeholder = 'LastName'
container.appendChild(input2);

const hr = document.createElement("hr");
container.appendChild(hr);

const btn = document.createElement("button");
btn.innerHTML = "Submit";
btn.id = "btn";
container.appendChild(btn);

document.body.appendChild(container);

const $btn = document.getElementById('btn');
$btn.addEventListener('click', (e) => {
    e.preventDefault();
    main(document.getElementById('input1').value, document.getElementById('input2').value);
});


// display response
//===================
async function main(str1, str2) {
    const data = await todo(str1, str2);
    console.log(data);

    const div = document.createElement("h3");
    div.innerHTML = data.message;
    document.body.appendChild(div);
}

