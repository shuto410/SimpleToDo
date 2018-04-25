window.addEventListener('load', function(){
    getSession(getUserName(id, function(name){
        $('#userid').text(name+"さんがログインしています");
    })
);
    
    /*getSession().then(function(id){
        $('#userid').text(id);
    }).catch(function(error){
        console.log(error);
        window.location.href = 'index.html';
    })*/
})

/*$(function(){
    $('#get_id').click(function(){
        getSession().then(function(id){
            $('#userid').text(id);
        }).catch(function(error){
            console.log(error);
            window.location.href = 'index.html';
        })
    })
})*/

//タスクテーマの新規登録
$(function(){
    $('#add_task_tab').click(function(){
        var tabName = window.prompt( "tab name" , "new tab" );
        if(tabName == null){ 
            alert("no inputs");
            return;
        }
        fetch('php/addTab.php', {
            method: 'POST',
            body: 'name=' + tabName,
            headers: new Headers({
                    'Content-type': 'application/x-www-form-urlencoded'
            })
        }).then(function(response){
            return response.json();
        }).then(function(json){
            if(json.isSuccess == true){
                //TODO
                alert("success");
            } 
            else{
                alert("error");
            }
        })
    })
})

//ログインidよりユーザ名の取得
var getUserName = function(id, resolve, reject){
    fetch("php/getUserName.php", {
        method: 'POST',
        body:   'id=' + id,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.isSuccess == true){
            resolve(json.name);
        } 
        else{
            reject();
        }
    })
}