/***********************
 * tabs 
 *      dict[ tab id (num) : tab name (string) ]
 * tasks
 *      dict[ tab id (num) : array[ title , description, task id ] ]
 * 
 * 
************************/

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
        $("#task_content").empty();
        if(json.tabs.length == 0) return;       //タブ数が0だったら描画しない
        TaskMgr.tabs = json.tabs;
        for(let id of Object.keys(json.tabs)){
            $('#task_content')
            .append($(`<div class="card col-lg-2 col-md-3 col-sm-4 col-10 mb-3 mr-3 mt-3 bg-secondary" style="display: inline-block; vertical-align: top;" id="${id}">`)
            .append($('<div class="card-body pl-0 pr-0 pt-2 pb-2">')
            .append(  `    <h4 class="card-title pb-0">${json.tabs[id]}</h4>`)))
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
        //$(".card-title").empty();
        if(json.tasks.length == 0) return;       //タスク数が0だったら描画しない
        TaskMgr.tasks = json.tasks;
        for(let tab_id of Object.keys(TaskMgr.tabs)){
            if(tab_id in json.tasks){
                for(let task_id of Object.keys(json.tasks[tab_id])){
                    const task = json.tasks[tab_id][task_id];
                    $(`#${tab_id} > .card-body`).append($('<div class="card mb-3">').append(`<h6 class="card-header text-dark bg-primary pt-2 pb-2">${task.title}</h6>`, 
                                            `<div class="card-body bg-primary pt-2 pb-2"><p class="card-text">${task.description}</p></div>`));
                };
            }
        };
    }
    else{
        return 'error';
    }
}

//タスク追加ボタン表示
const displayAddTaskButton = async () => {
    for(let tab_id of Object.keys(TaskMgr.tabs)){
        $(`#${tab_id} > .card-body`).append(`<button type="button" class="btn btn-sm bg-light border-info add_task" id="add_task_${tab_id}">add</button>`);
    }
    //ボタンクリック時イベント登録
    $('.add_task').on("click", async event => {
        const attr_id = $(event.currentTarget).attr("id");
        const tab_id = Number(attr_id.slice(9));
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
        await displayAll();
    })
}

//まとめて描画
const displayAll = async () => {
    await displayTab();
    await displayTask();
    await displayAddTaskButton();
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
    await displayAll();
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
        await displayAll();
    })
})

//タスクタブの削除
$(() => {
    $('#remove_tab').click(async () => {
       const result = await removeTab($(".nav-tabs .active").text());
       if(result == true) {
           await displayAll();
       }
       $(".nav-tabs:first").addClass("active");
    })
})


//const setAddTaskEvent = 

//タスクの新規登録
$(() => {
    $('.add_task').on("click", async () => {
        const tab_id = Number($(this).attr("id").slice(9));
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
        await displayTab();
        displayTask();
    })
})


$(() => {
    $('#tab_remove').click(async () => {
    
    })
})
