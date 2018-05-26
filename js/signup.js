let isMailComplete = false;
let isPassComplete = false;

//メールアドレスフォームをチェック
const checkMailForm = async () => {
    const mail = $('#mail_register').val();
    if(mail == ''){ 
        isMailComplete = false;
        $('#mail_info').html('');
        return;
    }
    const resp = await fetch('php/checkMailAddress.php', {
        method: 'POST',
        body: `mail=${mail}`,
        headers: new Headers({
            'Content-type': 'application/x-www-form-urlencoded'
        })
    })
    const json = await resp.json();
    if (json.isMailAddress == false) {
        $('#mail_info').html('正しい形式ではありません。');
        isMailComplete = false;
    } else if (json.isUsed) {
        $('#mail_info').html('このメールアドレスは使用されています。');
        isMailComplete = false;
    } else {
        $('#mail_info').html('&#10003');
        isMailComplete = true;
    }
}

//メールアドレス入力後チェック
$(() => {
    $('#mail_register').blur(checkMailForm);
})


$(() => {
    $('#password').blur(() => {
        const pass = $('#password').val(); //パスワードの入力値を取得
        if (pass == ""){
            $('#pass_info').html('');
            return;
        }
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
        if (pass_confirm == ""){
            isPassComplete = false;
            $('#pass_confirm_message').html('');
            return;
        }
        if (pass != pass_confirm) {
            isPassComplete = false;
            $('#pass_confirm_message').html('パスワードが一致しません。');
        } else {
            $('#pass_confirm_message').html('&#10003;');
            isPassComplete = true;
        }
    })
})

$(() => {
    $('#submit').click(async () => {
        await checkMailForm();
        const mail = $('#mail_register').val();
        const pass = $('#password').val();
        const name = $('#user_name').val();
        if (!isMailComplete || !isPassComplete || name == "" || mail == "" || pass == "") {
            alert("retry!");
            return;
        }

        const resp = await fetch("php/addAccount.php", {
            method: 'POST',
            body: `mail=${mail}&pass=${pass}&name=${name}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        })
        const json = await resp.json();
        if (json.is_succeeded == true) {
            await addTaskTab('ToDo', json.id);
            await addTaskTab('Shopping', json.id);
            startSession(json.id);
            window.location.href = 'service.html';
        } else {
            alert("failed!");
        }
    })
})