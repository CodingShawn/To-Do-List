import createTaskController from './createtaskcontroller.js'
import createProjectController from './createprojectcontroller.js'
import saveModule from './saveModule.js'

createTaskController();
let projectController = createProjectController();
saveModule(projectController);