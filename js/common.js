/* ==================================
 * FileName : common.js
 * Contents : JavaScript関数群
 * =================================*/


var startSession = function(id){
    /*fetch("php/setSession.php", {
        method: 'POST',
        body: 'id=' + id,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function (response){
        return response.json();
    }).then(function(json){
        if(json.isSuccess == true){
            alert("set success");
            console.log("set session success");
        }
        else{
            alert("set failed");
            console.log("set session failed");
        }
    })*/

    $.ajax({
        url: "php/setSession.php",
        type: "POST",
        data: {
            "id" : id
        },
        dataType: "json"
    })
    .done(function(json){
        alert(json.sessionId);
        //alert(.isSuccess);
        if(json.isSuccess == true){
            alert("set success");
            console.log("set session success");
        }
        else{
            alert("set failed");
            console.log("set session failed");
        }
    });
}

var getSession = function(resolve){
    $.ajax({
        url: "php/getSession.php",
        type: "POST",
        dataType: "json",
    })
    .done(function(json){
        alert(json.sessionId);
        if(json.isSuccess == true){
            alert("get success");
            console.log("get session success");
            resolve(json.id);
        }
        else{
            alert("get failed");
            console.log("get session failed"+json.id);
        }
    });
}

var getSessionB = function(){
    fetch("php/getSession.php", {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    }).then(function (response){
        return response.json();
    }).then(function(json){
        /*return new Promise(function(resolve, reject){
            if(json.isSuccess == true){
                alert("get success");
                console.log("get session success");
                resolve(json.id);
            }
            else{
                alert("get failed");
                console.log("get session failed"+json.id);
                reject("get session error!"+json.id);
            }
        });*/
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