#!/usr/bin/python
import time

def gettemp(id):
	"""
	Gets the temperature for the device number = id
	"""
	try:
		mytemp = ''
		filename = 'w1_slave'
		f = open('/sys/bus/w1/devices/' + id + '/' + filename, 'r')
		line = f.readline()  # read 1st line
		crc = line.rsplit(' ', 1)
		crc = crc[1].replace('\n', '')
		if crc == 'YES':
			line = f.readline()  # read 2nd line
			mytemp = line.rsplit('t=', 1)
		else:
			mytemp = -99999
		f.close()

		return int(mytemp[1])
	except:
		return -99999

def getTempAsFloat(id):
	"""
	Gets the temperature for the device number = id, formatted as a celcius value 
	"""
	return gettemp(id)/float(1000)

def getFormattedString(id):
	return "Device " + id +" Temp : " + '{:.3f}'.format(gettemp(id)/float(1000))

