import * as path from "path";

const ROOT = path.join(__dirname, "../../");
export const file = (filePath: string) => path.join(ROOT, filePath);

// this function is copied from https://stackoverflow.com/a/2117523 and works for the purpose of this project
export const uuid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
