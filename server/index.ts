import * as express from "express";
import * as bodyParser from "body-parser";

import { file, uuid } from "./helpers";

export let todos: Todo[] = [
    {
        id: uuid(),
        description: "Add new todos",
        completed: false,
        assignee: "Me",
        due: null,
    }
];

export function generateTodo(description: string) {
    todos.push({
        id: uuid(),
        description,
        completed: false,
        due: null,
    });
}

const app = express();
app.use(bodyParser.json());
app.use("/client", express.static(file("./client/dist")))

app.get("/", (_req, res) => res.sendFile(file("./server/index.html")));
// the order for both nextTick and setImmediate is the same
// the difference is that setImmediate is called when the I/O loop is idle
// nextTick is called on the next tick, without any regard for the I/O loop
// come to think of it, "now" is not a great name, but it indicates that we have more certainty over the timing of these calls
app.get("/generate-now", (_req, res) => {
    process.nextTick(() => {
        process.nextTick(() => generateTodo("Quickly generated 3"));
        process.nextTick(() => generateTodo("Quickly generated 4"));
        generateTodo("Quickly generated 1");
    });
    process.nextTick(() => {
        process.nextTick(() => generateTodo("Quickly generated 5"));
        process.nextTick(() => { generateTodo("Quickly generated 6"); res.sendStatus(200); });
        generateTodo("Quickly generated 2");
    });
});
app.get("/generate-soon", (_req, res) => {
    setImmediate(() => {
        setImmediate(() => generateTodo("Soon generated 3"));
        setImmediate(() => generateTodo("Soon generated 4"));
        generateTodo("Soon generated 1");
    });
    setImmediate(() => {
        setImmediate(() => generateTodo("Soon generated 5"));
        setImmediate(() => generateTodo("Soon generated 6"));
        generateTodo("Soon generated 2");
    });
    res.sendStatus(200);
});
app.get("/todos", (_req, res) => res.send(todos));
app.post("/todos", (req, res) => {
    const id = uuid();
    const todo = { ...req.body, id } as Todo;
    todos.push(todo);
    res.send(todo);
});
app.put("/todos", (req, res) => {
    const newValues = { ...req.body };
    const todo = todos.find(todo => todo.id === newValues.id);
    newValues.date = newValues.date && new Date(newValues.date);
    Object.assign(todo, newValues);
    res.send(todo);
});
app.delete("/todos", (req, res) => {
    todos = todos.filter(todo => todo.id !== req.body.id);
    res.sendStatus(200);
});

if (!process.env.JEST_WORKER_ID) {
    app.listen(3000, () => console.log("server started"));
}
