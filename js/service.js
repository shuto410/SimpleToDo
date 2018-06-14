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
        $('#user').text(`${name}`);
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

//チェック済みタスク打ち消し線の更新
const updateDrawCheckedTask = async (is_checked, elem) => {
    if(is_checked){
        $(elem).css("text-decoration", "line-through");
        $(elem).addClass("text-muted");
    }
    else{
        $(elem).css("text-decoration", "none");
        $(elem).removeClass("text-muted");
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
        for(let tab_id of Object.keys(json.tabs)){
            $('#task_content')
            .append($( `<div class="card col-lg-2 col-md-3 col-sm-4 col-10 mb-3 mr-3 mt-3 bg-secondary" style="display: inline-block; vertical-align: top;" id="${tab_id}">`)
            .append($( '<div class="card-body pl-0 pr-0 pt-2 pb-2">')
            .append(   `    <h4 class="card-title pb-0 text-center">
                                ${json.tabs[tab_id]}
                                <span class="dropdown">
                                    <!-- 切替ボタンの設定 -->
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                                    <!-- ドロップメニューの設定 -->
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item remove_tab" href="#" id="${tab_id}">削除</a>
                                        <a class="dropdown-item complete_task" href="#" id="${tab_id}">タスク完了</a>
                                        <a class="dropdown-item" href="#">something</a>
                                    </div><!-- /.dropdown-menu -->
                                </span><!-- /.dropdown -->
                            </h4>`)))
        }
        $('.remove_tab').on("click", async event => {
            const tab_id = $(event.currentTarget).attr("id");
            const result = await removeTab(tab_id);
            if(result == true) {
                await displayAll();
            }
         })
        $('.complete_task').on("click", async event => {
            const tab_id = $(event.currentTarget).attr("id");
            $(`#${tab_id}>.card-body>.card`).each(async (i, elem) => {
                const is_checked = $(elem).find(".form-check-input")[0]["checked"];
                if(is_checked){
                    task_id = $(elem).attr("id");
                    await removeTask(task_id);
                }
            })
            await displayAll();
        })
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
                for(let task_index of Object.keys(json.tasks[tab_id])){
                    const task = json.tasks[tab_id][task_index];
                    $(`#${tab_id} > .card-body`)
                    .append($(` <div class="card mb-3" id="${task.id}">`)
                    .append(`       <h6 class="card-header text-dark bg-primary pt-2 pb-2 pl-4 text-left">
                                        <div class="form-check">
                                            <input class="form-check-input input-lg" type="checkbox" value="${task.id}" id="task_check_${task.id}">
                                            <label class="form-check-label text-center" for="task_check_${task.id}">
                                            ${task.title}
                                            </label>
                                        </div>
                                    </h6>`, 
                            `       <div class="card-body bg-primary pt-2 pb-2"><p class="card-text">${task.description}</p></div>`));
                    const checkbox_elem = $(`#${tab_id}>.card-body>#${task.id} >.card-header>.form-check>.form-check-input`);
                    const task_title_elem = $(`#${tab_id}>.card-body>#${task.id} >.card-header>.form-check>.form-check-label`);
                    const task_discription_elem = $(`#${tab_id}>.card-body>#${task.id} >.card-body>.card-text`);

                    const is_checked = task.is_checked == "1";
                    if(is_checked){
                        checkbox_elem.prop("checked", true); //チェック情報をDBから反映
                    }
                    await updateDrawCheckedTask(is_checked, task_title_elem);
                    await updateDrawCheckedTask(is_checked, task_discription_elem);
                };
            }
        };
        //タスクチェック時の打消し線とミュート
        $('.form-check-input').on("click", async event => {
            const is_checked = $(event.currentTarget).prop("checked");
            const task_id = $(event.currentTarget).attr("value");
            await updateTaskCheckStatus(is_checked, task_id);
            await updateDrawCheckedTask(is_checked, $(event.currentTarget).next("label"));
            await updateDrawCheckedTask(is_checked, $(event.currentTarget).parents(`#${task_id}`).find(".card-text"));
        })
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
const removeTab = async tab_id => {
    const resp = await fetch("php/removeTab.php", {
        method: 'POST',
        body: `user_id=${TaskMgr.user_id}&tab_id=${tab_id}`,
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

//タスク削除
const removeTask = async task_id => {
    const resp = await fetch("php/removeTask.php", {
        method: 'POST',
        body: `task_id=${task_id}`,
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

//タスクのチェック状況更新
const updateTaskCheckStatus = async (is_checked, task_id) => {
    const resp = await fetch("php/updateTaskCheckStatus.php", {
        method: 'POST',
        body: `is_checked=${is_checked}&task_id=${task_id}`,
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




