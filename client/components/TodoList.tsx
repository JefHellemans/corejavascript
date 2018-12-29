import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";
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
                <input type="text" value={newTodo.description} onChange={this.updateNewTodo} />
                <button onClick={this.addTodo}>Add</button>
                {todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}
            </div>
        );
    }

    updateNewTodo = (event: React.ChangeEvent<HTMLInputElement>) =>
        this.props.todoState.newTodo.description = event.currentTarget.value;

    addTodo = () => this.props.todoState.addTodo();
}

type TodoProps = {
    todo: Todo;
};

@observer
class TodoItem extends React.Component<TodoProps> {
    render() {
        const { todo } = this.props;
        return (
            <div className={classNames(todo.id ? "saved" : "saving", "todo")}>
                <h2>{todo.description}</h2>
            </div>
        );
    }
}
