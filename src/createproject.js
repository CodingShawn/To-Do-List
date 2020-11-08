import manageChildrenMixin from './managechildrenmixin.js'
const { default: pubsub } = require("./pubsub")

const createBasicProject = (project) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project-wrapper")

    let projectDetailsWrapper = document.createElement("div");
    projectDetailsWrapper.classList.add("project-details");

    let projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    let projectTitle = document.createElement("h2");
    projectTitle.textContent = project;
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
    projectDetailsWrapper.appendChild(addTaskBtn);
    projectDiv.appendChild(projectDetailsWrapper);

    return {projectDiv, projectDetailsWrapper};
};

const fullProject = (project) => {
    let basicProject = createBasicProject(project);
    manageChildrenMixin(basicProject.projectDetailsWrapper);

    return basicProject.projectDiv;
}

export default fullProject;