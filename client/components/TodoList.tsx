import * as React from "react";
import { observer } from "mobx-react";

import { TodoItem } from "./TodoItem";

import { TodoState } from "../state";
import { Checkbox, TextInput } from "../uikit";

type Props = {
    todoState: TodoState;
};

@observer
export class TodoList extends React.Component<Props> {
    render() {
        const { displayedTodos, filters, newTodo } = this.props.todoState;
        return (
            <div>
                <Checkbox value={filters.completed} label="Completed" onToggle={this.toggleCompleted} />
                <Checkbox value={filters.uncompleted} label="Uncompleted" onToggle={this.toggleUncompleted} />
                <TextInput
                    className={["big", "no-underline"]}
                    placeholder="New Todo"
                    value={newTodo.description}
                    onChange={this.updateNewTodo}
                    onSave={this.addTodo}
                />
                <div className="line" />
                {displayedTodos.map((todo, index) =>
                    <TodoItem key={index} todo={todo} onRemove={this.removeTodo} onSave={this.saveTodo} />
                )}
            </div>
        );
    }

    toggleCompleted = () => this.props.todoState.filters.completed = !this.props.todoState.filters.completed;
    toggleUncompleted = () => this.props.todoState.filters.uncompleted = !this.props.todoState.filters.uncompleted;
    updateNewTodo = (value: string) => this.props.todoState.newTodo.description = value;
    addTodo = () => { if (this.props.todoState.newTodo.description) this.props.todoState.addTodo() };
    removeTodo = (todo: Todo) => this.props.todoState.removeTodo(todo);
    saveTodo = (todo: Todo) => this.props.todoState.saveTodo(todo);
}
