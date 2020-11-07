const manageChildrenMixin = (parentNode) => {
    let childObjects = [];

    let childObjectsWrapper = document.createElement("div");
    parentNode.parentNode.append(childObjectsWrapper);
    childObjectsWrapper.classList.add('tasks-wrapper');

    const addObject = (childObject) => {
        childObjects.push(childObject);
    };

    const removeObject = (childObject) => {
        childObjects.pop(childObject);
    }

    const showChildObjects = () => {
        for (let i=0; i < childObjects.length; i++) {
            childObjectsWrapper.appendChild(childObjects[i]);
        }
    };

    const hideChildObjects = () => {
        childObjectsWrapper.textContent = "";
    };

    const eventListener = (() => {
        parentNode.addEventListener('click', () => {
            if (childObjects.length !== 0 && childObjectsWrapper.textContent === "") {
                showChildObjects();
            } else {
                hideChildObjects();
            }
        })
    })();
}

export default manageChildrenMixin;