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

// Import the functions to be tested
const {
    saveChange,
    showModal,
    editTask,
    deleteTask,
    onchangeCheckBox,
    addTask,
    renderList,
} = require("../js/main.js"); // Assuming your main script is in a file named 'app.js'

describe("Test Todo App js/main.js", () => {
    let tasks;

    beforeEach(() => {
        // Reset tasks before each test
        tasks = [];
    });

    test("saveChange function updates task text", () => {
        console.log(typeof saveChange);
        // // Call saveChange with a task
        // saveChange({ id: 12, todo: "Task 1", completed: false, userId: 12 });
        // // Assertions
        // // For example, you might check if tasks were updated and renderList was called
        // expect(tasks).toEqual(
        //     expect.arrayContaining([{ id: 12, todo: expect.any(String) }])
        // );
        // You should add more specific assertions based on your actual code
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
});
