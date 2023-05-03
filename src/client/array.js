import { SaveArrListReq, ArrData } from '../proto/array_pb.js';
import { ArrayServiceClient } from '../proto/array_pb_service.js';

const client = new ArrayServiceClient('http://' + window.location.hostname + ':12345', null, null);

// grpc fault tolerance
const grpcError = (data) => {
    if ( typeof data === 'undefined' ) return;
    
    if ( data.toString() === 'Error' ) {
        localStorage.removeItem('XXX_XXX_XXX');
        document.cookie = `XXX_XXX_XXX=null;expires=${new Date(0).toUTCString()};path=/`;
    }
};

// Both save and add can achieve the same result
class UtilsArray {

    todoArrAdd(arr_id, title, desc) {
        const req = new SaveArrListReq();
        req.setArrId(arr_id);
        

        // set properties
        address_type.map((el, i) => {
            const reqProps = new ArrData();
            reqProps.setArrId(arr_id[i]);
            reqProps.setTitle(title[i]);
            reqProps.setDesc(desc[i]);

            req.addArrList(reqProps);
    
        });
    

        client.saveArrList(req, {
            'session-id': 'xxxx-xxxx-xxxxx'
        }, function (err, response) {
            if (err) {
                resolve(err);
                
            } else {
                resolve({
                    code: response.getCode(),
                    message: response.getMessage()
                })        
            }
        });

    }

   
    todoArrSave() {
        const req = new SaveArrListReq();
        req.setArrId(arr_id);

        // set properties
        let protoEventsList = [];
        address_type.map((el, i) => {

            const reqProps = new ArrData();
            reqProps.setArrId(arr_id[i]);
            reqProps.setName(name[i]);
            reqProps.setDesc(desc[i]);
            protoEventsList.push(reqProps);
            
    
        });

        req.setArrListList(protoEventsList);


        client.saveArrList(req, {
            'session-id': 'xxxx-xxxx-xxxxx'
        }, function (err, response) {
            if (err) {
                resolve(err);
                
            } else {
                resolve({
                    code: response.getCode(),
                    message: response.getMessage()
                })        
            }
        });

    
    }

    // display response
    //===================
    async addNewArr({arr_id, title, desc}) {
        const data = await this.todoArrAdd(arr_id, title, desc);

        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);
        
        return data;
    }

    async saveArr({arr_id, title, desc}) {
        const data = await this.todoArrSave(arr_id, title, desc);

        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);
        
        return data;
    } 

    
}

export default new UtilsArray;

