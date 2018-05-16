let TaskMgr = {};


//セッション取得
const getSession = async () => {
    const resp = await fetch("php/getSession.php",{
        credentials: "same-origin"
      });
    const json = await resp.json();
    if (json.isSuccess == true) {
        console.log("get session success");
        TaskMgr.id = json.id;
        const name = await getUserName(json.id);
        $('#userid').text(`${name}さんがログインしています`);
    } else {
        console.log("get session failed" + json.sessionId);
    }
}

//ログインidよりユーザ名の取得
const getUserName = async (id) => {
    const resp = await fetch("php/getUserName.php", {
        method: 'POST',
        body: `id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    if (json.isSuccess == true) {
        return json.name;
    }
    else{
        return 'error';
    }
}


//サービス画面遷移時、ログインユーザー名表示
//登録タスクの取得
document.addEventListener("DOMContentLoaded", async () => {
    await getSession();
    const resp = await fetch("php/getTab.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.isSuccess == true) {
        //alert(json.size);
        $(".nav-tabs").empty();
        $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab0" class="nav-link active" data-toggle="tab">${json.tab_list[0]}</a>`));
        for(let i = 1; i < json.tab_list.length; i++){
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${i}" class="nav-link" data-toggle="tab">${json.tab_list[i]}</a>`));
        }
    }
    else{
        return 'error';
    }
});

//タスクテーマの新規登録
$(() => {
    $('#add_task_tab').click(() => {
        var tabName = window.prompt("tab name", "new tab");
        if (tabName == null) {
            alert("no inputs");
            return;
        }
        addTaskTab(() => {
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#${tabName}" class="nav-link" data-toggle="tab">${tabName}</a>`));
        }, tabName, TaskMgr.id);
    })
})

