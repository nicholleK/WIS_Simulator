import { useEffect, useState } from "react";
import { fetchDevices, sendReadings } from "/src/api/devicesApi.js";
import "./App.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
} from "@mui/material";

const readingTypes = [
  "Water Level",
  "Temperature",
  "Water pH",
  "Flow Rate",
  "Valve State",
  "Leak",
  "Battery Level",
];
const readingConfigs = {
  "Water Level": { min: 0, max: 100, step: 1 },
  Temperature: { min: 0, max: 60, step: 0.5 },
  "Water pH": { min: 0, max: 14, step: 0.1 },
  "Flow Rate": { min: 0, max: 10000, step: 10 },
  "Battery Level": { min: 0, max: 100, step: 1 },
};

export default function App() {
  const [devices, setDevices] = useState([]);
  const [deviceID, setDeviceId] = useState(null);
  const [readingType, setReadingType] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const sliderConfig = readingConfigs[readingType] || {
    min: 0,
    max: 100,
    step: 1,
  };

  useEffect(() => {
    if (readingConfigs[readingType]) {
      setSliderValue(readingConfigs[readingType].min);
    }
  }, [readingType]);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const response = await fetchDevices();
        console.log("Fetched devices", response);
        setDevices(Array.isArray(response) ? response : []);
      } catch (error) {
        console.log("Failed to get devices", error);
        setDevices([]);
      }
    };
    loadDevices();
  }, []);

  const handleSend = async () => {
    console.log("device id: ", deviceID);
    if (!deviceID || !readingType) {
      alert("Please select both device Id and reading type");

      return;
    }

    const payload = {
      deviceID,
      readingType,
      value: ["Leak", "Valve State"].includes(readingType)
        ? toggleValue
          ? 1
          : 0
        : sliderValue,
      timeStamp: new Date().toISOString(),
    };

    console.log("Payload to send: ", payload);
    alert("Simulated data sent!");
    //call api to send the data
    const response = await sendReadings(deviceID, payload);
    console.log("Response form sending:", response);
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%", flex: 1 }}>
        <div>
          <h2>Water Intelligent Sensor Simulator</h2>
        </div>

        <Box
          sx={{
            width: 400,
            mx: "auto",
            mt: 4,
            p: 2,
            border: "1px solid white",
            borderRadius: 2,
          }}
        >
          {/* Device Id select */}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="device-label">Device</InputLabel>
            <Select
              labelId="device-label"
              value={deviceID ?? ""}
              label="Device"
              onChange={(e) => {
                const selectedValue = e.target.value;
                console.log("Raw selected value from dropdown:", selectedValue);

                // Defensive parsing
                const parsedId = parseInt(selectedValue, 10);
                if (!isNaN(parsedId)) {
                  setDeviceId(parsedId);
                } else {
                  setDeviceId(null);
                }
              }}
            >
              <MenuItem value="" disabled>
                Select a device...
              </MenuItem>
              {devices.map((d) => (
                <MenuItem key={d.deviceID} value={String(d.deviceID)}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reading type select */}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="reading-label">Reading Type</InputLabel>
            <Select
              labelId="reading-label"
              value={readingType}
              label="Reading Type"
              onChange={(e) => setReadingType(e.target.value)}
            >
              <MenuItem value="" disabled>
                Select a reading type...
              </MenuItem>
              {readingTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Slider and Toggle */}

          {readingType && ["Leak", "Valve State"].includes(readingType) ? (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography>{toggleValue ? "ON" : "OFF"}</Typography>
              <Switch
                checked={toggleValue}
                onChange={(e) => setToggleValue(e.target.checked)}
              />
            </Box>
          ) : readingType ? (
            <>
              <Typography gutterBottom>{readingType} Value</Typography>
              <Slider
                min={sliderConfig.min}
                max={sliderConfig.max}
                step={sliderConfig.step}
                value={sliderValue}
                onChange={(e, val) => setSliderValue(val)}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />
            </>
          ) : null}

          <Button variant="contained" fullWidth onClick={handleSend}>
            Send Reading
          </Button>
        </Box>
      </div>
    </>
  );
}
