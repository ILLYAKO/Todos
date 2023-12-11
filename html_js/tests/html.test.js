const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
require("@testing-library/jest-dom");

// Read the HTML file content
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

// Set up a fake DOM environment
const dom = new JSDOM(html);
global.document = dom.window.document;

describe("Test Todo App index.js", () => {
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
        const buttonAddTask = document.getElementById("addTaskButton");
        expect(buttonAddTask).toBeInTheDocument();
        expect(buttonAddTask).toHaveAttribute("type", "button");
    });

    test("Check the presence of script in form", () => {
        const scriptElement = document.querySelector(
            'script[src="./js/main.js"]'
        );
        expect(scriptElement).not.toBeNull();
        expect(scriptElement).toBeInTheDocument();
    });
});
