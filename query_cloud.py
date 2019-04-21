import boto3

sqs = boto3.resource('sqs')

# Get the queue
queue = sqs.get_queue_by_name(QueueName='sensors.fifo')

for message in queue.receive_messages(MessageAttributeNames=['TempSensor1', 'TempSensor2']):

    print(message.message_attributes.get('TempSensor1').get('StringValue'))
    print(message.message_attributes.get('TempSensor2').get('StringValue'))

    # Let the queue know that the message is processed
    message.delete()