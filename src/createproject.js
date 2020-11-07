const createProject = (project) => {
    let projectDiv = document.createElement("div");

    let projectHeader = document.createElement("div");
    let projectTitle = document.createElement("h2");
    projectTitle.textContent = project;
    let projectCompletionElement = document.createElement("p");
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectCompletionElement);

    let addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "+";

    projectDiv.appendChild(projectHeader);
    projectDiv.appendChild(addTaskBtn);

    return projectDiv;
}

export default createProject;