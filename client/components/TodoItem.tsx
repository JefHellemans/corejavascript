import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";

import * as styles from "./TodoItem.scss";

import { Checkbox, TextInput, TextInputStyles } from "../uikit";
import { dateTimeToString } from "../../helpers/date";

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
            <div className={classNames(styles.todo, { [styles.saving]: !todo.id })}>
                <Checkbox value={todo.completed} onToggle={this.toggleCompleted} />
                <div className={styles.inputs}>
                    <TextInput
                        className={classNames(styles.description, TextInputStyles.large)}
                        placeholder="Todo Description"
                        value={todo.description}
                        onChange={this.setDescription}
                        onSave={this.save}
                    />
                    <div className={styles.extra}>
                        <TextInput
                            placeholder="Assignee"
                            value={todo.assignee}
                            onChange={this.setAssignee}
                            onSave={this.save}
                        />
                        <div className={styles.dueDate}>
                            <span className={styles.dueDateLabel}>Due Date:</span>
                            <input type="datetime-local" value={dateTimeToString(todo.due)} onChange={this.setDueDate} />
                        </div>
                    </div>
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
    setDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.todo.due = new Date(event.currentTarget.value);
        this.save();
    }
}
