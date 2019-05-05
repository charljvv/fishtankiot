# Cloud Connected Fish tank
## Fishtank IOT hackathon project


- [arduino_module.py](arduino_module.py) is used for querying the arduino module for data from the PH Sensor
- [temp_module.py](temp_module.py) is used for querying the temperature sensors from the One Wire interface
- [fishtank.py](fishtank.py) is used as a wrapper library for calling the functions from arduino_module and temp_module
- [processingLambda.py](processingLambda.py) is the python script run on the serverless lambda functions to process sqs data to dynamodb
- [query_cloud.py](query_cloud.py) is an initial proof of concept to manually invoke a function to read the latest data from the SQS queues
- [sensors_to_cloud.py](sensors_to_cloud.py) is the python script to query all the sensors, build a dictionary object to send to the SQS queues. This is run on a cron job on the Raspberry PI.


