
import boto3 
import datetime
import fishtank

def buildAllSensorsMessage(list_of_temperature_devices, list_of_ph_device_paths):
    retObject = dict()
    sensorCount = 0
    phSensorCount = 0
    for device_id in list_of_temperature_devices:
        sensorCount += 1
        retObject.update({'TempSensor'+str(sensorCount) : {
            'DataType': 'Number',
            'StringValue': fishtank.get_device_temperature(device_id).__str__()
        }})
    
    for device_path in list_of_ph_device_paths:
        phSensorCount += 1
        retObject.update({'PhSensor'+str(phSensorCount) : {
            'DataType': 'Number',
            'StringValue': fishtank.get_ph(device_path).__str__()
        }})
    
    retObject.update({ 'Timestamp' : {
        'DataType' : 'String',
        'StringValue' : timestamp
    }
    })
    print(retObject)
    return retObject

def buildSingleTempSensorMessage(device_id):
    retObject = dict()
    retObject.update({'TempSensor' : 
    {
        'DataType': 'Number',
        'StringValue': fishtank.get_device_temperature(device_id).__str__()
    }})
    retObject.update({ 'Timestamp' : 
    {
        'DataType' : 'String',
        'StringValue' : timestamp
    }})

    return retObject

def buildSinglePhSensorMessage(ph_device_path):

    retObject = dict()
    retObject.update({'PhSensor' : {
            'DataType': 'Number',
            'StringValue': fishtank.get_ph(ph_device_path).__str__()
    }})
    retObject.update({ 'Timestamp' : {
        'DataType' : 'String',
        'StringValue' : timestamp
    } })

    return retObject


def buildMessageBody(timestamp):
    return "Timestamp:" + timestamp

def sendMessage(queue_url,messageAttributes,messageBody,messageGroupId):
    # Send message to SQS queue
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageAttributes=messageAttributes,
        MessageBody=messageBody,
        MessageGroupId=messageGroupId
    )
    print("Response sequence number: " + response['SequenceNumber'])

if __name__ == "__main__":
    # Setup
    sqs = boto3.client('sqs')
    response = sqs.get_queue_url(QueueName='sensors.fifo')
    queue_url = response['QueueUrl']

    sensor1_id = "28-02049245e6b4"
    sensor2_id = "28-020f92456264"
    ph_device_path = "/dev/ttyACM0"

    device_ids = [sensor1_id, sensor2_id]
    ph_device_paths = [ph_device_path]

    timestamp = datetime.datetime.now().__str__()
    messageAttributes = buildAllSensorsMessage(device_ids,ph_device_paths)
    messageBody = buildMessageBody(timestamp)
    messageGroupId = "allsensorsgroup"
    sendMessage(queue_url,messageAttributes,messageBody,messageGroupId)

    timestamp = datetime.datetime.now().__str__()
    messageAttributes = buildSingleTempSensorMessage(sensor1_id)
    messageBody = buildMessageBody(timestamp)
    messageGroupId = 'device_'+sensor1_id
    sendMessage(queue_url,messageAttributes,messageBody,messageGroupId)

    timestamp = datetime.datetime.now().__str__()
    messageAttributes = buildSingleTempSensorMessage(sensor2_id)
    messageBody = buildMessageBody(timestamp)
    messageGroupId = 'device_'+sensor2_id
    sendMessage(queue_url,messageAttributes,messageBody,messageGroupId)

    timestamp = datetime.datetime.now().__str__()
    messageAttributes = buildSinglePhSensorMessage(ph_device_path)
    messageBody = buildMessageBody(timestamp)
    messageGroupId = 'device_'+'PhSensor'
    sendMessage(queue_url,messageAttributes,messageBody,messageGroupId)
