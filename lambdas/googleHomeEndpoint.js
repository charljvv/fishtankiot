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

            if (event.queryResult) {
                var returnObject;
                if (event.queryResult.parameters.text.toLowerCase().includes("ph")) {
                    returnObject = {
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [{
                                        "simpleResponse": {
                                            "textToSpeech": "The PH value is " + mostRecentObject.messageAttributes.PhSensor1.stringValue,
                                            "displayText": "The PH value is " + mostRecentObject.messageAttributes.PhSensor1.stringValue
                                        }
                                    }]
                                }
                            }
                        }
                    }

                }
                else if (event.queryResult.parameters.text.toLowerCase().includes("temp") || event.queryResult.parameters.text.toLowerCase().includes("temperature")) {
                    returnObject = {
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [{
                                        "simpleResponse": {
                                            "textToSpeech": "The temperature values are " +
                                                mostRecentObject.messageAttributes.TempSensor1.stringValue +
                                                " and " +
                                                mostRecentObject.messageAttributes.TempSensor2.stringValue + " degrees celcius.",
                                            "displayText": "The temperature values are " +
                                                mostRecentObject.messageAttributes.TempSensor1.stringValue +
                                                " and " +
                                                mostRecentObject.messageAttributes.TempSensor2.stringValue + " degrees celcius"
                                        }
                                    }]
                                }
                            }
                        }
                    }
                }
                else if (event.queryResult.parameters.text.toLowerCase().includes("health"))
                {
                    var retText = "";
                    var fishInDanger = false;
                    var averageTemperature = ((mostRecentObject.messageAttributes.TempSensor1.stringValue*1)+(mostRecentObject.messageAttributes.TempSensor2.stringValue*1)/2);
                    var phValue = mostRecentObject.messageAttributes.PhSensor1.stringValue*1;
                    
                    if(averageTemperature > 29)
                    {
                        retText = "The average temperature is too high. "
                        fishInDanger = true;
                    }
                    else if(averageTemperature < 24)
                    {
                        retText = "The average temperature is too low. "
                        fishInDanger = true;
                    }
                    else
                    {
                        retText = "The average temperature is in the recommended range. "
                    }
                    
                    if(phValue > 8)
                    {
                        retText += "The ph value is too high. "
                        fishInDanger = true;
                    }
                    else if(phValue < 5)
                    {
                        retText += "The ph value is too low. "
                        fishInDanger = true;
                    }
                    else 
                    {
                        retText += "The ph value is in the recommended range. "
                    }
                    
                    if(fishInDanger)
                    {
                        retText += "Your fish are in danger."
                    }
                    
                    
                    var speechRetObject = 
                       returnObject = {
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [{
                                        "simpleResponse": {
                                            "textToSpeech": retText,
                                            "displayText": retText
                                        }
                                    }]
                                }
                            }
                        }
                    }
                }
                else {
                    returnObject = {
                        "payload": {
                            "google": {
                                "expectUserResponse": true,
                                "richResponse": {
                                    "items": [{
                                        "simpleResponse": {
                                            "textToSpeech": "Something went wrong, please provide a proper json structure",
                                            "displayText": "Something went wrong, please provide a proper json structure"
                                        }
                                    }]
                                }
                            }
                        }
                    }
                }

            }
            return callback(null, returnObject);
        }
    };

    dynamoDb.scan(params, onScan);
};

