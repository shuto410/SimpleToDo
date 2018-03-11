/* ==================================
 * FileName : common.js
 * Contents : JavaScript関数群
 * =================================*/


var startSession = function(id){
    fetch("php/setSession.php", {
        method: 'POST',
        body: 'id=' + id,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function (response){
        return response.json();
    }).then(function(json){
        if(json.isSuccess == true){
            alert("success");
            console.log("set session success");
        }
        else{
            alert("failed");
            console.log("set session failed");
        }
    })
}

var getSession = function(){
    fetch("php/getSession.php", {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function (response){
        return response.json();
    }).then(function(json){
        return new Promice(function(resolve, reject){
            if(json.id != null){
                //alert("success");
                //console.log("get session success");
                resolve(json.id);
            }
            else{
                //alert("failed");
                //console.log("get session failed");
                reject("get session error!");
            }
        });
    })
}