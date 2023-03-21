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


// get post list
//==============================
document.getElementById('btnGetPosts').addEventListener('click', (e) => {
    e.preventDefault();
    UtilsPost.getPostList().then(function (data) {
        UtilsPost.generateList(data);
    });
});

// add new post
//==============================
document.getElementById('btnAddPost').addEventListener('click', (e) => {
    e.preventDefault();

    UtilsPost.addNewPost().then(function (data) {
        console.log(data);
        UtilsPost.getPostList().then(function (data) {
            UtilsPost.generateList(data);
        });
    });
});


// find post via ID
//==============================
document.getElementById('btnFindId').addEventListener('click', (e) => {
    e.preventDefault();

    UtilsPost.findPost().then(function (data) {
        console.log(data);
        UtilsPost.generateList(data);
    });
});





