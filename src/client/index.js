import UtilsSendInfo from './sendInfo';
import UtilsPost from './post';

document.body.appendChild(UtilsSendInfo.createSendForm());
document.body.appendChild(UtilsPost.createPostForm());


// send info
//==============================
document.getElementById('btnSend').addEventListener('click', (e) => {
    e.preventDefault();

    UtilsSendInfo.sendInfo(document.getElementById('input1').value, document.getElementById('input2').value).then(function (data) {
        document.getElementById('formstatus').innerHTML = `${data}`;
    });

    ;
});


// get post list (you can use `async...await`)
//==============================
document.getElementById('btnGetPosts').addEventListener('click', (e) => {
    e.preventDefault();
    UtilsPost.getPostList().then(function (response) {
        UtilsPost.generateList(response.data);
    });
});

// add new post (you can use `async...await`)
//==============================
document.getElementById('btnAddPost').addEventListener('click', (e) => {
    e.preventDefault();

    UtilsPost.addNewPost().then(function (addrResponse) {
        console.log(addrResponse);
        UtilsPost.getPostList().then(function (response) {
            UtilsPost.generateList(response.data);
        });
    });
});


// find post via ID (you can use `async...await`)
//==============================
document.getElementById('btnFindId').addEventListener('click', (e) => {
    e.preventDefault();

    UtilsPost.findPost().then(function (response) {
        console.log(response);
        UtilsPost.generateList(response.data);
    });
});





