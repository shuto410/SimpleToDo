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
