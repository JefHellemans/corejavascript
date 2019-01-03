import { computed, observable } from "mobx";
import { get, post, put, remove } from "../helpers/api";

const blankTodo = { description: "", completed: false };

export class TodoState {
    @observable todos: Todo[] = [];
    @observable newTodo: Todo = { ...blankTodo };
    @observable filters = {
        completed: false,
        uncompleted: true,
    };

    @computed
    get displayedTodos() {
        return this.todos.filter(todo =>
            (todo.completed && this.filters.completed) ||
            (!todo.completed && this.filters.uncompleted)
        );
    }

    constructor() {
        this.getTodos();
    }

    async getTodos() {
        const todos = await get<Todo[]>("/todos");
        todos.forEach(todo => todo.due = todo.due && new Date(todo.due));
        this.todos = todos;
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
