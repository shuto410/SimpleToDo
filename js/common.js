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
            console.log("set session success");
        }
        else{
            console.log("set session failed");
        }
    })
}