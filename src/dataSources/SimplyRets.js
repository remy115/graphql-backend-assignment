const { RESTDataSource } = require("apollo-datasource-rest");

class SimplyRetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.simplyrets.com/";
  }

  // all requests authorized, this is used by "RESTDataSource"
  willSendRequest(request) {
    request.headers.set("Authorization", "Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz");
  }

  async getProperties({ city } = {}) {
    const queryObj = {};
    if (city) {
      queryObj.cities = [city];
    }
    const response = await this.get("/properties", queryObj);
    return response;
  }
}

module.exports = SimplyRetsAPI;
