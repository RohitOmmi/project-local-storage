let  addTodoButton = document.getElementById('addButton');
let saveTodoButton = document.getElementById('saveButton');
let todoItemsContainer = document.getElementById('itemsContainer');

function getTodoItemsFromLocalStorage(){
    let stringifiedTodoList =localStorage.getItem('todoList');
    // console.log(stringifiedTodoList)
    let parsedTodoList= JSON.parse(stringifiedTodoList);

    if(parsedTodoList===null){

        return[];
    }
    else{

      return parsedTodoList;
    }


};

let todoList =getTodoItemsFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick=function(){
    localStorage.setItem('todoList',JSON.stringify(todoList));
};

function onTodoStatusChange( lableId){
    let lableElement= document.getElementById(lableId);

    lableElement.classList.toggle('checked');
    
};
function OnDelTodo(todoId ,delIconId){
//   console.log(typeof(delIconId))
    let todoElement= document.getElementById(todoId);
    let data = localStorage.getItem('todoList');
    let parsedData = JSON.parse(data);
    localStorage.removeItem('todoList');
 
    // console.log(parsedData);

    let newTodoList=[];
    for (let todos  of parsedData){
        // console.log(todos);
        if(delIconId != todos.uniqueNo){
            // console.log(delIconId)
            // console.log(todos)
            newTodoList.push(todos); 
            // localStorage.setItem('newTodoList',JSON.stringify(newTodoList));
           
        }
        else{
            // localStorage.removeItem('todoList');

             todoItemsContainer.removeChild(todoElement);
        }
    }
    // console.log(newTodoList)
    localStorage.setItem("todoList", JSON.stringify(newTodoList))
    
        
    // let todoList = JSON.parse(localStorage.setItem("todoList", JSON.stringify(newTodoList)))

};


function createAndAppendTodo(todo){
    let todoId= 'todo' + todo.uniqueNo;              
    let checkBoxId = 'todo' + todo.uniqueNo;
    let lableId = 'todo' + todo.uniqueNo;
    let delIconId= todo.uniqueNo;

    let todoElement = document.createElement('li');
    console.log(todoElement)
    todoElement.id=todoId;
    todoElement.classList.add('todo-item-container','d-flex','flex-row');
    todoItemsContainer.appendChild(todoElement);

    let inputboxElemnt = document.createElement('input');
    inputboxElemnt.type='checkbox';
    inputboxElemnt.id=checkBoxId;

    inputboxElemnt.onclick=function(){
        onTodoStatusChange( lableId);

    };
    inputboxElemnt.classList.add('checkbox-input');
    todoElement.appendChild(inputboxElemnt);

    let labelContainer = document.createElement('div')
    labelContainer.classList.add('label-items-container','d-flex','flex-row')
    todoElement.appendChild(labelContainer);

    let lableElement= document.createElement('label');
    lableElement.setAttribute('htmlFor',checkBoxId)
    lableElement.id=lableId;
    lableElement.classList.add('checkbox-label')
    lableElement.textContent=todo.text;
    // lableElement.textContent="hye";
    labelContainer.appendChild(lableElement);

    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add('del-icon-container');
    labelContainer.appendChild(delIconContainer);

    let delIcon = document.createElement('i');
    delIcon.id=delIconId;
    delIcon.classList.add('fa-solid','fa-trash','delete-icon');
    delIcon.onclick=function(){
        OnDelTodo(todoId,delIconId);
        

    }
    delIconContainer.appendChild(delIcon);

};

for( let todo of todoList){
    createAndAppendTodo(todo);
}

function onAddTodo(){
    
    let userInput = document.getElementById('inputArea');
    let userInputValue = userInput.value;
    
    /*console.log("SS",userInputValue)*/
    if(userInputValue===""){
        alert("enter valid text");
        return;
    }
    else
    {
        alert("click save button for storing");
    }
    todoCount=todoCount+1;
    let newTodo={
        text:userInputValue,
        uniqueNo:"todo"+todoCount,
        checkbox:false,
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value = "";
}

addTodoButton.onclick = function(){
    onAddTodo();
};

