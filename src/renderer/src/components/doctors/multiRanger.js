import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useEffect } from "react";
function MultiRanger({ divCount, setDivCount }) {
  const [minValue, set_minValue] = useState(divCount[0]);
  const [maxValue, set_maxValue] = useState(divCount[1]);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    setDivCount([e.minValue, e.maxValue]);
  };

  useEffect(() => {
    set_minValue(divCount[0]);
    set_maxValue(divCount[1]);
  }, [divCount]);

  return (
    <div className="App">
      <MultiRangeSlider
        min={0}
        max={100}
        step={1}
        ruler={false}
        label={true}
        preventWheel={false}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
}

export default MultiRanger;
