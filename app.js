// Define UI vars
const form = document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    tasklist.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks event
    filter.addEventListener('keyup',filterTasks);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
}

// Get Tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
    const li= document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create textNode and append to the li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add clas
    link.className="delete-item secondary-content"
    //add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul 
    tasklist.appendChild(li);
    });
}


// add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }

    //Create li element
    const li= document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create textNode and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //add clas
    link.className="delete-item secondary-content"
    //add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul 
    tasklist.appendChild(li);

    // Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value='';

    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure ?')){
        e.target.parentElement.parentElement.remove();

        //remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove form local storage function
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent ===task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    //clear from ls
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){

            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display= 'block'
            }else{
                task.style.display='none';
            }
        });
}


































