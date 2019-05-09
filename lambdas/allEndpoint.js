const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
  
  var limit; 
  if(process.env.LIMIT)
  {
    limit = process.env.LIMIT;
  }
  else 
  {
    limit = 20;
  }

  var params = {
    TableName: process.env.DBNAME,
    ProjectionExpression: "messageId, messageAttributes", 
    Limit : limit
  };


  const onScan = (err, data) => {
    if (err) {
      console.log(
        "Scan failed to load data. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, data.Items);
    }
  };

  dynamoDb.scan(params, onScan);
};
