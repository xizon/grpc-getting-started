import { PostList, Post, PostRow, FilterId } from '../proto/post_pb.js';
import { PostServiceClient } from '../proto/post_pb_service.js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';


import { cancelRun } from './utils/grpc-api-assistant';

const client = new PostServiceClient('http://' + window.location.hostname + ':12345', null, null);

// grpc fault tolerance
const grpcError = (data) => {
    if ( typeof data === 'undefined' ) return;
    
    if ( data.toString() === 'Error' ) {
        localStorage.removeItem('XXX_XXX_XXX');
        document.cookie = `XXX_XXX_XXX=null;expires=${new Date(0).toUTCString()};path=/`;
    }
};

class PostService {

    constructor() {
        this.callPostServiceGetPost = null;
        this.callPostServiceAddPost = null;
        this.callPostServiceFindId = null;
    }

    cancelAbortControllerPostServiceGetPost() {
        cancelRun(this.callPostServiceGetPost, 'PostServiceGetPost');
    }


    cancelAbortControllerPostServiceAddPost() {
        cancelRun(this.callPostServiceAddPost, 'PostServiceAddPost');
    }

    cancelAbortControllerPostServiceFindId() {
        cancelRun(this.callPostServiceFindId, 'PostServiceFindId');
    }


    todoList() {
        return new Promise((resolve, reject) => {
       
            this.callPostServiceGetPost = client.getPost(new Empty(), function (err, response) {
                if (err) {
                    resolve(err);
                    //reject(err);
                } else {
                    resolve({
                        code: 0,
                        message: '',
                        data: response.getItemsListList()
                    })   
                }
            });

        })
    }

    todoAdd() {
        const streamReq = new Post();
        const id = Math.floor(Math.random() * 100);
        streamReq.setId(id);
        streamReq.setTitle(`New Post Title ${id}`);
        streamReq.setCatName('newtype');
        streamReq.setLogName('newlog');


        // set properties
        const streamReqProps = new PostRow();
        streamReqProps.setPostId(id)
        streamReqProps.setPostPath('/example' + id)
        streamReq.setPostProperty(streamReqProps);

        //
        return new Promise((resolve, reject) => {
            // this.callPostServiceAddPost = client.addPost({
            //     'my-string': 'xxxxx-xxxxx-xxxxxx',
            // });

            this.callPostServiceAddPost = client.addPost();
        
            this.callPostServiceAddPost.write(streamReq);
            this.callPostServiceAddPost.end();

            this.callPostServiceAddPost.on('end', (response) => {
                resolve({
                    code: response.code,
                    message: response.details
                }); 
            });

        });
    }

    todoFindId() {

        return new Promise((resolve, reject) => {
            const req = new FilterId();
            req.setId(3);

            this.callPostServiceFindId = client.findId(req);
            let data = null;
            this.callPostServiceFindId.on('data', (res) => {
                console.log('stream.on("data") res 1: ', res.getItemsListList());
                data = res.getItemsListList();
            });
            this.callPostServiceFindId.on('end', (res) => {
                console.log('stream.on("end") res  2: ', res); 
                // {"code":0,"details":"OK","metadata":{"headersMap":{"grpc-status":["0"],"grpc-message":["OK"]}}}

                resolve({
                    code: 0,
                    message: '',
                    data: data
                })   
            });
            
        })

    }


    // create form
    //===================
    createPostForm() {

        const container = document.createElement("div");

        const title = document.createElement("h3");
        title.innerHTML = 'Post';
        container.appendChild(title);

        const btn = document.createElement("button");
        btn.innerHTML = "Get post list";
        btn.id = "btnGetPosts";
        container.appendChild(btn);


        //---
        const btn2 = document.createElement("button");
        btn2.innerHTML = "Add new";
        btn2.id = "btnAddPost";
        container.appendChild(btn2);


        //---
        const btn3 = document.createElement("button");
        btn3.innerHTML = "Find item with ID 3";
        btn3.id = "btnFindId";
        container.appendChild(btn3);



        //---
        const status = document.createElement("div");
        status.id = "poststatus";
        container.appendChild(status);

        //---
        const hr = document.createElement("hr");
        container.appendChild(hr);

        return container;
    }

    // create list
    //===================
    generateList(data) {
        let res = '';
        data.forEach((item) => {
            res += `<li>(${item.postId}) ${item.postTitle} - <code>${item.postCat} - ${item.postLog} (Properties: ${item.postProperty.path})</code></li>`;
        });
        document.getElementById('poststatus').innerHTML = `<ul>${res}</ul>`;
    }

    
    // display response
    //===================
    async getPostList() {
        const data = await this.todoList();

        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);


        //
        const resList = [];
        if (typeof data.data === 'undefined') return {};
        for (const item of data.data) {

            const postProperty = item.getPostProperty();
            resList.push(
                {
                    'postId': item.getId(),
                    'postTitle': item.getTitle(),
                    'postCat': item.getCatName(),
                    'postLog': item.hasLogName() ? item.getLogName() : 0,
                    'postProperty': {
                        'id': postProperty.getPostId(),
                        'path': postProperty.getPostPath(),
                    }
                } 
            );
            
        }

        return {
            code: data.code,
            message: data.message,
            data: resList
        };

    }

    async addNewPost() {
        const data = await this.todoAdd();
        
        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);

        return data;
    }

    async findPost() {
        const data = await this.todoFindId();

        // If a grpc connection error occurs
        // User needs to log in again
        grpcError(data);


        //
        const resList = [];

        for (const item of data.data) {

            const postProperty = item.getPostProperty();
            resList.push(
                {
                    'postId': item.getId(),
                    'postTitle': item.getTitle(),
                    'postCat': item.getCatName(),
                    'postLog': item.hasLogName() ? item.getLogName() : 0,
                    'postProperty': {
                        'id': postProperty.getPostId(),
                        'path': postProperty.getPostPath(),
                    }
                } 
            );
            
        }

        return {
            code: data.code,
            message: data.message,
            data: resList
        };
    }


    
}

export default new PostService;


