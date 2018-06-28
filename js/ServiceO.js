/**
 * 
 */
class Service {
    constructor (){
        const id = _getIdFromSession();
        this._user = new User(id);
        this._tabs = []; 
        this._addLogoutEvent();
    }

    async _getIdFromSession(){
        const resp = await fetch("php/getSession.php",{
            credentials: "same-origin"
        });
        if(!resp.ok) throw new Error("Ajax to get session failed");
        const json = await resp.json();
        if (json.is_succeeded == true) {
            return json.id;
        } else {
            throw new Error("Session lost");
        }
    }

    _addLogoutEvent(){
        $('#logout').on("click", async () => {
            await logout();
            window.location.href = 'index.html';
        })
    }


    static addTaskTab(tab_name, user_id){
        const resp = await fetch('php/addTab.php', {
            method: 'POST',
            body: `tab_name=${tab_name}&user_id=${user_id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        })
        if(!resp.ok) throw new Error("Ajax to add tab failed");
        const json = await resp.json();
        if(json.is_succeeded == true){
            this._tabs.push(new Tab(tab_name, json.tab_id));
            return json.tab_id;
        } 
        else{
            throw new Error("Add tab failed");
        }
    }

    _removeTab(index){
        const resp = await fetch("php/removeTab.php", {
            method: 'POST',
            body: `user_id=${this._user.id}&tab_id=${this._tabs[index].id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }); 
        if(!resp.ok) throw new Error("Ajax to remove tab failed");
        const json = await resp.json();
        if (json.is_succeeded == true) {
            this._tabs.splice(index, 1);
            return true;
        }
        else{
            throw new Error("Remove tab failed");
        }
    }

    _fetchTabInfo(){
        const resp = await fetch("php/fetchTab.php", {
            method: 'POST',
            body: `user_id=${TaskMgr.user_id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }); 
        if(!resp.ok) throw new Error("Ajax to fetch tab info failed");
        const json = await resp.json();
        if(json.is_succeeded == true){
            
        }
        else{
            throw new Error("Fetch tab failed");
        }
    }
}