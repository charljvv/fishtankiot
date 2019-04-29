import logging
# aws sdk
import boto3
import os

# setup logging to cloudwatch
logger = logging.getLogger()
logger.setLevel(logging.INFO)

if('DBNAME' in os.environ):
    dbNameFromEnv = os.environ['DBNAME']
else:
    dbNameFromEnv = 'sensors'

def lambda_handler(event, context):
    responses = []
    for record in event['Records']:
        payload=record["body"]
        response = saveToDB(record, dbNameFromEnv)
        logger.info(response)
        responses.append(response)

    return responses


def saveToDB(values_dict,table_name):
    """ 
    Save to the Dynamodb instance 
    """
    # get the db resource
    dynamodb = boto3.resource('dynamodb')
    # get the table 
    table = dynamodb.Table(table_name)
    
    # update the table with the dictionary passed as param
    response = table.put_item(Item=values_dict)

    return response