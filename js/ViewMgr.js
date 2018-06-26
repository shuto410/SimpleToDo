class ViewMgr{
    constructor(){

    }

    async _updateDrawCheckedTask(is_checked, elem){
        if(is_checked){
            $(elem).css("text-decoration", "line-through");
            $(elem).addClass("text-muted");
        }
        else{
            $(elem).css("text-decoration", "none");
            $(elem).removeClass("text-muted");
        }
    }

    async displayTab(){
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
}