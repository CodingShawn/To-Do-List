import createFullProject from "./createproject";
import pubsub from "./pubsub";
import dom from "./dom";

const createProjectController = () => {
    let projects = [];

    let projectFormDOM = document.getElementsByClassName("project-form-wrapper")[0];
    let createProjectForm = document.getElementById("create-project-form");

    const showProjectForm = () => {
        projectFormDOM.classList.remove('hidden');
    }

    const hideProjectForm = () => {
        projectFormDOM.classList.add('hidden');
    }

    const createProject = (projectName) => {
        let createdProject = createFullProject(projectName);
        projects.push(createdProject);
        dom.getPageContainer().appendChild(createdProject.projectDiv);
        createProjectForm.reset();
        hideProjectForm();
        return createdProject;
    } 

    const removeProject = (project) => {
        let removeIndex;
        for (let index = 0; index < projects.length; index++) {
            if (project === projects[index]) {
                removeIndex = index;
                break;
            }
        }
        projects.splice(removeIndex, 1);
    }
    
    let addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.addEventListener('click', showProjectForm);
    createProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let projectName = createProjectForm.elements[0].value;
        pubsub.publish('createProject', projectName);
    });

    pubsub.subscribe('createProject', createProject);
    pubsub.subscribe('removeProject', removeProject);
    return {projects, createProject};
};

export default createProjectController;