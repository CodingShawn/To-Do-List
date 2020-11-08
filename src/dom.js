const dom = (() => {
    let targetedTaskWrapper;

    const setTargetedTaskWrapper = (target) => {
        targetedTaskWrapper = target;
    }

    const getTargetedTaskWrapper = () => {
        return targetedTaskWrapper;
    }

    return {setTargetedTaskWrapper, getTargetedTaskWrapper};
})();

export default dom;