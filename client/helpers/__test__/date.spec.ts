import { dateTimeToString } from "../date";

describe("dateTimeToString", () => {
    it("should convert a Date to a correct string", () => {
        const date = "2019-01-04T17:30";
        expect(dateTimeToString(new Date(date))).toBe(date);
    });
});
