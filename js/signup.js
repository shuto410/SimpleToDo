let isMailComplete = false;
let isPassComplete = false;


//メールアドレス入力後チェック
$(() => {
    $('#mail_register').blur(() => {
        const mail = $('#mail_register').val();
        if(mail == '') return;
        fetch('php/checkMailAddress.php', {
            method: 'POST',
            body: `mail=${mail}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
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


$(() => {
    $('#password').blur(() => {
        const pass = $('#password').val(); //パスワードの入力値を取得
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

$(() => {
    $('#confirm_password').blur(() => {
        const pass = $('#password').val();
        const pass_confirm = $('#confirm_password').val();
        if (pass_confirm == "") return;
        if (pass != pass_confirm) {
            $('#pass_confirm_message').html('パスワードが一致しません。');
        } else {
            $('#pass_confirm_message').html('&#10003;');
            isPassComplete = true;
        }
    })
})

$(() => {
    $('#submit').click(() => {
        const mail = $('#mail_register').val();
        const pass = $('#password').val();
        const name = $('#user_name').val();
        if (!isMailComplete || !isPassComplete || $('#user_name').val() == "") {
            alert("retry!");
            return;
        }
        fetch("php/addAccount.php", {
            method: 'POST',
            body: `mail=${mail}&pass=${pass}&name=${name}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.isSuccess == true) {
                addTaskTab(() => {
                    startSession(json.id);
                }, 'ToDo', json.id);
                addTaskTab(() => {
                    window.location.href = 'service.html';
                }, 'Shopping', json.id);
            } else {
                alert("failed!");
            }
        })
    })
})