module.exports = {
  Query: {
    getProperties: async (_, { city }, { dataSources }) => {
      const properties = await dataSources.SimplyRetsAPI.getProperties({ city });

      // dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0

      return {
        msg: "ok",
        type: "MSG",
        data: properties,
      };
    },
  },
};
