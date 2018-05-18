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

//タブ表示
const displayTab = async () => {
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
        if(json.size == 0) return;       //タブ数が0だったら描画しない
        $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab0" id="tab0" class="nav-link active" data-toggle="tab">${json.tab_list[0]}</a>`));
        for(let i = 1; i < json.tab_list.length; i++){
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${i}" id="tab${i}" class="nav-link" data-toggle="tab">${json.tab_list[i]}</a>`));
        }
    }
    else{
        return 'error';
    }
}

const deleteTab = async (tab_name) => {
    const resp = await fetch("php/deleteTab.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.id}&name=${tab_name}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.isSuccess == true) {
        return true;
    }
    else{
        return 'error';
    }
}

//サービス画面遷移時、ログインユーザー名表示
//登録タスクの取得
document.addEventListener("DOMContentLoaded", async () => {
    await getSession();
    await displayTab();
});

//タスクテーマの新規登録
$(() => {
    $('#add_task_tab').click(async () => {
        var tabName = window.prompt("tab name", "new tab");
        if (tabName == null) {
            alert("no inputs");
            return;
        }
        await addTaskTab(tabName, TaskMgr.id);
        displayTab();
    })
})

//タスクタブの削除
$(() => {
    $('#delete_tab').click(async () => {
       const ret = await deleteTab($(".nav-tabs .active").text());
       if(ret == true) displayTab();
    })
})
