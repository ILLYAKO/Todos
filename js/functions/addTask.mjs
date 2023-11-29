const addTask = () => {
    tasks.push(taskInput.value);
    taskInput.value = "";
    let stringLi = "";
    tasks.forEach((task) => {
        stringLi += `<li>${task}</li>`;
    });
    ulTasks.innerHTML = stringLi;
};
