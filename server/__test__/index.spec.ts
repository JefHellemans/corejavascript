import { todos, generateTodo } from "../index";

describe("generateTodo", () => {
    it("should add a new todo to the todo list", () => {
        const previousLength = todos.length;
        generateTodo("My new todo");
        expect(todos.length).toBe(previousLength + 1);
        expect(todos[todos.length - 1].description).toBe("My new todo");
    });
});
