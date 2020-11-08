const dom = (() => {
    let targetedProject;

    const setTargetedProject = (target) => {
        targetedProject = target;
    }

    const getTargetedProject = () => {
        return targetedProject;
    }

    return {setTargetedProject, getTargetedProject};
})();

export default dom;