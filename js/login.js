
$(function() {
    var php = "php/login.php";
    $('#submit').click(function() {
        var mail = $('#inputEmail').val();
        var pass = $('#inputPassword').val();

        //php = php + '?mail=' + mail + '&pass=' + pass;

        fetch(php+'?mail='+mail+'&pass='+pass, /*{
            method: 'POST',
            body: 'mail=' + mail + '&pass=' + pass,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }*/).then(function(response) {
            return response.json();
        }).then(function(json) {
            // textに文字列で結果が渡される
            alert(json.isSuccess + " id : " + json.id);
            if (json.isSuccess == true) {
                startSession(json.id);
                //window.open('service.html', '_blank');
                window.location.href = 'service.html';
            }
        });
    })
})
