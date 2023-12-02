// https://dummyjson.com/docs/todos
const fakeTodos = fetch("https://dummyjson.com/todos?limit=5&skip=10");
// .then((response) => response.json());
// .then((json) => console.log(json));

let tasks = JSON.parse(localStorage.getItem("myTasks") || "[]");

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
    tasks = tasks.map((task) =>
        task.id !== id ? task : { ...task, completed: !task.completed }
    );
    renderList();
};

const addTask = () => {
    const newTask = {
        userId: 12,
        id: Date.now(),
        todo: "",
        completed: false,
    };

    tasks.push({ ...newTask, todo: taskInput.value });
    taskInput.value = "";
    renderList();
};

const renderList = () => {
    if (document.getElementById("ulTasks")) {
        document.getElementById("ulTasks").outerHTML = "";
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
