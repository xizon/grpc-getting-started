import { PostList, Post, PostRow, FilterId } from '../proto/post_pb.js';
import { PostServiceClient } from '../proto/post_pb_service.js';

const client = new PostServiceClient('http://' + window.location.hostname + ':12345', null, null);


class UtilsPost {

    todoList() {
        return new Promise((resolve, reject) => {
            const req = new PostList();

            client.getPost(req, function (err, response) {
                if (err) {
                    resolve(err);
                    //reject(err);
                } else {
                    resolve(response.getItemsListList());
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
            const stream = client.addPost((err, res) => {
                if (err) {
                    stream.end();
                    reject();
                }
            });
        
            stream.write(streamReq);
            resolve();

        });
    }

    todoFindId() {

        return new Promise((resolve, reject) => {
            const req = new FilterId();
            req.setId(3);

            const stream = client.findId(req);
            let data = null;
            stream.on('data', (res) => {
                console.log('stream.on("data") res 1: ', res.getItemsListList());
                data = res.getItemsListList();
            });
            stream.on('end', (res) => {
                console.log('stream.on("end") res  2: ', res); 
                // {"code":0,"details":"OK","metadata":{"headersMap":{"grpc-status":["0"],"grpc-message":["OK"]}}}

                resolve(data);
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

        //
        const res = [];
        data.forEach((item, i) => {
            const postProperty = item.getPostProperty();

            res.push(
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
        });
        return res;
    }

    async addNewPost() {
        const data = await this.todoAdd();
        return data;
    }

    async findPost() {
        const data = await this.todoFindId();
        //
        const res = [];
        data.forEach((item, i) => {
            const postProperty = item.getPostProperty();
            
            res.push(
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
        });
        return res;
    }


    
}

export default new UtilsPost;


