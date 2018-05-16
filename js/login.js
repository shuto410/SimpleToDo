let ALERT = {};

ALERT.create = (alert_type, message) => {

    let alert = document.createElement('div');
    alert.setAttribute('id', 'failed-alert');
    alert.setAttribute('class', 'col-md-4 offset-md-4 alert alert-' + alert_type);

    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-hidden', 'true');


    alert.appendChild(button);
    alert.appendChild(document.createTextNode(message));

    return alert;
};

ALERT.hide = () => {
    console.log('Hide alert');
    $('#failed-alert').alert('close');
    setTimeout(showAlert, update_msec);
};

ALERT.show = () => {
    console.log('Show alert');
    $('#alert_col').append(ALERT.create('info', "Your email address or password is incorrect. Please check and try again."));
};


$(() => {
    const php = "php/login.php";
    $('#submit').click(() => {
        const mail = $('#inputEmail').val();
        const pass = $('#inputPassword').val();
        const resp = await fetch(php, {
            method: 'POST',
            body: 'mail=' + mail + '&pass=' + pass,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })           
        })
        const json = await resp.json();
        // textに文字列で結果が渡される
        console.log(`${json.isSuccess} id : ${json.id}`);
        if (json.isSuccess == true) {
            startSession(json.id);
            window.location.href = 'service.html';
        } else {
            if ($('#failed-alert').length) {
                ALERT.hide();
                ALERT.show();
            } else {
                ALERT.show();
            }
        }
    })
})

