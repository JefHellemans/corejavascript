import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

const ROOT = path.join(__dirname, "../../");
const file = (filePath: string) => path.join(ROOT, filePath);

const app = express();
app.use(bodyParser.json());
app.use("/client", express.static(file("./client/dist")))

app.get("/", (_req, res) => {
    res.sendFile(file("./server/index.html"));
});

app.listen(3000, () => { console.log("server started"); });
