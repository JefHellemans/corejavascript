import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());


app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => { console.log("server started"); });
