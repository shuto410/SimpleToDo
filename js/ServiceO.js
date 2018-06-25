/**
 * 
 */
class Service {
    constructor (){
        const id = _getIdFromSession();
        this._user = new User(id);
    }

    async _getIdFromSession(){
        const resp = await fetch("php/getSession.php",{
            credentials: "same-origin"
        });
        const json = await resp.json();
        if (json.is_succeeded == true) {
            return json.id;
        } else {
            throw new Error("Session lost");
        }
    }

    _logout(){
        $('#logout').on("click", async () => {
            await logout();
            window.location.href = 'index.html';
        })
    }

}