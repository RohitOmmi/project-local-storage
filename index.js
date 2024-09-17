let  addTodoButton = document.getElementById('addButton');
let saveTodoButton = document.getElementById('saveButton');
let todoItemsContainer = document.getElementById('itemsContainer');

function getTodoItemsFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    console.log(stringifiedTodoList)
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
    let selectionCheckbox= document.getElementById(checkBoxId)
    lableElement.classList.toggle('checked');
    
};
function OnDelTodo(todoId){
    let todoElement= document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

};
function createAndAppendTodo(todo){
    let todoId= 'todo' + todo.uniqueNo;
    let checkBoxId = 'checkbox' + todo.uniqueNo;
    let lableId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.id=todoId;
    todoElement.classList.add('todo-item-container','d-flex','flex-row');
    todoItemsContainer.appendChild(todoElement);

    let checkboxElemnt = document.createElement('input');
    checkboxElemnt.type='checkbox';
    checkboxElemnt.id=checkBoxId;

    checkboxElemnt.onclick=function(){
        onTodoStatusChange( lableId);

    };
    checkboxElemnt.classList.add('checkbox-input');
    todoElement.appendChild(checkboxElemnt);

    let labelContainer = document.createElement('div')
    labelContainer.classList.add('label-items-container','d-flex','flex-row')
    todoElement.appendChild(labelContainer);

    let lableElement= document.createElement('label');
    lableElement.setAttribute('for',checkBoxId)
    lableElement.id=lableId;
    lableElement.classList.add('checkbox-label')
    lableElement.textContent=todo.text;
    labelContainer.appendChild(lableElement);

    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add('del-icon-container');
    labelContainer.appendChild(delIconContainer);

    let delIcon = document.createElement('i');
    delIcon.classList.add('fa-solid','fa-trash','delete-icon');
    delIcon.onclick=function(){
        OnDelTodo(todoId);
    }
    delIconContainer.appendChild(delIcon);

};

for( let todo of todoList){
    createAndAppendTodo(todo);
}

function onAddTodo(){
    let userInput = document.getElementById('inputArea');
    let userInputValue = userInput.Value;
    if(userInputValue===""){
        alert("enter valid text");
        return;
    }
    todoCount=todoCount+1;
    let newTodo={
        text:userInputValue,
        uniqueNo:todoCount,
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.Value = "";
}

addTodoButton.onclick = function(){
    onAddTodo();
};

