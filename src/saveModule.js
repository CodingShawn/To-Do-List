import dom from './dom.js'
import pubsub from './pubsub'

const saveModule = ((projectController) => {
    function updateStorage() {
        localStorage.setItem('to-do-list', JSON.stringify(projectController.projects));
    }
    
    function loadStorage(){
        if (localStorage.getItem('to-do-list')){
            let toLoadProjects = JSON.parse(localStorage.getItem('to-do-list'));
            for (let project of toLoadProjects) {
                let currentLoadingProject = projectController.createProject(project.projectName);
                dom.setTargetedProject(currentLoadingProject.projectDetailsWrapper);
                for (let task of project.childObjects) {
                    pubsub.publish('loadTask', task);
                }
            }
        }
    }
    
    window.addEventListener('load', loadStorage);
    window.addEventListener('unload', updateStorage);
});

export default saveModule;

