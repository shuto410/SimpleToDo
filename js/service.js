let TaskMgr = {
    user_id : null,
    tabs : {},
    tasks : {},
};


//セッション取得
const getSession = async () => {
    const resp = await fetch("php/getSession.php",{
        credentials: "same-origin"
    });
    const json = await resp.json();
    if (json.is_succeeded == true) {
        console.log("get session success");
        TaskMgr.user_id = json.id;
        const name = await fetchUserName(json.id);
        $('#userid').text(`${name}さんがログインしています`);
    } else {
        console.log("get session failed" + json.sessionId);
    }
}

//ログインidよりユーザ名の取得
const fetchUserName = async (id) => {
    const resp = await fetch("php/fetchUserName.php", {
        method: 'POST',
        body: `id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    if (json.is_succeeded == true) {
        return json.name;
    }
    else{
        return 'error';
    }
}

//タブ表示
const displayTab = async () => {
    const resp = await fetch("php/fetchTab.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.user_id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.is_succeeded == true) {
        $(".nav-tabs").empty();
        if(json.tabs.length == 0) return;       //タブ数が0だったら描画しない
        TaskMgr.tabs = json.tabs;
        for(let id of Object.keys(json.tabs)){
            if(id == Object.keys(json.tabs)[0]){
                $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${id}" class="nav-link active" data-toggle="tab">${json.tabs[id]}</a>`));
            }
            else{
                $('.nav-tabs').append($('<li class="nav-item">').append(`<a href="#tab${id}" class="nav-link" data-toggle="tab">${json.tabs[id]}</a>`));
            }
        }
    }
    else{
        return 'error';
    }
}

//タスク表示
const displayTask = async () => {
    const resp = await fetch("php/fetchTask.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.user_id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }); 
    const json = await resp.json();
    if (json.is_succeeded == true) {
        $(".tab-content").empty();
        if(json.tasks.length == 0) return;       //タスク数が0だったら描画しない
        TaskMgr.tasks = json.tasks;
        const active_tab_id = Number($('.nav-tabs .active').attr("href").slice(4));
        for(let tab_id of Object.keys(TaskMgr.tabs)){
            //activeなタブのコンテンツだけactiveにする
            if(tab_id == active_tab_id){
                $('.tab-content').append(`<div id="tab${tab_id}" class="tab-pane active">`);
            }
            else{
                $('.tab-content').append(`<div id="tab${tab_id}" class="tab-pane">`);
            }
            if(tab_id in json.tasks){
                for(let task_id of Object.keys(json.tasks[tab_id])){
                    const task = json.tasks[tab_id][task_id];
                    $('.tab-pane:last').append($('<div class="card mb-3" style="width: 20rem;">').append(`<div class="card-header text-white bg-success">${task.title}</div>`, 
                                            `<div class="card-body bg-light"><p class="card-text">${task.description}</p></div>`));
                };
            }
        };
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
    if (json.is_succeeded == true) {
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
        body: `title=${title}&description=${description}&tab_id=${tab_id}&user_id=${TaskMgr.user_id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    });
    const json = await resp.text();   
    if(json.is_succeeded == true){
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
    await displayTask();
});

//タスクテーマの新規登録
$(() => {
    $('#add_task_tab').click(async () => {
        var tabName = window.prompt("tab name", "new tab");
        if (tabName == null) {
            alert("no inputs");
            return;
        }
        await addTaskTab(tabName, TaskMgr.user_id);
        await displayTab();
        displayTask();
    })
})

//タスクタブの削除
$(() => {
    $('#remove_tab').click(async () => {
       const result = await removeTab($(".nav-tabs .active").text());
       if(result == true) {
           await displayTab();
           await displayTask();
       }
       $(".nav-tabs:first").addClass("active");
    })
})

//タスクの新規登録
$(() => {
    $('#add_task').click(async () => {
        const tab_id = Number($('.nav-tabs .active').attr("href").slice(4));
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
        const ret = await addTask(taskTitle, taskDescript, tab_id);
        //if(ret == true) ;
        displayTask();
    })
})
