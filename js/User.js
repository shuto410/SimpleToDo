/**
 * ユーザー情報を扱うクラス
 * @param {string} id ユーザーID(DBから取得する際に文字列のまま扱っている)
 * @constructor
 */
class User {
    constructor(id) {
        /**
         * ユーザーID
         * @type {string}
         */
        this._id = id;
        /**
         * ユーザー名
         * IDを元にDBから取得してくる。取得に失敗した場合ゲストとして扱う(未実装)
         * @type {string}
         */
        try{
            this._name = this._fetchUserName(id);
        } catch(e){
            this._name = "Guest"; 
        }
    }

    /**
     * idをもとにDBからユーザー名を取得する
     * @private
     * @param {string} id ユーザーID
     * @return {string} ユーザー名
     */
    async _fetchUserName (id) {
        const resp = await fetch("php/fetchUserName.php", {
            method: 'POST',
            body: `id=${id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        })
        if(!resp.ok) throw new Error("User name fetch failed");
        const json = await resp.json();
        if (json.is_succeeded == true) {
            return json.name;
        }
        else{
            throw new Error("id could not be found");
        }
    }

    /**
     * ユーザー名ゲッター
     * @public
     * @type {string}
     */
    get name (){
        return this._name;
    }

    /**
     * ユーザーIDゲッター
     * @public
     * @type {string}
     */
    get id (){
        return this._id;
    }
}