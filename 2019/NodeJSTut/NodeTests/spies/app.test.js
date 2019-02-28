const expect = require("expect");
const rewire = require("rewire");

let app = rewire("./app");

describe("App", () => {
  let db = {
    saveUser: expect.createSpy()
  };

  app.__set__("db", db);

  it("should call the spy correctly", () => {
    let spy = expect.createSpy();
    spy("Mario", 18);
    expect(spy).toHaveBeenCalledWith("Mario", 18);
  });

  it("should call saveUser with user object", () => {
    let email = "example@example.com";
    let password = "password";

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({ email, password });
  });
});