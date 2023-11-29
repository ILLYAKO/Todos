let tasks = [];
let taskInput = document.getElementById("inputTask");
console.log("taskInput: " + taskInput);
let ulTasks = document.getElementById("taskList");
console.log("Hello from main.js");
const addTask = () => {
    tasks.push(taskInput.value);
    taskInput.value = "";
    let stringLi = "";
    tasks.forEach((task) => {
        stringLi += `<li>${task}</li>`;
    });
    ulTasks.innerHTML = stringLi;
};
