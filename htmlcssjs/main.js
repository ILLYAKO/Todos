debugger;
let tasks = [];
const ulTasks = document.getElementById("idUlList");
const todoInput = document.getElementById("todoInput");
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("addTaskBtn").click();
    }
});

const addTask = () => {
    const newTaskText = {
        id: Date.now(),
        name: todoInput.value,
        isChecked: false,
    };
    todoInput.value = "";

    tasks.push(newTaskText);

    let stringLi = "";

    tasks.forEach((element) => {
        stringLi += `<li id=${element.id}>
                        <input type="checkbox" ${
                            element.isChecked ? "checked" : ""
                        } onchange="changeCheckbox(this, ${element.id});">
                        <span ${
                            element.isChecked
                                ? 'style="text-decoration:line-through;"'
                                : ""
                        } ><strong>${element.name}</strong></span>
                        <button id="editTaskBtn" type="button" onclick="editTask(this,${
                            element.id
                        })">Edit</button>
                        <button id="removeTaskBtn" type="button" onclick="removeTask(${
                            element.id
                        })">Remove</button>
                        <hr/>
                        </li> `;
    });

    ulTasks.innerHTML = stringLi;
};

const changeCheckbox = (element, id) => {
    let checkboxStatus = element.checked;

    let currentLi = document.getElementById(id);
    checkboxStatus
        ? (currentLi.children[1].style.textDecorationLine = "line-through")
        : (currentLi.children[1].style.textDecorationLine = "");

    tasks = tasks.map((task) =>
        task.id !== id ? task : { ...task, isChecked: !task.isChecked }
    );
};

const editTask = (element, currentId) => {
    let currentLi = document.getElementById(currentId);
    currentLi.children[1].setAttribute("contenteditable", "true");
    currentLi.children[1].focus();
    currentLi.children[2].innerHTML = "Save";
    currentLi.children[2].setAttribute(
        "onclick",
        `saveTask(${currentId}, "${currentLi.children[1].children[0].innerHTML}")`
    );
};

const removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    document.getElementById(id).remove();
};

const saveTask = (id, text) => {
    tasks = tasks.map((task) =>
        task.id !== id ? task : { ...task, name: text }
    );

    let currentLi = document.getElementById(id);

    currentLi.children[2].innerHTML = "Edit";
    currentLi.children[2].setAttribute("onclick", `editTask(${id})`);
    currentLi.children[1].setAttribute("contenteditable", "false");
};
