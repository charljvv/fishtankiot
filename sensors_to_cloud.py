
import boto3 
import datetime
import fishtank

# Setup
sqs = boto3.client('sqs')
response = sqs.get_queue_url(QueueName='sensors.fifo')
queue_url = response['QueueUrl']


# Sensor setup
sensor1_id = "28-02049245e6b4"
sensor2_id = "28-020f92456264"

device_ids = [sensor1_id, sensor2_id]
ph_device_path = "/dev/ttyACM0"

# Sensor readings
sensor1 = fishtank.get_device_temperature(sensor1_id)
sensor2 = fishtank.get_device_temperature(sensor2_id)
phsensor = fishtank.get_ph(ph_device_path)

print("Received sensor data, forwarding to sqs queue")
print("Temp sensor 1:" + sensor1.__str__())
print("Temp sensor 2:" + sensor2.__str__())
print("Ph sensor:" + phsensor.__str__())

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
        'Timestamp: ' + datetime.datetime.now().__str__() 
        + '\nTempsensor 1: ' + sensor1.__str__()
        + '\nTempsensor 2: ' + sensor2.__str__()
        + '\nPh Sensor:' + phsensor.__str__()
    ),
    MessageGroupId="allsensors"
)

print("Queue response message id: " + response['MessageId'])