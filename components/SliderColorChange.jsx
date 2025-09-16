import { Box, Slider, Typography } from "@mui/material";
import { useMemo } from "react";

function SliderColorChange({
  readingType,
  sliderValue,
  setSliderValue,
  sliderConfig,
}) {
  // Compute color based on slider percentage (0 → 1)
  const sliderPercent = useMemo(
    () =>
      (sliderValue - sliderConfig.min) / (sliderConfig.max - sliderConfig.min),
    [sliderValue, sliderConfig]
  );

  // Smooth gradient: red → yellow → green
  const sliderColor = useMemo(() => {
    const r =
      sliderPercent < 0.5
        ? 255
        : Math.round(255 - (sliderPercent - 0.5) * 2 * 255);
    const g = sliderPercent < 0.5 ? Math.round(sliderPercent * 2 * 255) : 255;
    return `rgb(${r}, ${g}, 0)`; // red → yellow → green
  }, [sliderPercent]);

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {readingType}: {sliderValue}
        {sliderConfig.unit}
      </Typography>

      <Slider
        min={sliderConfig.min}
        max={sliderConfig.max}
        step={sliderConfig.step}
        value={sliderValue}
        onChange={(e, val) => setSliderValue(val)}
        valueLabelDisplay="off" // hide MUI tooltip since we show value above
        sx={{
          "& .MuiSlider-track": { bgcolor: sliderColor },
          "& .MuiSlider-thumb": { bgcolor: sliderColor },
          "& .MuiSlider-rail": { bgcolor: "#e0e0e0" },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
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
  );
}

export default SliderColorChange;
