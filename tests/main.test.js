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
const mockLocalStorage = {
    getItem: jest.fn((key) => {
        return key === "myTasks"
            ? `[{"id":1701651117090,"todo":"Task 1","completed":false,"userId":12},{"id":1701651120147,"todo":"Task 2","completed":false,"userId":12}]`
            : null; // default value for "myTasks"
    }),
    setItem: jest.fn(),
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
    });

    afterEach(() => {});

    test("saveChange function updates task text", () => {
        console.log("saveChange()");
    });

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
        // Your test logic here for the renderList function
    });
    test("should render an empty task list", () => {
        // Calling the renderList function
        renderList();

        // Expectations
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("myTasks");
        expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
        expect(document.getElementById("ulTasks")).toBeNull();
    });
});
