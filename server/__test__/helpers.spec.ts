import { readFileSync } from "fs";
import { file, uuid } from "../helpers";

describe("file", () => {
    it("should return the correct file path from the root dir", () => {
        // the test itself is ran from one level below, which is why we need to specify the "corejavascript" (or whatever the project is called on your FS) folder
        const data = JSON.parse(readFileSync(file("./corejavascript/server/__test__/helpers.data.json"), "UTF-8"));
        expect(data.succeed).toBe(true);
    });
});

describe("uuid", () => {
    it("should return a UUIDv4-like value", () => {
        const X = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
        const Y = [ "8", "9", "a", "b" ];
        let id;
        const previousIds: string[] = [];
        for (let i = 0; i < 1000; i++) {
            id = uuid();
            expect(previousIds.includes(id)).toBe(false);
            previousIds.push(id);

            expect(id.length).toBe(36);
            expect(X.includes(id[0])).toBe(true);
            expect(X.includes(id[1])).toBe(true);
            expect(X.includes(id[2])).toBe(true);
            expect(X.includes(id[3])).toBe(true);
            expect(X.includes(id[4])).toBe(true);
            expect(X.includes(id[5])).toBe(true);
            expect(X.includes(id[6])).toBe(true);
            expect(X.includes(id[7])).toBe(true);
            expect(id[8]).toBe("-");
            expect(X.includes(id[9])).toBe(true);
            expect(X.includes(id[10])).toBe(true);
            expect(X.includes(id[11])).toBe(true);
            expect(X.includes(id[12])).toBe(true);
            expect(id[13]).toBe("-");
            expect(id[14]).toBe("4");
            expect(X.includes(id[15])).toBe(true);
            expect(X.includes(id[16])).toBe(true);
            expect(X.includes(id[17])).toBe(true);
            expect(id[18]).toBe("-");
            expect(Y.includes(id[19])).toBe(true); // Y is used here
            expect(X.includes(id[20])).toBe(true);
            expect(X.includes(id[21])).toBe(true);
            expect(X.includes(id[22])).toBe(true);
            expect(id[23]).toBe("-");
            expect(X.includes(id[24])).toBe(true);
            expect(X.includes(id[25])).toBe(true);
            expect(X.includes(id[26])).toBe(true);
            expect(X.includes(id[27])).toBe(true);
            expect(X.includes(id[28])).toBe(true);
            expect(X.includes(id[29])).toBe(true);
            expect(X.includes(id[30])).toBe(true);
            expect(X.includes(id[31])).toBe(true);
            expect(X.includes(id[32])).toBe(true);
            expect(X.includes(id[33])).toBe(true);
            expect(X.includes(id[34])).toBe(true);
            expect(X.includes(id[35])).toBe(true);
        }
    });
});
