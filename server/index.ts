import * as express from "express";
import * as bodyParser from "body-parser";
import { file, uuid } from "./helpers";

let todos: Todo[] = [
    {
        id: uuid(),
        description: "Add new todos",
        completed: false,
        assignee: "Me",
    }
];

const app = express();
app.use(bodyParser.json());
app.use("/client", express.static(file("./client/dist")))

app.get("/", (_req, res) => res.sendFile(file("./server/index.html")));
app.get("/todos", (_req, res) => res.send(todos));
app.post("/todos", (req, res) => {
    const id = uuid();
    const todo = { ...req.body, id } as Todo;
    todos.push(todo);
    res.send(todo);
});
app.put("/todos", (req, res) => {
    const todo = todos.find(todo => todo.id === req.body.id);
    Object.assign(todo, req.body);
    res.send(todo);
});
app.delete("/todos", (req, res) => {
    todos = todos.filter(todo => todo.id !== req.body.id);
    res.sendStatus(200);
});

app.listen(3000, () => console.log("server started"));
