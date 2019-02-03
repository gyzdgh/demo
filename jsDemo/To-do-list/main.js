var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

//创建新任务列表

var createNewTaskElement = function(taskString){
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    label.innerText = taskString;

    //每一个要素，都要追加
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    //并添加在页面上
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

//添加任务
var addTask = function(){
    //创建一个新的列表项
    var listItem = createNewTaskElement(taskInput.value);
    
    //把列表项添加到 incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// 编辑现有任务

var editTask = function(){
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    //如果父类是.editmode
    if(containsClass){
        // 切换到.editmode
        // label成为输入值。
        label.innerText = editInput.value;
    }else{
        editInput.value = label.innerText;
    }

    //在父级上切换.editmode
    listItem.classList.toggle("editMode");
}

// 删除任务

var deleteTask = function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //从 ul 中删除父列表项
    ul.removeChild(listItem);
}

//标记任务已完成
var taskCompleted = function(){
    //将任务列表项附加到＃completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem)
        bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    // 将任务标记为不完整
    //取消选中该复选框时
    //将任务列表项附加到＃incomplete-tasks。
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest=function(){
	console.log("AJAX Request");
}


// 将click处理程序设置为addTask函数。

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    // 选择ListItems子项
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    // 绑定editTask以编辑按钮。
    editButton.onclick = editTask;
    // 绑定deleteTask删除按钮。
    deleteButton.onclick = deleteTask;
    // 将taskCompleted绑定到checkBoxEventHandler。
    checkBox.onchange = checkBoxEventHandler;
}

// 循环遍历incompleteTaskHolder ul列表项
//遍历每个列表项

for(var i = 0;i<incompleteTaskHolder.children.length;i++){
    // 绑定事件以列出项目子项（任务已完成）
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}


// 循环遍历completedTask Holder ul列表项

for(var i=0;i<completedTasksHolder.children.length;i++){
    // 绑定事件以列出项目子项（任务已完成）
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

