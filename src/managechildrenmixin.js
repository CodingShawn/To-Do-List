import dom from "./dom";
import pubsub from "./pubsub";

const manageChildrenMixin = (parentNode) => {
    let childObjects = [];

    let childObjectsWrapper = document.createElement("div");
    parentNode.parentNode.append(childObjectsWrapper);
    childObjectsWrapper.classList.add('tasks-wrapper');

    const addObject = (childObject) => {
        childObjects.push(childObject);
        childObjectsWrapper.appendChild(childObject);
    };

    const removeObject = (childObject) => {
        childObjects.pop(childObject);
    }

    const showChildObjects = () => {
        childObjectsWrapper.classList.remove('hidden');
    };

    const hideChildObjects = () => {
        childObjectsWrapper.classList.add('hidden');
    };

    const eventListener = (() => {
        parentNode.addEventListener('click', (event) => {
            if (event.target.tagName !== "BUTTON") {
                if (childObjects.length !== 0 && childObjectsWrapper.classList.contains('hidden')) {
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
}

export default manageChildrenMixin;