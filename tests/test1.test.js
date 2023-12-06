const { testFunction1 } = require("../js/test1.js");

describe("Describe Test test1", () => {
    test("test of test1", () => {
        console.log(testFunction1(2, 5));
    });
});
