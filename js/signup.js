var isMailComplete = false;
var isPassComplete = false;


//メールアドレス入力後チェック
$(function () {
    $('#mail_register').blur(function () {
        fetch('php/checkMailAddress.php', {
            method: 'POST',
            body: 'mail=' + $('#mail_register').val(),
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.isMailAddress == false) {
                //alert($('#info').text());
                $('#mail_info').html('正しい形式ではありません。');
            } else if (json.isUsed) {
                $('#mail_info').html('このメールアドレスは使用されています。');
            } else {
                $('#mail_info').html('&#10003');
                isMailComplete = true;
            }
        })
    })
})


$(function () {
    $('#password').blur(function () {
        var pass = $('#password').val(); //パスワードの入力値を取得
        if (pass == "") return;
        if (pass.length < 8) {
            $('#pass_info').html('パスワードは8文字以上に設定してください');
        } else if (pass.search(/[a-zA-Z]/) == -1 || pass.search(/[0-9]/) == -1) {
            $('#pass_info').html('パスワードには英字と数字を両方含む必要があります。');
        } else {
            $('#pass_info').html('&#10003');
        }
    })
})

$(function () {
    $('#confirm_password').blur(function () {
        var pass = $('#password').val();
        var pass_confirm = $('#confirm_password').val();
        if (pass_confirm == "") return;
        if (pass != pass_confirm) {
            $('#pass_confirm_message').html('パスワードが一致しません。');
        } else {
            $('#pass_confirm_message').html('&#10003;');
            isPassComplete = true;
        }
    })
})

$(function () {
    $('#submit').click(function () {
        var mail = $('#mail_register').val();
        var pass = $('#password').val();
        var name = $('#user_name').val();
        if (!isMailComplete || !isPassComplete || $('#user_name').val() == "") {
            alert("retry!");
            return;
        }
        fetch("php/addAccount.php", {
            method: 'POST',
            body: 'mail=' + mail + '&pass=' + pass + '&name=' + name,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.result = true) {
                window.location.href = 'service.html';
            } else {
                alert("failed!");
            }
        })
    })
})