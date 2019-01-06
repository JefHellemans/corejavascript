import { computed, observable, IObservableArray } from "mobx";
import { get, post, put, remove } from "../helpers/api";

const blankTodo = { description: "", completed: false, due: null };
const POLL_INTERVAL = 5000; // every 5 seconds

export class TodoState {
    @observable todos: Todo[] = [];
    private reminders: { [key: string]: NodeJS.Timeout } = {};
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
        // use bind to prevent the "this" problem (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem)
        setInterval(this.getTodos.bind(this), POLL_INTERVAL);
    }

    generateNow = async () => {
        // the API ensures this todo is generated quickly, so we fetch it immediately
        await fetch("/generate-now");
        this.getTodos();
    }

    generateSoon() {
        // the API promises to generate this todo when it has no other work to do, it will (most likely) be picked up on the next poll request
        fetch("/generate-soon");
    }

    async getTodos() {
        const todos = await get<Todo[]>("/todos");
        todos.forEach(todo => {
            todo.due = todo.due && new Date(todo.due);
            if (todo.reminder) {
                if (this.reminders[todo.id!]) {
                    this.clearReminder(todo);
                }
                this.setReminder(todo);
            }
        });
        (this.todos as IObservableArray<Todo>).replace(todos);
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

    toggleCompleted(todo: Todo) {
        todo.completed = !todo.completed;
        if (todo.reminder) {
            this.clearReminder(todo);
        }
        this.saveTodo(todo);
    }

    setDueDate(todo: Todo, value: string) {
        todo.due = !!value ? new Date(value) : null;
        if (todo.reminder) {
            this.clearReminder(todo);
        }
        this.saveTodo(todo);
    }

    toggleReminder(todo: Todo) {
        if (!todo.id) {
            throw new Error("Cannot set reminder for todo that has no id.");
        }
        if (!this.reminders[todo.id] && !todo.reminder) {
            this.setReminder(todo);
        } else {
            this.clearReminder(todo);
        }
        this.saveTodo(todo);
    }

    private setReminder(todo: Todo) {
        if (!todo.due) {
            throw new Error("Cannot set reminder for todo that has no due date.");
        }
        todo.reminder = true;
        this.reminders[todo.id!] = setTimeout(() => this.triggerReminder(todo), todo.due.getTime() - Date.now());
    }

    private clearReminder(todo: Todo) {
        todo.reminder = false;
        clearTimeout(this.reminders[todo.id!]);
        delete this.reminders[todo.id!];
    }

    private triggerReminder(todo: Todo) {
        const message = todo.assignee ?
            `${todo.assignee} should have finished "${todo.description}" by now.` :
            `"${todo.description}" should have been finished by now.`;
        if (confirm(`${message} Mark it as completed?`)) {
            todo.completed = true;
        }
        this.clearReminder(todo);
        this.saveTodo(todo);
    }
}
