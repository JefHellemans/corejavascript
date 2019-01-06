import * as  React from "react";
import * as ReactDOM from "react-dom";

import { TodoState } from "./state";
import { TodoList } from "./components/TodoList";

import * as styles from "./index.scss";

const todoState = new TodoState();

ReactDOM.render(
    <>
        <h1>Todos</h1>
        <div className={styles.header}>
            <button onClick={todoState.generateNow}>Generate todo NOW!</button>
            <button onClick={todoState.generateSoon}>Generate todo when idle!</button>
        </div>
        <TodoList todoState={todoState} />
    </>,
    document.getElementById("app")
);
