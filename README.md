# Cloud Connected Fish tank
## Fishtank IOT hackathon project


- [arduino_module.py](arduino_module.py) is used for querying the arduino module for data from the PH Sensor
- [temp_module.py](temp_module.py) is used for querying the temperature sensors from the One Wire interface
- [fishtank.py](fishtank.py) is used as a wrapper library for calling the functions from arduino_module and temp_module
- [processingLambda.py](lambdas/processingLambda.py) is the python script run on the serverless lambda functions to process sqs data to dynamodb
- [query_cloud.py](query_cloud.py) is an initial proof of concept to manually invoke a function to read the latest data from the SQS queues
- [lambdas/sensors_to_cloud.py](sensors_to_cloud.py) is the python script to query all the sensors, build a dictionary object to send to the SQS queues. This is run on a cron job on the Raspberry PI.
- [lambdas/allEndpoint.js](lambdas/allEndpoint.js) NodeJS lambda to retrieve the last `n` records from the DynamoDB
- [lambdas/latestEndpoint.js](lambdas/latestEndpoint.js) NodeJS lambda to retrieve the latest reading data from DynamoDB
- [lambdas/notImplemented.js](lambdas/notImplemented.js) NodeJS lambda to return a 404 for not implemented endpoints
- [lambdas/googleHomeEndpoint.js](lambdas/googleHomeEndpoint.js) NodeJS lambda to interact with the google assistant and dialog flow systems.


# To run this locally: 
- Make sure the env variable 'DBNAME' is set to your Dynamodb instance name. This is used by all the NodeJS lambdas and the processing lambda
- Make sure the env variable 'LIMIT' is set on the allEndpoint lambda to specify the `n` values to retrieve
- Enable the One wire interface on the Raspberry Pi (for the temp readings)
- Enable reading from the serial busses (for the Arduino readings)

- Add a cronjob with the following configuration: `1 * * * * python ~/fishtankiot/sensors_to_cloud.py`


## Youtube link to sensor live demonstration:
[https://youtu.be/qXQ8UBO6ISE](https://youtu.be/qXQ8UBO6ISE)

## High-level deployment diagram:
![High Level Diagram](https://github.com/charljvv/fishtankiot/blob/master/High_level_tech_stack_Latest.png "High-level design")
## Physical diagram:
![Physical Diagram](https://github.com/charljvv/fishtankiot/blob/master/Physical_Layout.png "Physical Layout")
