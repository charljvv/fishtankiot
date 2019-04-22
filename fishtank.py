import arduino_module
import temp_module
import time

def get_device_temperatures(list_of_device_ids):
	list_of_temperatures = []
	for id in list_of_device_ids:
		list_of_temperatures.append(temp_module.getTempAsFloat(id))
	return list_of_temperatures

def get_device_temperature(device_id):
	return temp_module.getTempAsFloat(device_id)

def get_ph(ph_device_path_id):
	return arduino_module.getPh_as_float(ph_device_path_id)

# Can get a list of these by running `ls /sys/bus/w1/devices/ | grep 28 > devicelist.txt`
device_ids = ["28-02049245e6b4", "28-020f92456264"]
ph_device_path = "/dev/ttyACM0"


# Debugging 
# print(get_device_temperatures(device_ids))
# print("Device id: " + device_ids[0].__str__() + ' ' + get_device_temperature(device_ids[0]).__str__())
# print("Device id: " + device_ids[1].__str__() + ' ' + get_device_temperature(device_ids[1]).__str__())
# print(get_ph(ph_device_path))
