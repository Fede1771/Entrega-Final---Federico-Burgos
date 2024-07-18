const supertest = require("supertest");

(async () => {
  const { default: chai } = await import("chai");
  const expect = chai.expect;

  const requester = supertest("http://localhost:8080/");

  describe("Testing de la app Web tienda simona", () => {
    describe("Testing de registro: ", () => {
      it("Endpoint POST /api/register debe crear un perfil correctamente", async () => {
        const miPersona = {
          first_name: "Pepe",
          last_name: "Argento",
          email: "pepe@argento.com.ar",
          password: "RacingCampeon",
          age: "55"
        };

        const { statusCode, ok, body } = await requester.post("/api/register").send(miPersona);

        console.log(statusCode);
        console.log(ok);
        console.log(body);

        expect(body.payload).to.have.property("_id");
      });
    });
  });
})();
