const createProject = (project) => {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project-wrapper")

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

    projectDiv.appendChild(projectHeader);
    projectDiv.appendChild(addTaskBtn);

    return projectDiv;
}

export default createProject;