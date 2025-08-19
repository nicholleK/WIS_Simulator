import api from "/services/axiosInstance";

//get all devices
export const fetchDevices = async () => {
  try {
    const response = await api.get("/Sensor/get-devices");
    return response.data;
  } catch (error) {
    console.log("Error fetching all devices: ", error);
    return [];
  }
};

//send reading data

export const sendReadings = async (deviceId, readings) => {
  try {
    const response = await api.post(
      `/Reading/sensor-readings/${deviceId}`,
      readings
    );
    return response.data;
  } catch (error) {
    console.log("Error sending device reading data : ", error);
  }
};
