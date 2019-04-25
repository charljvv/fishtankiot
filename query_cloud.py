import boto3
import datetime

def parseAndPersist(max_queue_messages=10, queue_name='sensors'):
    """
    Parse the messages from the sqs queue and persist
    """
    # Get the sqs resource 
    sqs = boto3.resource('sqs')

    # Get the queue
    queue = sqs.get_queue_by_name(QueueName=queue_name)
    for message in queue.receive_messages(MessageAttributeNames=['TempSensor1', 'TempSensor2', 'Timestamp', 'PhSensor1'], MaxNumberOfMessages=max_queue_messages):
        # new dictionary
        values = dict()
        # retrieve the attribute and build a new dictory to persist
        for attribute in message.message_attributes:
            values.update({attribute : message.message_attributes.get(attribute).get('StringValue')})

        # get message id from the message
        values.update({"message_id" : message.message_id})

        # dynamodb doesn't support DateTime, only in the string isoformat
        values.update({"timestamp_parsed" : datetime.datetime.now().isoformat()})

        # persist to dynamodb
        response = saveToDB(values)
        print("ResponseId: "+response['ResponseMetadata'].get('RequestId'))
        
        # if persisted, delete from queue
        if(response['ResponseMetadata'].get('HTTPStatusCode')== 200) :
            message.delete()
        


def saveToDB(values_dict,table_name='sensordata'):
    """ 
    Save to the Dynamodb instance 
    """
    # get the db resource
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    
    # update the table with the dictionary passed as param
    response = table.put_item(Item=values_dict)

    return response


if __name__ == "__main__":
    parseAndPersist()
