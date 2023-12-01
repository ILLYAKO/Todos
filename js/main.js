// https://dummyjson.com/docs/todos

// const localTasks = localStorage.getItem("myTasks");

// const tasks = localTasks ? localTasks.split(",") : [];
let tasks = [];

const formElement = document.getElementById("addTaskForm");
const taskInput = document.getElementById("inputTask");

const editTask = (id) => {
    console.log("Edit");
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
    // localStorage.setItem("myTasks", tasks);
    renderList();
};

const renderList = () => {
    // debugger;
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
        checkbox.className = "checkbox-el";
        checkbox.onchange = () => onchangeCheckBox(task.id);

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.name = "editBtnName";
        editBtn.value = "editBtnValue";
        editBtn.id = "editBtnId";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask();
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

// const fakeTodo = fetch("https://dummyjson.com/todos?limit=5&skip=10")
//     .then((response) => response.json())
//     .then((json) => console.log(json));
