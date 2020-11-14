import dom from "./dom";
import pubsub from "./pubsub";

const manageChildrenMixin = (parentNode, deleteIcon) => {
    let childObjects = [];

    let childObjectsWrapper = document.createElement("div");
    parentNode.parentNode.append(childObjectsWrapper);
    childObjectsWrapper.classList.add('tasks-wrapper');

    const addObject = (childObject) => {
        childObjectsWrapper.appendChild(childObject);
    };

    const removeObject = (childObject) => {
        childObjects.pop(childObject);
    }

    const showChildObjects = () => {
        childObjectsWrapper.classList.remove('hidden');
        deleteIcon.classList.remove('hidden');
    };

    const hideChildObjects = () => {
        childObjectsWrapper.classList.add('hidden');
        deleteIcon.classList.add('hidden');
    };

    const eventListener = (() => {
        parentNode.addEventListener('click', (event) => {
            if (event.target.tagName !== "BUTTON" && event.target.tagName !== "SPAN") {
                if (deleteIcon.classList.contains('hidden')) {
                    showChildObjects();
                } else {
                    hideChildObjects();
                }
            }
        })
    })();

    pubsub.subscribe('addTaskToProject', (task) => {
        if (dom.getTargetedProject() === parentNode) {
            addObject(task);
            showChildObjects();
        }
    });

    pubsub.subscribe('saveTaskInfo', (taskInfo) => {
        if (dom.getTargetedProject() === parentNode) {
            childObjects.push(taskInfo)
        }
    })

    return childObjects;
}

export default manageChildrenMixin;