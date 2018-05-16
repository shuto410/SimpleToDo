/* ==================================
 * FileName : common.js
 * Contents : JavaScript関数群
 * =================================*/



const startSession = async (id) => {
    const resp = await fetch("php/setSession.php", {
        method: 'POST',
        body: `id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    alert(json.sessionId);
    //alert(.isSuccess);
    if(json.isSuccess == true){
        //alert("set success");
        console.log("set session success");
    }
    else{
        //alert("set failed");
         console.log("set session failed");
    }
}



const getSessionB = () => {
    fetch("php/getSession.php", {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.isSuccess == true){
            alert("get success");
            console.log("get session success");
            return json.id;
        }
        else{
            alert("get failed");
            console.log("get session failed"+json.id);
            return null;
        }
    })
}

//タスク追加関数
const addTaskTab = (resolve, name, id) => {
    fetch('php/addTab.php', {
        method: 'POST',
        body: `name=${name}&user_id=${id}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then((response) => {
        return response.json();
    }).then((json) => {
        if(json.isSuccess == true){
            resolve();
            console.log("success");
        } 
        else{
            console.log("error");
        }
    })
}