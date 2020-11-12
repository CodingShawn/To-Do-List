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

    //Add task description
    let taskBody = document.createElement("div");
    taskBody.classList.add('task-body');
    taskBody.classList.add('hidden');

    let taskPriority = document.createElement("div");
    taskPriority.textContent = "Priority: " + priority;
    taskPriority.classList.add("priority");
    let taskDescription = document.createElement("div");
    taskDescription.textContent = description;
    taskBody.appendChild(taskPriority);
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