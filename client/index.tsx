import * as  React from "react";
import * as ReactDOM from "react-dom";

import { TodoState } from "./state";
import { TodoList } from "./components/TodoList";

require("./index.scss");

const todoState = new TodoState();

ReactDOM.render(
    <>
        <h1>Todos</h1>
        <TodoList todoState={todoState} />
    </>,
    document.getElementById("app")
);
