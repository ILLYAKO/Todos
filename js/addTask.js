export default  addTask = () => {
    console.log("main- addTAsk");
    let input = document.querySelector("input#addTaskInput");
    let taskText = input.value;
    if (taskText) {
        tasks.unshift(taskText);
        input.value = null;
    } else {
        input.placeholder = "PLEASE ADD TASK!!!";
    }
};