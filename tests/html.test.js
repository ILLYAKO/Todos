// main.test.js
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
require("@testing-library/jest-dom");

// Mock localStorage
const mockLocalStorage = {
    getItem: jest.fn((key) => {
        return key === "myTasks"
            ? `[{"id":1701651117090,"todo":"Task 1","completed":false,"userId":12},{"id":1701651120147,"todo":"Task 2","completed":false,"userId":12}]`
            : null; // default value for "myTasks"
    }),
    setItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = mockLocalStorage;

// Read the HTML file content
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

// Set up a fake DOM environment
const dom = new JSDOM(html);
global.document = dom.window.document;

// Include JavaScript file
require("../js/main.js");

// test
test("Check the presence of page title", () => {
    const title = document.title;
    expect(title).toBeDefined();
    expect(title).toContain("Todo");
});

test("Check the presence of Todo List heading", () => {
    const h3Element = document.querySelector("h3");
    expect(h3Element.textContent).toBe("Todo List");
});

test("Check the presence of input task form", () => {
    const formElement = document.getElementById("addTaskForm");
    expect(formElement).toBeInTheDocument();
});

test("Check the presence of input field", () => {
    const inputNewTodo = document.getElementById("inputTask");
    expect(inputNewTodo).toBeInTheDocument();
    expect(inputNewTodo).toHaveAttribute("type", "text");
    expect(inputNewTodo).toHaveValue("");
    expect(inputNewTodo.placeholder).toBe("Add task here.");
});

test("Check the presence of button in form", () => {
    const buttonAddTask = document.getElementsByTagName("button")[0];
    expect(buttonAddTask).toBeInTheDocument();
    expect(buttonAddTask).toHaveAttribute("type", "button");
    expect(buttonAddTask).toHaveAttribute("onclick", "addTask()");
    expect(buttonAddTask.onclick).toBeDefined();
    expect(buttonAddTask.textContent).toBe("Add Task");
});
