const TODO_OPERATIONS = {
    tasks:[],
    sort(fieldName){
        let fieldType;
        fieldType = FIELDS[fieldName];
        // if(this.tasks.length>0){
        //     fieldType = typeof this.tasks[0][fieldName];
        // }
        if(fieldType === 'string'){
            this.tasks.sort((first, second)=>
                 first[fieldName].localeCompare(second[fieldName]))
        }
        else{
            this.tasks.sort((first, second)=>parseInt(first[fieldName]) - parseInt(second[fieldName]));
        }
        
    },
    getTasks(){
        return this.tasks;
    },
    convert({id, name, desc, date,url, pr}){
        let todo = new Todo(id, name, desc, date, url,pr);     
         this.tasks.push(todo);
         
     },
    add({tid, name, desc, date,url, pr}){
       let todo = new Todo(tid, name, desc, date, url,pr);     
        this.tasks.push(todo);
        return todo;
    },
    remove(){
            this.tasks = this.tasks.filter(task=>!task.markedDelete);
            return this.tasks;
    },
    searchById(id){
        return this.tasks.find(task=>task.id == id);
    },
    countUnMark(){
        return this.tasks.length - this.countMark();
    },

    countMark(){
        return this.tasks.filter(task=>task.markedDelete).length;
    },
    update(){

    },
   
    read(){
        
    }
    
}