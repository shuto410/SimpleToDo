/* ==================================
 * FileName : common.js
 * Contents : JavaScript関数群
 * =================================*/



const startSession = async (id) => {
    const resp = await fetch("php/setSession.php", {
        method: 'POST',
        body: `id=${id}`,
        credentials: "same-origin",
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    alert(json.sessionId);
    if(json.isSuccess == true){
        console.log("set session success");
    }
    else{
         console.log("set session failed");
    }
}



//タスク追加関数
//登録したタスクタブのidを返す
const addTaskTab = async (name, id) => {
    const resp = await fetch('php/addTab.php', {
        method: 'POST',
        body: `name=${name}&user_id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    if(json.isSuccess == true){
        console.log("success");
        return json.id;
    } 
    else{
        console.log("error");
        return null;
    }
}