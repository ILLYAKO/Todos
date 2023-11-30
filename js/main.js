let localTasks = localStorage.getItem("myTasks");
let tasks = localTasks ? localTasks.split(",") : [];
let formElement = document.getElementById("addTaskForm");
let taskInput = document.getElementById("inputTask");

const addTask = () => {
    tasks.push(taskInput.value);
    taskInput.value = "";
    localStorage.setItem("myTasks", tasks);
    renderList();
};

const renderList = () => {
    if (!tasks) {
        return;
    }

    if (document.getElementById("ulTasks")) {
        document.getElementById("ulTasks").outerHTML = "";
    }
    const ulElement = document.createElement("ul");
    ulElement.setAttribute("id", "ulTasks");
    formElement.insertAdjacentElement("afterend", ulElement);

    tasks.forEach((task) => {
        let liElement = document.createElement("li");
        liElement.appendChild(document.createTextNode(task));
        ulElement.appendChild(liElement);
    });
};

renderList();
