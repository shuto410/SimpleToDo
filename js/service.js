let TaskMgr = {
    user_id = null,
    tab_ids = [],
    task_ids = {}  
};


//セッション取得
const getSession = async () => {
    const resp = await fetch("php/getSession.php",{
        credentials: "same-origin"
    });
    const json = await resp.json();
    if (json.isSuccess == true) {
        console.log("get session success");
        TaskMgr.user_id = json.id;
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
        body: `user_id=${TaskMgr.user_id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.isSuccess == true) {
        //alert(json.size);
        $(".nav-tabs").empty();
        if(json.size == 0) return;       //タブ数が0だったら描画しない
        TaskMgr.tab_ids[0] = json.tabs.id[0];
        $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab0" class="nav-link active" data-toggle="tab">${json.tabs.name[0]}</a>`));
        for(let i = 1; i < json.tabs.name.length; i++){
            TaskMgr.tab_ids[i] = json.tabs.id[i];
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${i}" class="nav-link" data-toggle="tab">${json.tabs.name[i]}</a>`));
        }
    }
    else{
        return 'error';
    }
}

const removeTab = async (tab_name) => {
    const resp = await fetch("php/removeTab.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.user_id}&name=${tab_name}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.isSuccess == true) {
        return true;
    }
    else{
        return false;
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
        const tab_id = await addTaskTab(tabName, TaskMgr.user_id);
        TaskMgr.tab_ids.push(tab_id);
        displayTab();
    })
})

//タスクタブの削除
$(() => {
    $('#remove_tab').click(async () => {
       const ret = await removeTab($(".nav-tabs .active").text());
       if(ret == true) displayTab();
    })
})

//タスクの追加
$(() => {
    $('#add_task').click(async () => {
      
    })
})
