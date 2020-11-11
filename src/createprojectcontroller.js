import createFullProject from "./createproject";
import pubsub from "./pubsub";
import dom from "./dom";

const createProjectController = () => {
    //TO DO- create a form and just hide and show it when create project button is pressed
    let projectFormDOM = document.getElementsByClassName("project-form-wrapper")[0];
    let createProjectForm = document.getElementById("create-project-form");

    const showProjectForm = () => {
        projectFormDOM.classList.remove('hidden');
    }

    const createProject = (projectFormData) => {
        let createdProject = createFullProject(projectFormData.elements[0].value);
        dom.getPageContainer().appendChild(createdProject);
    } 
    
    let addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.addEventListener('click', showProjectForm);
    createProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        pubsub.publish('createProject', createProjectForm);
    });

    pubsub.subscribe('createProject', createProject);
};

export default createProjectController;