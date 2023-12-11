let tasks = [];

if (typeof localStorage !== "undefined") {
    tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
}

const formElement = document.getElementById("addTaskForm");
const taskInput = document.getElementById("inputTask");
const myModal = document.createElement("div");
const addTaskButton = document.getElementById("addTaskButton");

addTaskButton.addEventListener("click", () => addTask(tasks));

const saveChange = (tasks, id) => {
    taskText = myModal.firstChild.firstChild.value;
    tasks = tasks.map((item) => {
        return item.id !== id ? item : { item, todo: taskText };
    });
    myModal.outerHTML = "";
    myModal.innerHTML = "";

    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderList(tasks);
};

const showModal = (tasks, task) => {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("id", "inputEdit");
    taskInput.value = task.todo;

    const btn = document.createElement("button");
    btn.innerHTML = "Save";
    btn.setAttribute("type", "button");
    btn.onclick = () => saveChange(tasks, task.id);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.appendChild(taskInput);
    modalContent.appendChild(btn);

    myModal.setAttribute("id", "myModal");
    myModal.className = "modal";
    myModal.appendChild(modalContent);
    formElement.insertAdjacentElement("beforebegin", myModal);
    myModal.style.display = "block";
};

const editTask = (tasks, task) => {
    showModal(tasks, task);

    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderList(tasks);
};

const deleteTask = (tasks, id) => {
    tasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderList(tasks);
};

const onchangeCheckBox = (tasks, id) => {
    debugger;
    let tempItem = null;
    let index = null;

    tasks.forEach((element, i) => {
        if (element.id === id) {
            tempItem = { ...element, completed: !element.completed };
            index = i;
        }
    });

    tasks.splice(index, 1);
    tasks.push(tempItem);

    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderList(tasks);
};

const addTask = (tasks) => {
    if (taskInput.value === "") {
        taskInput.placeholder = "PLEASE INSERT TASK!!!";
        return;
    }
    const newTask = {
        id: Date.now(),
        todo: "",
        completed: false,
        userId: 12,
    };

    tasks.push({ ...newTask, todo: taskInput.value });
    taskInput.value = "";
    taskInput.placeholder = "Add task here.";
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderList(tasks);
};

const renderList = (tasks) => {
    if (document.getElementById("ulTasks")) {
        document.getElementById("ulTasks").outerHTML = "";
    }

    if (tasks.length == 0) {
        localStorage.removeItem("myTasks");
        return;
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
        checkbox.className = "checkbox-el";
        task.completed ? (checkbox.checked = true) : "";

        checkbox.onchange = () => onchangeCheckBox(tasks, task.id);

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.name = "editBtnName";
        editBtn.value = "editBtnValue";
        editBtn.id = "editBtnId";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask(tasks, task);
        editBtn.appendChild(document.createTextNode("Edit"));

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.name = "deleteBtnName";
        deleteBtn.value = "deleteBtnValue";
        deleteBtn.id = "deleteBtnId";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(tasks, task.id);
        deleteBtn.appendChild(document.createTextNode("Delete"));

        let spanElement = document.createElement("span");
        spanElement.className = "span-todo";
        spanElement.appendChild(document.createTextNode(task.todo));
        !task.completed
            ? ""
            : (spanElement.style = "text-decoration: line-through;");

        let liElement = document.createElement("li");
        liElement.id = task.id;
        liElement.appendChild(checkbox);
        liElement.appendChild(spanElement);
        liElement.appendChild(editBtn);
        liElement.appendChild(deleteBtn);
        liElement.className = "li-todo";

        ulElement.appendChild(liElement);
    });
};

renderList(tasks);

module.exports = {
    saveChange,
    showModal,
    editTask,
    deleteTask,
    onchangeCheckBox,
    addTask,
    renderList,
};
