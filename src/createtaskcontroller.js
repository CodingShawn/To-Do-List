const { default: createTask } = require("./createtask");
const { default: pubsub } = require("./pubsub")
const { default: dom } = require("./dom.js")

const createTaskController = () => {
    let taskFormWrapper = document.getElementsByClassName('task-form-wrapper')[0];
    let taskFormDOM = document.getElementById("create-task-form");
    let closeTaskFormBtn = document.getElementById("close-task-form-btn");

    const showTaskForm = (projectDiv) => {
        taskFormWrapper.classList.remove('hidden');

        //Which project the tasks should be attached to
        let targetedProject = projectDiv;
        dom.setTargetedProject(targetedProject);
    }
    
    taskFormDOM.addEventListener('submit', (event) =>{
        event.preventDefault();
        pubsub.publish('createTask', taskFormDOM);
    })
    
    const createTaskSub = (taskFormData) => {
        createTask(
            taskFormData.elements[0].value, 
            taskFormData.elements[1].value,
            taskFormData.elements[2].value,
            taskFormData.elements[3].value)
        taskFormData.reset();
    }

    const loadTask = (taskData) => {
        createTask(...taskData);
    }

    const hideForm = () => {
        taskFormWrapper.classList.add('hidden');
    }

    closeTaskFormBtn.addEventListener('click', hideForm);

    pubsub.subscribe('showTaskForm', showTaskForm);
    pubsub.subscribe('createTask', createTaskSub);
    pubsub.subscribe('createTask', hideForm);
    pubsub.subscribe('loadTask', loadTask);
}

export default createTaskController;