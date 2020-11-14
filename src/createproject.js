import manageChildrenMixin from './managechildrenmixin.js'
const { default: pubsub } = require("./pubsub")

const createBasicProject = (projectName) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project-wrapper")

    let projectDetailsWrapper = document.createElement("div");
    projectDetailsWrapper.classList.add("project-details");

    let projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    let projectTitle = document.createElement("h2");
    projectTitle.textContent = projectName;
    let projectCompletionElement = document.createElement("p");
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectCompletionElement);

    let addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-btn")
    addTaskBtn.textContent = "+";
    addTaskBtn.addEventListener('click', () => {
        pubsub.publish('showTaskForm', projectDetailsWrapper);
    });

    projectDetailsWrapper.appendChild(projectHeader);
    let deleteIcon = createDeleteIcon(projectDetailsWrapper);
    projectDetailsWrapper.appendChild(addTaskBtn);
    projectDiv.appendChild(projectDetailsWrapper);

    let childObjects = manageChildrenMixin(projectDetailsWrapper, deleteIcon);

    return {projectDiv, projectDetailsWrapper, deleteIcon, projectName, childObjects};
};

const createFullProject = (projectName) => {
    let basicProject = createBasicProject(projectName);
    basicProject.deleteIcon.addEventListener('click', () => {
        if (window.confirm("Do you really want to delete this project?")) {
            basicProject.projectDiv.remove();
            pubsub.publish('removeProject', basicProject);
        }
    });
    return basicProject;
}

const createDeleteIcon = (iconWrapper) => {
    let deleteIcon = document.createElement("span");
    deleteIcon.classList.add('material-icons');
    deleteIcon.classList.add('hidden');
    deleteIcon.textContent = "delete";
    iconWrapper.appendChild(deleteIcon); 
    return deleteIcon;
}

export default createFullProject;