let TaskMgr = {};


//セッション取得
const getSession = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "php/getSession.php",
            type: "POST",
            dataType: "json",
        })
        .done(json => {
            if(json.isSuccess == true){
                //alert(json.sessionId);
                console.log("get session success");
                TaskMgr.id = json.id;
                resolve(json.id);
            }
            else{
                //alert(json.sessionId);
                console.log("get session failed"+json.sessionId);
                reject();
            }
        });
        
        
    })
}
    
//ログインidよりユーザ名の取得
const getUserName = (id) => {
    return fetch("php/getUserName.php", {
        method: 'POST',
        body:   `id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.isSuccess == true){
            return json.name;
        } 
    })
}



//サービス画面遷移時、ログインユーザー名表示
window.addEventListener('load', () => {
    getSession().then(getUserName, () => {
        window.location.href = 'login.html';
    })
    .then((name) => {
        $('#userid').text(`${name}さんがログインしています`);
    });
});


//タスクテーマの新規登録
$(() => {
    $('#add_task_tab').click(() => {
        var tabName = window.prompt( "tab name" , "new tab" );
        if(tabName == null){ 
            alert("no inputs");
            return;
        }
        addTaskTab(() => {
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#${tabName}" class="nav-link" data-toggle="tab">${tabName}</a>`));
        }, tabName, TaskMgr.id);
    })
})




