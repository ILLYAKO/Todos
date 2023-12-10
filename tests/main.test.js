const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
require("@testing-library/jest-dom");

// Read the HTML file content
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

// Set up a fake DOM environment
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;

// Mock localStorage
mockLocalStorage = {
    getItem: jest.fn((key) => {
        return key === "myTasks"
            ? `[{"id":1701651117090,"todo":"Task 1","completed":false,"userId":12},{"id":1701651120147,"todo":"Task 2","completed":false,"userId":12}]`
            : null; // default value for "myTasks"
    }),
    setItem: jest.fn(),
    // (keyName, keyValue) => {return `${keyName}, ${keyValue}`;}
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = mockLocalStorage;

// Import the functions to be tested
const {
    saveChange,
    showModal,
    editTask,
    deleteTask,
    onchangeCheckBox,
    addTask,
    renderList,
} = require("../js/main.js");

describe("Test Todo App js/main.js", () => {
    let tasks;

    beforeEach(() => {
        // Reset tasks before each test
        tasks = [];
        // // Check if localStorage is available (e.g., in a browser or JSDOM environment)
        // if (typeof localStorage !== "undefined") {
        //     tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
        // }
    });

    afterEach(() => {});

    test("saveChange function updates task text", () => {});

    test("showModal displays modal with task input", () => {
        // Your test logic here for the showModal function
    });

    test("editTask calls showModal and renderList", () => {
        // Your test logic here for the editTask function
    });

    test("deleteTask removes task from tasks and calls renderList", () => {
        // Your test logic here for the deleteTask function
    });

    test("onchangeCheckBox updates completed status and calls renderList", () => {
        // Your test logic here for the onchangeCheckBox function
    });

    test("addTask adds a new task and calls renderList", () => {
        // Your test logic here for the addTask function
    });

    test("renderList updates the DOM with tasks", () => {
        // Mocking tasks with one task
        const tasks = [
            {
                id: 1,
                todo: "Example Task",
                completed: false,
                userId: 12,
            },
        ];
        // Calling the renderList function with tasks
        renderList(tasks);

        // Check that ulTasks element is present in the DOM
        const ulElement = document.getElementById("ulTasks");
        expect(ulElement).not.toBeNull();

        // Verify that the list contains the rendered task
        const liElement = document.getElementById(String(tasks[0].id));
        expect(liElement).not.toBeNull();
        expect(liElement.tagName.toLowerCase()).toBe("li");
        expect(liElement.childElementCount).toBe(4);
        // Check input checkbox
        expect(liElement.children[0].tagName.toLowerCase()).toBe("input");
        expect(liElement.children[0]).toHaveAttribute("type", "checkbox");
        // Check span
        expect(liElement.children[1].tagName.toLowerCase()).toBe("span");
        // Check button Edit
        expect(liElement.children[2].tagName.toLowerCase()).toBe("button");
        expect(typeof liElement.children[2].onclick).toBe("function");
        expect(liElement.children[2].textContent).toBe("Edit");
        // Check button Delete
        expect(liElement.children[3].tagName.toLowerCase()).toBe("button");
        expect(typeof liElement.children[3].onclick).toBe("function");
        expect(liElement.children[3].textContent).toBe("Delete");
    });

    test("should render an empty task list", () => {
        // Calling the renderList function
        renderList(tasks);

        // Expectations
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("myTasks");
        expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
        expect(document.getElementById("ulTasks")).toBeNull();
    });
});
