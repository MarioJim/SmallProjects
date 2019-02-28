const request = require("supertest");
const expect = require("expect");

let app = require("./server").app;

describe("Server", () => {
  describe("GET /", () => {
    it("should return hello world response", (done) => {
      request(app)
        .get("/")
        .expect(403)
        .expect((res) => {
          expect(res.body).toInclude({
            error: "Forbidden"
          });
        })
        .end(done);
    });
  });

  describe("GET /users", () => {
    it("should return users response", (done) => {
      request(app)
        .get("/users")
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: "Mario 1",
            age: 18
          });
        })
        .end(done);
    });
  });
});