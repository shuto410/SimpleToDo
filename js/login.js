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

        //php = php + '?mail=' + mail + '&pass=' + pass;

        fetch(`${php}?mail=${mail}&pass=${pass}`,
            /*{
                       method: 'POST',
                       body: 'mail=' + mail + '&pass=' + pass,
                       headers: new Headers({
                           'Content-type': 'application/x-www-form-urlencoded'
                       })
                   }*/
        ).then(response => {
            return response.json();
        }).then(json => {
            // textに文字列で結果が渡される
            console.log(`${json.isSuccess} id : ${json.id}`);

            //$("#result").html("failed");
            if (json.isSuccess == true) {
                startSession(json.id);
                //window.open('service.html', '_blank');
                window.location.href = 'service.html';
            } else {
                if ($('#failed-alert').length) {
                    ALERT.hide();
                    ALERT.show();
                } else {
                    ALERT.show();
                }
            }

        });
    })
})

