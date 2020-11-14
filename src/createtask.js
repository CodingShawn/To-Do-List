import pubsub from "./pubsub.js";

const { default: dom } = require("./dom.js")

const createTask = (title, description, dueDate, priority, isCompleted = false) => {
    let taskInfo = [title, description, dueDate, priority, isCompleted];

    //Create main task elements
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-wrapper")
    let taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header")
    let taskTitle = document.createElement("h3");
    taskTitle.textContent = title;
    let taskDueDate = document.createElement("p");
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

    createDeleteIcon(iconWrapper,taskDiv);

    let completedIcon = createCompleteIcon(iconWrapper, isCompleted, taskDueDate, dueDate);
    completedIcon.addEventListener('click', () => {
        if (completedIcon.style.color !== "rgb(46, 181, 57)") {
            completedIcon.style.color = "rgb(46, 181, 57)";
            taskDueDate.textContent = "Completed!";
            taskInfo[4] = true;
        } else {
            completedIcon.style.color = "rgb(51, 51, 51)";
            taskDueDate.textContent = "Due: " + dueDate;
            taskInfo[4] = false;
        };
    });

    taskBodyHeader.appendChild(iconWrapper);
    taskBody.appendChild(taskBodyHeader);

    //Add task description

    let taskDescription = document.createElement("div");
    taskDescription.textContent = description;
    taskDescription.classList.add("task-description");
    taskBody.appendChild(taskDescription);
    taskDescription.setAttribute("contenteditable", true);

    taskDiv.appendChild(taskBody);

    pubsub.publish('addTaskToProject', taskDiv);
    pubsub.publish('saveTaskInfo', taskInfo);

    //Allow taskbody to be hidden
    taskHeader.addEventListener('click', () => {
        taskBody.classList.contains('hidden') ? taskBody.classList.remove('hidden') :
            taskBody.classList.add('hidden')
    })
}

const createCompleteIcon = (iconWrapper, isCompleted, taskDueDate, dueDate) => {
    let completedIcon = document.createElement("span");
    completedIcon.classList.add('material-icons');
    completedIcon.textContent = "check_circle";
    iconWrapper.appendChild(completedIcon);
    if (isCompleted === true) {
        completedIcon.style.color = "rgb(46, 181, 57)";
        taskDueDate.textContent = "Completed!";
    } else {
        completedIcon.style.color = "rgb(51, 51, 51)";
        taskDueDate.textContent = "Due: " + dueDate;
    };
    return completedIcon;
}

const createDeleteIcon = (iconWrapper, taskDiv) => {
    let deleteIcon = document.createElement("span");
    deleteIcon.classList.add('material-icons');
    deleteIcon.textContent = "delete";
    iconWrapper.appendChild(deleteIcon); 
    deleteIcon.addEventListener('click', () => {
        if (window.confirm("Do you really want to delete this task?")) {
            taskDiv.remove();
        }
    })
}

export default createTask;