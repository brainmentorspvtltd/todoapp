// Glue b/w View and Model
window.addEventListener('DOMContentLoaded',init);

function init(){
    bindEvents();
    updateCount();
}
function sort(){
    console.log("Inside Sort Fn");
    if(this.getAttribute('id').endsWith('id')){
       TODO_OPERATIONS.sort('id'); 
    }
    if(this.getAttribute('id').endsWith('name')){
        TODO_OPERATIONS.sort('name'); 
     }
     printTable(TODO_OPERATIONS.getTasks());
}
function bindEvents(){
    document.querySelector('#sortbyid').addEventListener('click', sort);
    document.querySelector('#sortbyname').addEventListener('click', sort);
    document.querySelector("#add").addEventListener('click', addTask);
    document.querySelector("#delete").addEventListener('click', deleteTask);
    document.querySelector("#save").addEventListener('click', save);
    document.querySelector("#load").addEventListener('click', load);
    document.querySelector('#update').addEventListener('click', update);
}

function load(){
    if(window.localStorage){
        if(localStorage.tasks){
            let data = JSON.parse(localStorage.tasks);
            console.log('Data is ',data);
            data.tasks.forEach(task=>{
                TODO_OPERATIONS.convert(task);
            });
            printTable(TODO_OPERATIONS.getTasks());
        }
        else{
            alert("No data to load");
        }
    }
    else{
        alert("Ur Browser is Outdated Not Support LocalStorage");
    }
}
function save(){
    if(window.localStorage){
        let obj = {"tasks":TODO_OPERATIONS.getTasks()};
        localStorage.tasks = JSON.stringify(obj);
        alert("Record Saved SuccessFully");
    }
    else{
        alert("Ur Browser is Outdated Not Support LocalStorage");
    }
}

function deleteTask(){
    let tasks =TODO_OPERATIONS.remove();
    printTable(tasks);

}

function clearAllFields(){
    const tempObject = {tid:0, name:'', desc:'', date:'', url:'', pr:''};
    for(let key in tempObject){
        document.querySelector(`#${key}`).value = tempObject[key]; 
    }
    document.querySelector('#tid').focus();
}

function printTable(tasks){
    document.querySelector('#tasks').innerHTML = '';
    //tasks.forEach(task =>printTask(task));
    tasks.forEach(printTask);
    updateCount();
}

function addIcon(className, callBackFn, id){
    //let img = document.createElement('img');
    //img.src = `assets/images/${imageName}.png`;
    // <i class="far fa-sort-size-up-alt"></i>
    let img = document.createElement('i');
    img.className='size mr-2 '+className;
    img.setAttribute('taskid', id);
    img.addEventListener('click', callBackFn);
    return img;
}
function updateCount(){
    document.querySelector('#total').innerText = TODO_OPERATIONS.tasks.length;
    document.querySelector('#mark').innerText = TODO_OPERATIONS.countMark();
    document.querySelector('#unmark').innerText = TODO_OPERATIONS.countUnMark();

}
function printTask(todoObject){
    let tbody = document.querySelector('#tasks');
    let tr = tbody.insertRow();
    let index = 0;
    for(let key in todoObject){
        if(key === 'markedDelete'){
            continue;
        }
        tr.insertCell(index).innerText = todoObject[key];
        index++;
    }
    let td = tr.insertCell(index);
    // <i class="fas fa-user-edit"></i>
    //<i class="fas fa-trash-alt"></i>
    td.appendChild(addIcon('fas fa-user-edit', edit, todoObject.id));
    td.appendChild(addIcon('fas fa-trash-alt', markDelete, todoObject.id));
}

function update(){
    const tempObject = {tid:0, name:'', desc:'', date:'', url:'', pr:''};
      for(let key in tempObject){
          if(key=='tid'){
            taskObj['id'] =  document.querySelector("#"+key).value;
          }
          else{
        taskObj[key] =  document.querySelector("#"+key).value;
          }
      }
      printTable(TODO_OPERATIONS.getTasks());  
}
let taskObj ;
function edit(){
    console.log("edit Call");
    let id = this.getAttribute("taskid");
    taskObj = TODO_OPERATIONS.searchById(id);
    if(taskObj){
    for(let key in taskObj){
        if(key=='id'){
        document.querySelector('#tid').value = taskObj[key];
        }
        else{
            document.querySelector('#'+key).value = taskObj[key];
        }
    }
}


}
function markDelete(){
    console.log('Mark Delete Call ',this);
    let img = this;
    let id = img.getAttribute("taskid");
    const taskObj = TODO_OPERATIONS.searchById(id);
    if(taskObj){
        taskObj.toggle();
        updateCount();
    }
    let tr = img.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    //tr.className= 'alert-danger';
}
function addTask(){
      const tempObject = {tid:0, name:'', desc:'', date:'', url:'', pr:''};
      for(let key in tempObject){
        tempObject[key] =  document.querySelector("#"+key).value;
      }  
      console.log(tempObject);
      const todoObject = TODO_OPERATIONS.add(tempObject);
      printTask(todoObject);
      updateCount();
      clearAllFields();

//    let id =  document.querySelector("#tid").value;
//    let name =  document.querySelector("#name").value;
//    let desc =  document.querySelector("#desc").value;
//    let date =  document.querySelector("#date").value;
//    let url =  document.querySelector("#url").value;
//    let pr =  document.querySelector("#pr").value;


}
