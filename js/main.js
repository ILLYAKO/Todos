debugger;
let localTasks = localStorage.getItem("myTasks");
let tasks = localTasks ? localTasks.split(",") : [];
let formElement = document.getElementById("addTaskForm");
let taskInput = document.getElementById("inputTask");

const editTask = (id) => {
    console.log("Edit");
};

const deleteTask = (id) => {
    console.log("Delete");
};

const addTask = () => {
    tasks.push(taskInput.value);
    taskInput.value = "";
    localStorage.setItem("myTasks", tasks);
    renderList();
};

const renderList = () => {
    if (tasks.length == 0) {
        return;
    }

    if (document.getElementById("ulTasks")) {
        document.getElementById("ulTasks").outerHTML = "";
    }

    const ulElement = document.createElement("ul");
    ulElement.setAttribute("id", "ulTasks");
    formElement.insertAdjacentElement("afterend", ulElement);

    tasks.forEach((task) => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "checkboxName";
        checkbox.value = "checkboxValue";
        checkbox.id = "checkboxId";

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.name = "editBtnName";
        editBtn.value = "editBtnValue";
        editBtn.id = "editBtnId";
        editBtn.onclick = () => editTask();
        editBtn.appendChild(document.createTextNode("Edit"));

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.name = "deleteBtnName";
        deleteBtn.value = "deleteBtnValue";
        deleteBtn.id = "deleteBtnId";
        deleteBtn.onclick = () => deleteTask();
        deleteBtn.appendChild(document.createTextNode("Delete"));

        let liElement = document.createElement("li");
        liElement.id = "liElementId";
        liElement.appendChild(checkbox);
        liElement.appendChild(document.createTextNode(task));
        liElement.appendChild(editBtn);
        liElement.appendChild(deleteBtn);

        ulElement.appendChild(liElement);
    });
};

renderList();
