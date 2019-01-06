import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";

import * as styles from "./TodoItem.scss";

import { dateTimeToString } from "../helpers/date";
import { TodoState } from "../state";
import { Checkbox, CheckboxStyles, TextInput, TextInputStyles } from "../uikit";

type Props = {
    todo: Todo;
    todoState: TodoState;
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
                            <span>Due Date:</span>
                            <input className={styles.dueDateInput} type="datetime-local" value={dateTimeToString(todo.due)} onChange={this.setDueDate} />
                            {!!todo.id && !todo.completed && todo.due && <Checkbox className={CheckboxStyles.small} value={!!todo.reminder} label="Remind me" onToggle={this.toggleReminder} />}
                        </div>
                    </div>
                </div>
                <button onClick={this.remove}>Delete</button>
            </div>
        );
    }

    remove = () => this.props.todoState.removeTodo(this.props.todo);
    save = () => this.props.todoState.saveTodo(this.props.todo);
    toggleCompleted = () => this.props.todoState.toggleCompleted(this.props.todo);
    setDescription = (value: string) => this.props.todo.description = value;
    setAssignee = (value: string) => this.props.todo.assignee = value;
    setDueDate = (event: React.ChangeEvent<HTMLInputElement>) => this.props.todoState.setDueDate(this.props.todo, event.currentTarget.value);
    toggleReminder = () => this.props.todoState.toggleReminder(this.props.todo);
}
