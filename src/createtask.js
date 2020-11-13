import pubsub from "./pubsub.js";

const { default: dom } = require("./dom.js")

const createTask = (title, description, dueDate, priority) => {
    //Create main task elements
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-wrapper")
    let taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header")
    let taskTitle = document.createElement("h3");
    taskTitle.textContent = title;
    let taskDueDate = document.createElement("p");
    taskDueDate.textContent = "Due: " + dueDate;
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskDueDate);
    taskDiv.appendChild(taskHeader);

    //Add task priority
    let taskBody = document.createElement("div");
    taskBody.classList.add('task-body');
    taskBody.classList.add('hidden');

    let taskBodyHeader = document.createElement("div");
    taskBodyHeader.classList.add('task-body-header');

    let taskPriority = document.createElement("div");
    taskPriority.textContent = "Priority: " + priority;
    taskPriority.classList.add("priority");
    taskBodyHeader.appendChild(taskPriority);

    //Add icons for edit/delete/complete
    let iconWrapper = document.createElement("div");
    iconWrapper.classList.add('icon-wrapper');

    let completedIcon = document.createElement("span");
    completedIcon.classList.add('material-icons');
    completedIcon.textContent = "check_circle";
    iconWrapper.appendChild(completedIcon);

    let editIcon = document.createElement("span");
    editIcon.classList.add('material-icons');
    editIcon.textContent = "create";
    iconWrapper.appendChild(editIcon);

    let deleteIcon = document.createElement("span");
    deleteIcon.classList.add('material-icons');
    deleteIcon.textContent = "delete";
    iconWrapper.appendChild(deleteIcon); 

    taskBodyHeader.appendChild(iconWrapper);
    taskBody.appendChild(taskBodyHeader);

    //Add task description
    
    let taskDescription = document.createElement("div");
    taskDescription.textContent = description;
    taskBody.appendChild(taskDescription);

    taskDiv.appendChild(taskBody);

    pubsub.publish('addTaskToProject', taskDiv);

    //Allow taskbody to be hidden
    taskDiv.addEventListener('click', () => {
        taskBody.classList.contains('hidden') ? taskBody.classList.remove('hidden') :
            taskBody.classList.add('hidden')
    })
}

export default createTask;