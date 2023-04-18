import { HelloRequest } from '../proto/example_pb.js';
import { HelloServiceClient } from '../proto/example_pb_service.js';


const client = new HelloServiceClient('http://' + window.location.hostname + ':12345', null, null);

// grpc fault tolerance
const grpcError = (data) => {
    if ( data.toString() === 'Error' ) {
        localStorage.removeItem('XXX_XXX_XXX');
        document.cookie = `XXX_XXX_XXX=null;expires=${new Date(0).toUTCString()};path=/`;
    }
};

class UtilsSendInfo {

    todoSend(str1, str2) {

        return new Promise((resolve, reject) => {
            const req = new HelloRequest();
            req.setFirstname(str1);
            req.setLastname(str2);

            client.getHelloReq(req, function (err, response) {
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
    createSendForm() {

        const container = document.createElement("div");

        const title = document.createElement("h3");
        title.innerHTML = 'Form';
        container.appendChild(title);

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


        const btn = document.createElement("button");
        btn.innerHTML = "Submit";
        btn.id = "btnSend";
        container.appendChild(btn);
        

        //---
        const status = document.createElement("p");
        status.id = "formstatus";
        container.appendChild(status);


        //---
        const hr = document.createElement("hr");
        container.appendChild(hr);

        return container;

    }


    // display response
    //===================
    async sendInfo(str1, str2) {
        const data = await this.todoSend(str1, str2);

        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);

        return data;
    }  

}


export default new UtilsSendInfo;