const SimplyRetsAPI = require("../SimplyRets");

const mockedRequestArg = {
  headers: {
    set: jest.fn(),
  },
};
const sr = new SimplyRetsAPI();
sr.get = jest.fn();

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
    showingContactPhone: null,
    terms: "Conventional",
    showingInstructions:
      "The showing instructions for this trial property are brought to you by the SimplyRETS team. This field will include any showing remarks for the given listing in your RETS feed. Enjoy!",
    office: {
      contact: null,
      name: null,
      servingName: null,
      brokerid: null,
    },
    leaseTerm: null,
    disclaimer: "This information is believed to be accurate, but without warranty.",
    specialListingConditions: null,
    originalListPrice: null,
    address: {
      crossStreet: "Dunne Ave",
      state: "Texas",
      country: "United States",
      postalCode: "77096",
      streetName: "East Sweet Bottom Br",
      streetNumberText: "74434",
      city: "Houston",
      streetNumber: 74434,
      full: "74434 East Sweet Bottom Br #18393",
      unit: "18393",
    },
    agreement: "Purchaser Exemptions",
    listDate: "2011-05-23T18:50:30.184391Z",
    modified: "2015-11-14T17:57:26.262392Z",
    school: {
      middleSchool: "FALCON PASS",
      highSchool: "Cy Creek",
      elementarySchool: "HAYES",
      district: null,
    },
    photos: [
      "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home9.jpg",
      "https://s3-us-west-2.amazonaws.com/cdn.simplyrets.com/properties/trial/home-inside-9.jpg",
    ],
    listPrice: 20714261,
    internetAddressDisplay: null,
    listingId: "49699701",
    mls: {
      status: "Active",
      area: "Spring/Klein",
    },
    internetEntireListingDisplay: null,
    geo: {
      county: "North",
    },
    tax: {
      taxYear: 1981,
      taxAnnualAmount: 3180,
      id: "593-723-781-8056",
    },
    sales: {
      closeDate: "1996-10-21T15:15:54.171139Z",

      closePrice: 17946033,
      contractDate: null,
    },
    leaseType: "FullServ",
  },
];

sr.get.mockReturnValue([{ ...mockedData[0] }]);

describe("################### SimplyRetsAPI ###################", function () {
  it("should get properties", async () => {
    const properties = await sr.getProperties();
    expect(properties).toEqual(mockedData);
  });

  it('should pass the "city" param to the query', async () => {
    const properties = await sr.getProperties({ city: "houston" });

    expect(properties).toEqual(mockedData);
    expect(sr.get).toHaveBeenCalledWith("/properties", { cities: ["houston"] });
  });

  it('properly set "Authorization" header in "willSendRequest" hook', async () => {
    sr.willSendRequest(mockedRequestArg);

    expect(mockedRequestArg.headers.set).toHaveBeenCalledWith("Authorization", expect.any(String));
  });
});
