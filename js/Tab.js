class Tab{
    constructor(name, id){
        this._name = name;
        this._id = id;
        this._tasks = [];
    }
    
    get name(){
        return this._name;
    }
    
    get id(){
        return this._id;s
    }

    _addTask(task_name, description){
        const resp = await fetch("php/addTask.php", {
            method: 'POST',
            body: `name=${task_name}&description=${description}&tab_id=${this._id}&user_id=${null}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        }); 
        if(!resp.ok) throw new Error("Ajax to add task failed");
        const json = await resp.json();  
        if(json.is_succeeded == true){
            this._tasks.push(new Task(task_name, description));
            return true;
        }
        else{
            throw new Error("Add task failed");
        }
    }

    _removeTask(index){
        const resp = await fetch("php/removeTask.php", {
            method: 'POST',
            body: `task_id=${this._tasks[index].id}`,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded'
            })
        });
        if(!resp.ok) throw new Error("Ajax to remove task failed");
        const json = await resp.json();
        if (json.is_succeeded == true) {
            this._tasks.splice(index, 1);
            return true;
        }
        else{
            throw new Error("Remove task failed");
        }
    }
}