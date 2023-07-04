import SendinfoService from './sendInfo';
import PostService from './post';

document.body.appendChild(SendinfoService.createSendForm());
document.body.appendChild(PostService.createPostForm());


// send info
//==============================
document.getElementById('btnSend').addEventListener('click', (e) => {
    e.preventDefault();

    SendinfoService.sendInfo(document.getElementById('input1').value, document.getElementById('input2').value).then(function (data) {
        document.getElementById('formstatus').innerHTML = `${data}`;
    });

    ;
});


// get post list (you can use `async...await`)
//==============================
document.getElementById('btnGetPosts').addEventListener('click', (e) => {
    e.preventDefault();
    PostService.getPostList().then(function (response) {
        PostService.generateList(response.data);
    });
});

// add new post (you can use `async...await`)
//==============================
document.getElementById('btnAddPost').addEventListener('click', (e) => {
    e.preventDefault();

    PostService.addNewPost().then(function (addrResponse) {
        PostService.getPostList().then(function (response) {
            PostService.generateList(response.data);
        });
    });
});


// find post via ID (you can use `async...await`)
//==============================
document.getElementById('btnFindId').addEventListener('click', (e) => {
    e.preventDefault();

    PostService.findPost().then(function (response) {
        console.log('findPost: ', response);
        PostService.generateList(response.data);
    });
});





