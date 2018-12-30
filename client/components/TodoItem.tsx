import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";

import { Checkbox, TextInput } from "../uikit";

type Props = {
    todo: Todo;
    onRemove: (todo: Todo) => void;
    onSave: (todo: Todo) => void;
};

@observer
export class TodoItem extends React.Component<Props> {
    render() {
        const { todo } = this.props;
        return (
            <div className={classNames("todo", { "saving": !todo.id })}>
                <Checkbox value={todo.completed} onToggle={this.toggleCompleted} />
                <div className="inputs">
                    <TextInput
                        className="big"
                        placeholder="Todo Description"
                        value={todo.description}
                        onChange={this.setDescription}
                        onSave={this.save}
                    />
                    <div className="extra">
                        <TextInput
                            placeholder="Assignee"
                            value={todo.assignee}
                            onChange={this.setAssignee}
                            onSave={this.save}
                        />
                        <div className="datetime">
                            <span>Due Date:</span>
                            <input type="date" value={this.formatDate()} onChange={this.setDueDate} />
                        </div>
                    </div>
                </div>
                <button onClick={this.remove}>Delete</button>
            </div>
        );
    }

    formatDate(): string {
        const { due } = this.props.todo;

        if (!due) {
            return "";
        }

        const year = due.getFullYear();
        const month = due.getMonth() + 1; // getMonth is 0-based
        const day = due.getDate();

        return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
    }

    remove = () => this.props.onRemove(this.props.todo);
    save = () => this.props.onSave(this.props.todo);
    toggleCompleted = () => {
        this.props.todo.completed = !this.props.todo.completed;
        this.save();
    };
    setDescription = (value: string) => this.props.todo.description = value;
    setAssignee = (value: string) => this.props.todo.assignee = value;
    setDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.todo.due = new Date(event.currentTarget.value);
        this.save();
    }
}
