const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.latest = (event, context, callback) => {
  var params = {
    TableName: process.env.DBNAME,
    ScanIndexForward: false,
    Limit: 100
  };

  console.log("Scanning Sensordata table.");
  const onScan = (err, data) => {
    if (err) {
      console.log(
        "Scan failed to load data. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      callback(err);
    }
    else {
      console.log("Scan succeeded.");

      var mostRecentReading = new Date(Math.max.apply(null, data.Items.map(e => {
        return new Date(e.timestamp);
      })));
      var mostRecentObject = data.Items.filter(e => {
        var d = new Date(e.timestamp);
        return d.getTime() == mostRecentReading.getTime();
      })[0];

      return callback(null, mostRecentObject);
    }
  };

  dynamoDb.scan(params, onScan);
};
