const { default: dom } = require("./dom.js")

const createTask = (title, description, dueDate, priority) => {
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
    dom.getTargetedTaskWrapper().appendChild(taskDiv);
}

export default createTask;