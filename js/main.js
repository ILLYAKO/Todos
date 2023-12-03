const loadDumyTodos = async () => {
    const response = await fetch("https://dummyjson.com/todos?limit=5&skip=1");
    return response.json();
};

let isFirstLoad = true;
const firstFunction = async () => {
    try {
        let obj = await loadDumyTodos();
        let tempArray = obj.todos;
        return tempArray;
    } catch (error) {
        console.log("Error: " + error);
    }
};

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

const formElement = document.getElementById("addTaskForm");
const taskInput = document.getElementById("inputTask");
const myModal = document.createElement("div");

const saveChange = (t) => {
    taskText = myModal.firstChild.firstChild.value;
    tasks = tasks.map((task) => {
        return task.id !== t.id ? task : { ...task, todo: taskText };
    });
    myModal.outerHTML = "";
    myModal.innerHTML = "";
    renderList();
};

const showModal = (task) => {
    const taskInput = document.createElement("input");
    taskInput.setAttribute("id", "inputEdit");
    taskInput.value = task.todo;

    const btn = document.createElement("button");
    btn.innerHTML = "Save";
    btn.setAttribute("type", "button");
    btn.onclick = () => saveChange(task);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.appendChild(taskInput);
    modalContent.appendChild(btn);

    // myModal setup
    myModal.setAttribute("id", "myModal");
    myModal.className = "modal";
    myModal.appendChild(modalContent);
    formElement.insertAdjacentElement("beforebegin", myModal);
    myModal.style.display = "block";
};

const editTask = (task) => {
    showModal(task);
    renderList();
};

const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderList();
};

const onchangeCheckBox = (id) => {
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

    renderList();
};

const addTask = () => {
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
    taskInput.placeholder = 'Add task here.';
    renderList();
};

const renderList = async () => {
    if (document.getElementById("ulTasks")) {
        document.getElementById("ulTasks").outerHTML = "";
    }
    if (isFirstLoad) {
        tasks = await firstFunction();
        isFirstLoad = !isFirstLoad;
    }
    if (tasks.length == 0) {
        localStorage.removeItem("myTasks");
        return;
    }

    localStorage.setItem("myTasks", JSON.stringify(tasks));

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

        checkbox.onchange = () => onchangeCheckBox(task.id);

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.name = "editBtnName";
        editBtn.value = "editBtnValue";
        editBtn.id = "editBtnId";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask(task);
        editBtn.appendChild(document.createTextNode("Edit"));

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.name = "deleteBtnName";
        deleteBtn.value = "deleteBtnValue";
        deleteBtn.id = "deleteBtnId";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(task.id);
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

renderList();
