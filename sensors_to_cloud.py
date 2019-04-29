
import boto3 
import datetime
import fishtank
import json

def buildAllSensorsMessage(list_of_temperature_devices, list_of_ph_device_paths):
    """
    This method builds a dictionary object with a list of 
    temperature devices and a list of paths to ph devices.
    """
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
    return retObject

def buildSingleTempSensorMessage(device_id):
    """
    This method builds a single temperature sensor dictionary
    """
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
    """
    This method builds a single ph sensor dictionary
    """

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
    """
    This method builds the message body object 
    """
    return "Timestamp:" + timestamp

def sendMessage(queue_url,messageAttributes,messageBody,delaySeconds=0):
    """
    Sends a message to the sqs queue located at queue_url, 
    with the message attributes = messageAttributes,
    message body = messageBody and the delay seconds = the default of 0 (can be overriden if provided)
    """
    # Send message to SQS queue
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageAttributes=messageAttributes,
        MessageBody=messageBody,
        DelaySeconds=delaySeconds
    )
    return response


if __name__ == "__main__":
    # Setup
    sqs = boto3.client('sqs')
    response = sqs.get_queue_url(QueueName='sensors')
    queue_url = response['QueueUrl']

    # sensor devices and ph device path
    sensor1_id = "28-02049245e6b4"
    sensor2_id = "28-020f92456264"
    ph_device_path = "/dev/ttyACM0"

    # to lists
    device_ids = [sensor1_id, sensor2_id]
    ph_device_paths = [ph_device_path]

    # get current timestamp in iso formatted string
    timestamp = datetime.datetime.now().isoformat().__str__()

    messageAttributes = buildAllSensorsMessage(device_ids,ph_device_paths)

    messageBody = buildMessageBody(timestamp)

    response = sendMessage(queue_url,messageAttributes,messageBody)
    
    print(json.dumps(response))

