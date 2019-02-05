const expect = require("expect");

const utils = require("./utils");

it("should add two numbers", () => {
    let res = utils.add(33, 11);
    expect(res).toBe(44).toBeA("number");
});

it("should add two numbers", (done) => {
    utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA("number");
        done();
    });
});

it("should square a number", () => {
    let res = utils.square(11);
    expect(res).toBe(121).toBeA("number");
});

it("should square a number", (done) => {
    utils.asyncSquare(4, (sum) => {
        expect(sum).toBe(16).toBeA("number");
        done();
    });
});

it("should verify names are set", () => {
    let user = {
        age: 18,
        location: "CDMX"
    };
    user = utils.setName(user, "Mario Jimenez");
    expect(user).toInclude({
        firstName: "Mario",
        lastName: "Jimenez"
    });
});

// it("should expect some values", () => {
//     // expect(12).toNotBe(12);
//     // expect({ name: "Mario" }).toNotEqual({ name: "Mario" });
//     // expect([2, 3, 4]).toExclude(1);
//     expect({
//         name: "Mario",
//         age: 18,
//         location: "CDMX"
//     }).toExclude({
//         age: 23
//     });
// });