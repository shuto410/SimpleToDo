let TaskMgr = {
    user_id : null,
    tabs : {},
    tasks : {}  
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
        if(json.tabs.length == 0) return;       //タブ数が0だったら描画しない
        TaskMgr.tabs[0] = { "id" : json.tabs[0].id, "name" : json.tabs[0].name };
        $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab0" class="nav-link active" data-toggle="tab">${json.tabs[0].name}</a>`));
        for(let i = 1; i < json.tabs.length; i++){
            TaskMgr.tabs[i] = { "id" : json.tabs[i].id, "name" : json.tabs[i].name };
            $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${i}" class="nav-link" data-toggle="tab">${json.tabs[i].name}</a>`));
        }
    }
    else{
        return 'error';
    }
}

//タブ削除
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

//タスク追加
const addTask = async (title, description, tab_id) => {
    const resp = await fetch("php/addTask.php", {
        method: 'POST',
        body: `title=${title}&description=${description}&tab_id=${tab_id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    });
    const json = await resp.text();   
    if(json.isSuccess == true){
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
        const pos = Number($('.nav-tabs .active').attr("href").slice(4));
        const id = Number(TaskMgr.tabs[pos].id);
        var taskTitle = window.prompt("title", "new task");
        if (taskTitle == null) {
            alert("no inputs");
            return;
        }
        var taskDescript = window.prompt("Descript", "about new task");
        if (taskDescript == null) {
            alert("no inputs");
            return;
        }
        const ret = await addTask(taskTitle, taskDescript, id);
        //if(ret == true) ;
    })
})
