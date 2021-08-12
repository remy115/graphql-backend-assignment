const propertyResolver = require("../propertyResolver");

const mockedData = [
  {
    privateRemarks:
      "This property is a trial property to test the SimplyRETS. Private agent remarks will be included in this field for use in the SimplyRETS REST API. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    showingContactName: null,
    property: {
      roof: "Tile",
      style: "Traditional",
      area: 1043,
      yearBuilt: 1998,
    },
    mlsId: 1005192,
    terms: "Conventional",
    disclaimer: "This information is believed to be accurate, but without warranty.",
    agreement: "Purchaser Exemptions",
    listDate: "2011-05-23T18:50:30.184391Z",
    modified: "2015-11-14T17:57:26.262392Z",
    listPrice: 20714261,
    listingId: "49699701",
    leaseType: "FullServ",
  },
];

describe("################### propertyResolver ###################", function () {
  const mockedContext = {
    dataSources: {
      SimplyRetsAPI: {
        getProperties: jest.fn(),
      },
    },
  };

  const { getProperties } = mockedContext.dataSources.SimplyRetsAPI;
  getProperties.mockReturnValue([{ ...mockedData[0] }]);

  it("should return proper resolved object", async () => {
    const response = await propertyResolver.Query.getProperties(null, { city: "houston" }, mockedContext);

    expect(getProperties).toHaveBeenCalledWith({ city: "houston" });

    expect(response).toEqual({
      msg: "ok",
      type: "MSG",
      data: mockedData,
    });
  });
});
