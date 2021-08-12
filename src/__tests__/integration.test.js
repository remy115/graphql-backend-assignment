const request = require("supertest");
const { startServer } = require("../../index");

const mockedResponse = [
  {
    address: {
      city: "Houston",
      state: "Texas",
    },
    property: {
      bathrooms: null,
      yearBuilt: 1998,
    },
  },
];

jest.mock("../dataSources/SimplyRets", () => {
  const originalSimplyRetsAPI = jest.requireActual("../dataSources/SimplyRets");

  // overwriting the "get" implementation of "SimplyRetsAPI" (inheritance from "RESTDataSource") to avoid network calls
  class MockedSimplyRetsAPI extends originalSimplyRetsAPI {
    constructor() {
      super();
    }

    async get() {
      return mockedResponse;
    }
  }
  return MockedSimplyRetsAPI;
});

describe("################# INTEGRATION #################", function () {
  let app, server;
  beforeAll(async () => {
    const serverObj = await startServer();
    app = serverObj.app;
    server = serverObj.server;
  });
  it("should process a request thoroughly", (done) => {
    const query =
      '{"query":"query query1($getPropertiesCity: String) {getProperties(city: $getPropertiesCity) {msg,type data {address {city,state}property {bathrooms,yearBuilt}}}}","variables":{"getPropertiesCity":"houston"}}';

    request(app)
      .post("/graphql")
      .send(query)
      .set("Content-Type", "application/json")
      // base64 of "user1@sideinc.com:676cfd34-e706-4cce-87ca-97f947c43bd4"
      .set("Authorization", "dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        // errors from the graphql query itself; the HTTP status still will be 200
        // so we catch them here!
        const errors = res.body.errors;
        if (errors && errors.length) {
          return done(errors[0].message);
        }

        // checking returned data
        // possible error... unlikely...
        let possibleError = null;
        const data = res.body.data;

        if (data && data.getProperties) {
          if (data.getProperties.msg !== "ok") {
            possibleError = 'error in "msg" prop';
          }
          if (data?.getProperties?.data[0]?.address?.city !== mockedResponse[0]?.address?.city) {
            possibleError = 'error in "data" prop';
          }
        }

        return done(possibleError);
      });
  });

  it("should block a request with wrong auth data", (done) => {
    request(app)
      .post("/graphql")
      .send("[]")
      .set("Content-Type", "application/json")
      // base64 of "user1@sideinc.com:676cfd34-e706-4cce-87ca-97f947c43bd4"
      .set("Authorization", "dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQ99999900Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0")
      .expect(401)
      .end(function (err) {
        if (err) return done(err);

        done();
      });
  });

  afterAll(async () => {
    await server.stop();
  });
});
