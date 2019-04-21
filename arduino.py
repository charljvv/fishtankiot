import serial
import RPi.GPIO as GPIO
import time

with serial.Serial("/dev/ttyACM0",115200, timeout=4) as ser:
	ser.baudrate=115200
	read_ser=ser.readline()
	while(read_ser):
		print(read_ser)
		read_ser=ser.readline()
