module.exports = {
    testRegex: "\.spec\.tsx?$",
    verbose: true,
    bail: true,
    testPathIgnorePatterns: [ "/node_modules/" ],
    moduleDirectories: [ "node_modules" ],
    moduleFileExtensions: [ "ts", "tsx", "js", "jsx", "json", "scss" ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.jest.json",
        },
    },
};
