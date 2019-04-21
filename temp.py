#!/usr/bin/python
import time


def gettemp(id):
	"""
	Gets the temperature for the device number = id
	"""
	try:
		temp = ''
		filename = 'w1_slave'
		f = open('/sys/bus/w1/devices/' + id + '/' + filename, 'r')
		line = f.readline()  # read 1st line
		crc = line.rsplit(' ', 1)
		crc = crc[1].replace('\n', '')
		if crc == 'YES':
			line = f.readline()  # read 2nd line
			temp = line.rsplit('t=', 1)
		else:
			temp = -99999
		f.close()

		return int(temp[1])

	except:
		return -99999


if __name__ == '__main__':
	# Script has been called directly
	# this id = the device id in /sys/bus/w1/devices
	# - will look for a more elegant way to do this
	file = open("devicenames.txt")
	line = file.readline()
	id = line.replace('\n', '')
	#id = '28-02049245e6b4'
	for _ in range(0, 20):
		print "Temp : " + '{:.3f}'.format(gettemp(id)/float(1000))
		time.sleep(1)
