const request = require("request");

var getRows = (formData, callback) => {
  console.log("formData", formData);
  request(
    {
      url: `https://www.quandl.com/api/v3/datasets/WIKI/${
        formData.userInputs.ticker
        }.json?start_date=${formData.userInputs.startDate}&end_date=${
        formData.userInputs.endDate
        }&collapse=daily&key=Nx66MyUyNszXs_juBxTr`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to servers");
      } else if (response.statusCode === 400) {
        callback("Unable to fetch data");
      } else if (response.statusCode === 200) {
        console.log(200);
        callback(undefined, body);
      }
    }
  );
};

module.exports.getRows = getRows;
