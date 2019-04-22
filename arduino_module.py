import serial
import RPi.GPIO as GPIO
import time

def getPh(device_id):
	with serial.Serial(device_id ,115200, timeout=4) as ser:
		ser.baudrate=115200
		read_ser=ser.readline()
		while read_ser:
			if "ph" in read_ser.lower():
				return read_ser.strip()
			else:
				read_ser = ser.readline()
		return read_ser.strip()


def getPh_as_float(device_id):
	phstring = getPh(device_id)
	float_value = phstring.lower().replace('ph:', '')

	return float(float_value)


