import arduino_module
import temp_module
import time

def print_device_temperatures(list_of_device_ids):
	for id in list_of_device_ids:
		temperature= temp_module.poll(id)
		print(temperature)

def print_ph(ph_device_path_id):
	print arduino_module.poll(ph_device_path_id)


device_ids = ["28-02049245e6b4", "28-020f92456264"]
# Can get a list of these by running `ls /sys/bus/w1/devices/ | grep 28 > devicelist.txt`

ph_device_path = "/dev/ttyACM0"
print_device_temperatures(device_ids)
print_ph(ph_device_path)
