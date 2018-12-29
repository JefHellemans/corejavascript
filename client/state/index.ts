import { observable } from "mobx";
import { get, post, put, remove } from "../api";

const blankTodo = { description: "", completed: false };

export class TodoState {
    @observable todos: Todo[] = [];
    @observable newTodo: Todo = { ...blankTodo };

    constructor() {
        this.getTodos();
    }

    async getTodos() {
        this.todos = await get<Todo[]>("/todos");
    }

    async addTodo() {
        post<Todo>("/todos", this.newTodo, this.todos);
        this.newTodo = { ...blankTodo };
    }

    async removeTodo(todo: Todo) {
        remove("/todos", todo);
        this.todos = this.todos.filter(t => t.id !== todo.id);
    }

    async saveTodo(todo: Todo) {
        put("/todos", todo);
    }
}
