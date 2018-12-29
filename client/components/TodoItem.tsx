import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";

import { Checkbox } from "./Checkbox";
import { DateTimeInput } from "./DateTimeInput";
import { TextInput } from "./TextInput";

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
            <div className={classNames({ "saving": !todo.id }, "todo")}>
                <Checkbox value={todo.completed} onToggle={this.toggleCompleted} />
                <div className="inputs">
                    <TextInput className="big" placeholder="Todo Description" value={todo.description} onChange={this.setDescription} onSave={this.save} />
                    <TextInput placeholder="Assignee" value={todo.assignee} onChange={this.setAssignee} onSave={this.save} />
                    <DateTimeInput value={todo.due} />
                </div>
                <button onClick={this.remove}>Delete</button>
            </div>
        );
    }

    remove = () => this.props.onRemove(this.props.todo);
    save = () => this.props.onSave(this.props.todo);
    toggleCompleted = () => {
        this.props.todo.completed = !this.props.todo.completed;
        this.save();
    };
    setDescription = (value: string) => this.props.todo.description = value;
    setAssignee = (value: string) => this.props.todo.assignee = value;
}
