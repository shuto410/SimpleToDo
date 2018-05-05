var TaskMgr = TaskMgr || {};


//セッション取得
var getSession = function(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: "php/getSession.php",
            type: "POST",
            dataType: "json",
        })
        .done(function(json){
            if(json.isSuccess == true){
                alert(json.sessionId);
                console.log("get session success");
                TaskMgr.id = json.id;
                resolve(json.id);
            }
            else{
                alert(json.sessionId);
                console.log("get session failed"+json.sessionId);
                reject();
            }
        });
        
        
    })
}
    
//ログインidよりユーザ名の取得
var getUserName = function(id){
    return fetch("php/getUserName.php", {
        method: 'POST',
        body:   'id=' + id,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.isSuccess == true){
            return json.name;
        } 
    })
}



//サービス画面遷移時、ログインユーザー名表示
window.addEventListener('load', function(){
    getSession().then(getUserName, function(){
        window.location.href = 'login.html';
    })
    .then(function(name){
        $('#userid').text(name+"さんがログインしています");
    });
});


//タスクテーマの新規登録
$(function(){
    $('#add_task_tab').click(function(){
        var tabName = window.prompt( "tab name" , "new tab" );
        if(tabName == null){ 
            alert("no inputs");
            return;
        }
        addTaskTab(function(){
            $('.nav-tabs').append($('<li class="nav-item">').append('<a href="#' + tabName + '" class="nav-link" data-toggle="tab">' + tabName + '</a>'));
        }, tabName, TaskMgr.id);
    })
})




