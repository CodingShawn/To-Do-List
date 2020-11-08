const { default: createTask } = require("./createtask");
const { default: pubsub } = require("./pubsub")
const { default: dom } = require("./dom.js")

const createTaskController = () => {
    let formWrapper = document.getElementsByClassName('task-form-wrapper')[0];
    let formDOM = document.getElementById("create-task-form");

    const showTaskForm = (projectDiv) => {
        formWrapper.classList.remove('hidden');

        //Where the tasks should be attached to
        let taskWrapper = projectDiv.childNodes[1];
        dom.setTargetedTaskWrapper(taskWrapper);
    }
    
    formDOM.addEventListener('submit', (event) =>{
        event.preventDefault();
        pubsub.publish('createTask', formDOM);
    })
    
    const createTaskSub = (formData) => {
        createTask(
            formData.elements[0].value, 
            formData.elements[1].value,
            formData.elements[2].value,
            formData.elements[3].value)
    }

    pubsub.subscribe('showTaskForm', showTaskForm);
    pubsub.subscribe('createTask', createTaskSub);
}

export default createTaskController;