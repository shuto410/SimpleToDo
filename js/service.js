let TaskMgr = {};


//セッション取得
const getSession = () => {
    $.ajax({
            url: "php/getSession.php",
            type: "POST",
            dataType: "json",
        })
    .done(async json => {
        if (json.isSuccess == true) {
            //alert(json.sessionId);
            console.log("get session success");
            TaskMgr.id = json.id;
            const name = await getUserName(json.id);
            $('#userid').text(`${name}さんがログインしています`);
        } else {
            //alert(json.sessionId);
            console.log("get session failed" + json.sessionId);
            window.location.href = 'login.html';
        }
    });
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
window.addEventListener('load', getSession());


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

$(() => {
    $('#get_tab').click(async () => {
        const resp = await fetch("php/getTab.php", {
            method: 'POST',
            body: `user_id=${TaskMgr.id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }); 
        const json = await resp.json();
        if (json.isSuccess == true) {
            alert(json.size);
        }
        else{
            return 'error';
        }
    })
})