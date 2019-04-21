
import boto3 
import datetime

sqs = boto3.client('sqs')

response = sqs.get_queue_url(QueueName='sensors.fifo')

queue_url = response['QueueUrl']

sensor1 = 12
sensor2 = 25
phsensor = "pH:7.31"

device_ids = ["123123", "1231231asd", '123casadbnabs']

# Send message to SQS queue
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageAttributes={
        'TempSensor1': {
            'DataType': 'Number',
            'StringValue': sensor1.__str__()
        }
        ,'TempSensor2': {
            'DataType': 'Number',
            'StringValue': sensor2.__str__()
        },
        'PhSensor' : {
            'DataType' : 'String',
            'StringValue' : phsensor.__str__()
        }
    },
    MessageBody=(
        'Timestamp :' + datetime.datetime.now().__str__() + '\n Device ids: ' + device_ids.__str__()
    ),
    MessageGroupId="sensorgroup1"

)

print(response['MessageId'])