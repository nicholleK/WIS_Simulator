// import { useEffect, useState } from "react";
// import { fetchDevices, sendReadings } from "/src/api/devicesApi.js";
// import "./App.css";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   Menu,
//   MenuItem,
//   Select,
//   Slider,
//   Switch,
//   Typography,
// } from "@mui/material";

// const readingTypes = [
//   "Water Level",
//   "Temperature",
//   "Water pH",
//   "Flow Rate",
//   "Valve State",
//   "Leak",
//   "Battery Level",
// ];
// const readingConfigs = {
//   "Water Level": { min: 0, max: 100, step: 1 },
//   Temperature: { min: 0, max: 60, step: 0.5 },
//   "Water pH": { min: 0, max: 14, step: 0.1 },
//   "Flow Rate": { min: 0, max: 10000, step: 10 },
//   "Battery Level": { min: 0, max: 100, step: 1 },
// };

// export default function App() {
//   const [devices, setDevices] = useState([]);
//   const [deviceID, setDeviceId] = useState(null);
//   const [readingType, setReadingType] = useState("");
//   const [sliderValue, setSliderValue] = useState(0);
//   const [toggleValue, setToggleValue] = useState(false);
//   const sliderConfig = readingConfigs[readingType] || {
//     min: 0,
//     max: 100,
//     step: 1,
//   };

//   useEffect(() => {
//     if (readingConfigs[readingType]) {
//       setSliderValue(readingConfigs[readingType].min);
//     }
//   }, [readingType]);

//   useEffect(() => {
//     const loadDevices = async () => {
//       try {
//         const response = await fetchDevices();
//         console.log("Fetched devices", response);
//         setDevices(Array.isArray(response) ? response : []);
//       } catch (error) {
//         console.log("Failed to get devices", error);
//         setDevices([]);
//       }
//     };
//     loadDevices();
//   }, []);

//   const handleSend = async () => {
//     console.log("device id: ", deviceID);
//     if (!deviceID || !readingType) {
//       alert("Please select both device Id and reading type");

//       return;
//     }

//     const payload = {
//       deviceID,
//       readingType,
//       value: ["Leak", "Valve State"].includes(readingType)
//         ? toggleValue
//           ? 1
//           : 0
//         : sliderValue,
//       timeStamp: new Date().toISOString(),
//     };

//     console.log("Payload to send: ", payload);
//     alert("Simulated data sent!");
//     //call api to send the data
//     const response = await sendReadings(deviceID, payload);
//     console.log("Response form sending:", response);
//   };

//   return (
//     <>
//       <div style={{ width: "100%", height: "100%", flex: 1 }}>
//         <div>
//           <h2>Water Intelligent Sensor Simulator</h2>
//         </div>

//         <Box
//           sx={{
//             width: 400,
//             mx: "auto",
//             mt: 4,
//             p: 2,
//             border: "1px solid white",
//             borderRadius: 2,
//           }}
//         >
//           {/* Device Id select */}

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="device-label">Device</InputLabel>
//             <Select
//               labelId="device-label"
//               value={deviceID ?? ""}
//               label="Device"
//               onChange={(e) => {
//                 const selectedValue = e.target.value;
//                 console.log("Raw selected value from dropdown:", selectedValue);

//                 // Defensive parsing
//                 const parsedId = parseInt(selectedValue, 10);
//                 if (!isNaN(parsedId)) {
//                   setDeviceId(parsedId);
//                 } else {
//                   setDeviceId(null);
//                 }
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Select a device...
//               </MenuItem>
//               {devices.map((d) => (
//                 <MenuItem key={d.deviceID} value={String(d.deviceID)}>
//                   {d.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {/* Reading type select */}

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel id="reading-label">Reading Type</InputLabel>
//             <Select
//               labelId="reading-label"
//               value={readingType}
//               label="Reading Type"
//               onChange={(e) => setReadingType(e.target.value)}
//             >
//               <MenuItem value="" disabled>
//                 Select a reading type...
//               </MenuItem>
//               {readingTypes.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {/* Slider and Toggle */}

//           {readingType && ["Leak", "Valve State"].includes(readingType) ? (
//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <Typography>{toggleValue ? "ON" : "OFF"}</Typography>
//               <Switch
//                 checked={toggleValue}
//                 onChange={(e) => setToggleValue(e.target.checked)}
//               />
//             </Box>
//           ) : readingType ? (
//             <>
//               <Typography gutterBottom>{readingType} Value</Typography>
//               <Slider
//                 min={sliderConfig.min}
//                 max={sliderConfig.max}
//                 step={sliderConfig.step}
//                 value={sliderValue}
//                 onChange={(e, val) => setSliderValue(val)}
//                 valueLabelDisplay="auto"
//                 sx={{ mb: 3 }}
//               />
//             </>
//           ) : null}

//           <Button variant="contained" fullWidth onClick={handleSend}>
//             Send Reading
//           </Button>
//         </Box>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { fetchDevices, sendReadings } from "/src/api/devicesApi.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
  Paper,
  Chip,
  Alert,
  LinearProgress,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Sensors,
  InvertColors,
  Thermostat,
  Opacity,
  Speed,
  Settings,
  Warning,
  BatteryChargingFull,
  Send,
} from "@mui/icons-material";

const readingTypes = [
  "Water Level",
  "Temperature",
  "Water pH",
  "Flow Rate",
  "Valve State",
  "Leak",
  "Battery Level",
];

const readingIcons = {
  "Water Level": <InvertColors />,
  Temperature: <Thermostat />,
  "Water pH": <Opacity />,
  "Flow Rate": <Speed />,
  "Valve State": <Settings />,
  Leak: <Warning />,
  "Battery Level": <BatteryChargingFull />,
};

const readingConfigs = {
  "Water Level": { min: 0, max: 100, step: 1, unit: "%" },
  Temperature: { min: 0, max: 60, step: 0.5, unit: "°C" },
  "Water pH": { min: 0, max: 14, step: 0.1, unit: "pH" },
  "Flow Rate": { min: 0, max: 10000, step: 10, unit: "L/h" },
  "Battery Level": { min: 0, max: 100, step: 1, unit: "%" },
};

export default function App() {
  const theme = useTheme();
  const [devices, setDevices] = useState([]);
  const [deviceID, setDeviceId] = useState("");
  const [readingType, setReadingType] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [toggleValue, setToggleValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const sliderConfig = readingConfigs[readingType] || {
    min: 0,
    max: 100,
    step: 1,
    unit: "",
  };

  // Set default slider value when reading type changes
  useEffect(() => {
    if (readingConfigs[readingType]) {
      setSliderValue(readingConfigs[readingType].min);
    }
  }, [readingType]);

  // Fetch devices
  useEffect(() => {
    const loadDevices = async () => {
      try {
        setLoading(true);
        const response = await fetchDevices();
        console.log("Fetched devices:", response);
        setDevices(Array.isArray(response) ? response : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
        setDevices([]);
        setError("Failed to load devices. Try again.");
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
  }, []);

  // Send reading
  const handleSend = async () => {
    if (!deviceID || !readingType) {
      setError("Please select both device and reading type.");
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

    try {
      setLoading(true);
      const response = await sendReadings(deviceID, payload);
      console.log("Response:", response);
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to send reading:", err);
      setError("Failed to send reading. Try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Sensors sx={{ fontSize: 40, color: "#da890fff", mr: 2 }} />
          <Typography variant="h3" fontWeight={700} color="#da890fff">
            WIS Simulator
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Simulate sensor readings for water monitoring devices
        </Typography>
      </Box>

      {/* Status Alerts */}
      <Fade in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Fade>

      <Fade in={success}>
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(false)}
        >
          Reading sent successfully!
        </Alert>
      </Fade>

      {/* Main Card */}
      <Card
        elevation={8}
        sx={{
          borderRadius: 3,
          overflow: "visible",
          width: "100%",
          maxWidth: 1200,
          background: `linear-gradient(to bottom right, ${alpha(
            theme.palette.background.paper,
            0.9
          )}, ${alpha(theme.palette.background.paper, 0.9)})`,
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        {loading && <LinearProgress />}
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Grid container spacing={3}>
            {/* Device Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Select Device</InputLabel>
                <Select
                  value={deviceID}
                  onChange={(e) => setDeviceId(e.target.value)}
                  label="Select Device"
                  sx={{ minHeight: 48, fontSize: "1rem" }}
                  renderValue={(selected) => {
                    const dev = devices.find((d) => d.deviceID === selected);
                    return dev
                      ? `${dev.name} (ID: ${dev.deviceID})`
                      : "Select a device";
                  }}
                >
                  {devices.map((d) => (
                    <MenuItem key={d.deviceID} value={d.deviceID}>
                      {d.name} (ID: {d.deviceID})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Reading Type Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Reading Type</InputLabel>
                <Select
                  value={readingType}
                  onChange={(e) => setReadingType(e.target.value)}
                  label="Reading Type"
                  sx={{ minHeight: 48, fontSize: "1rem" }}
                  renderValue={(selected) =>
                    selected ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {readingIcons[selected]}
                        <Typography sx={{ ml: 1 }}>{selected}</Typography>
                      </Box>
                    ) : (
                      "Select a reading type"
                    )
                  }
                >
                  {readingTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {readingIcons[type]}
                        <Typography sx={{ ml: 1 }}>{type}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Value Controls */}
            {readingType && (
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {readingIcons[readingType]}
                    <Box sx={{ ml: 1 }}>Set {readingType} Value</Box>
                  </Typography>

                  {["Leak", "Valve State"].includes(readingType) ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        Current state:
                        <Chip
                          label={toggleValue ? "ON" : "OFF"}
                          color={toggleValue ? "success" : "default"}
                          variant={toggleValue ? "filled" : "outlined"}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Switch
                        checked={toggleValue}
                        onChange={(e) => setToggleValue(e.target.checked)}
                        color={readingType === "Leak" ? "error" : "primary"}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Slider
                        min={sliderConfig.min}
                        max={sliderConfig.max}
                        step={sliderConfig.step}
                        value={sliderValue}
                        onChange={(e, val) => setSliderValue(val)}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) =>
                          `${value}${sliderConfig.unit}`
                        }
                        sx={{ mb: 2 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {sliderConfig.min}
                          {sliderConfig.unit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {sliderConfig.max}
                          {sliderConfig.unit}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grid>
            )}

            {/* Send Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSend}
                disabled={loading || !deviceID || !readingType}
                size="large"
                endIcon={<Send />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1.1rem",
                  backgroundColor: "orange",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                Send Reading
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Footer */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Water Intelligent Sensor Simulator
      </Typography>
    </Box>
  );
}
