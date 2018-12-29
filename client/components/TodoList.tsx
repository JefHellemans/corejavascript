import * as React from "react";
import { observer } from "mobx-react";

import { TextInput } from "./TextInput";
import { TodoItem } from "./TodoItem";
import { TodoState } from "../state";

type Props = {
    todoState: TodoState;
};

@observer
export class TodoList extends React.Component<Props> {
    render() {
        const { todos, newTodo } = this.props.todoState;
        return (
            <div>
                {todos.map((todo, index) => <TodoItem key={index} todo={todo} onRemove={this.removeTodo} onSave={this.saveTodo} />)}
                <div className="line" />
                <TextInput className={["big", "no-underline"]} placeholder="New Todo" value={newTodo.description} onChange={this.updateNewTodo} onSave={this.addTodo} />
            </div>
        );
    }

    updateNewTodo = (value: string) => this.props.todoState.newTodo.description = value;
    addTodo = () => { if (this.props.todoState.newTodo.description) this.props.todoState.addTodo() };
    removeTodo = (todo: Todo) => this.props.todoState.removeTodo(todo);
    saveTodo = (todo: Todo) => this.props.todoState.saveTodo(todo);
}
