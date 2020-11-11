const dom = (() => {
    let targetedProject;

    const setTargetedProject = (target) => {
        targetedProject = target;
    }

    const getTargetedProject = () => {
        return targetedProject;
    }

    const pageContainer = document.getElementById("container");

    const getPageContainer = () => {
        return pageContainer;
    }

    return {setTargetedProject, getTargetedProject, getPageContainer};
})();

export default dom;