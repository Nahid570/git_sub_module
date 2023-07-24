import React, { useState } from 'react';
import { Slider, Rail, Handles, Ticks } from 'react-compound-slider';
import { Handle, Tick } from './eyeSliderIndex';

function EyeGlassSlider({ domain, handleData, rowName, fieldName, tickCount }) {
  const [values, setValues] = useState([300]);
  const onChange = (values) => {
    setValues(values)
    if (fieldName === 'add' && domain[1] !== values[0]) {
      handleData('', fieldName, values[0], '', 'click');
    } else if (domain[1] !== values[0]) {
      handleData(rowName, fieldName, values[0], '', 'click');
    }
  }

  const sliderStyle = {
    position: 'relative',
  };

  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: '7px',
    borderRadius: 7,
    cursor: 'pointer',
    backgroundColor: '#E8F4FF',
  };

  return (
    <Slider
      mode={1}
      step={0.5}
      domain={domain}
      rootStyle={sliderStyle}
      onChange={onChange}
      values={values}
    >
      <Rail>
        {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>

      <Ticks count={tickCount}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick key={tick.id} tick={tick} count={ticks.length} />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>

    // <div style={{ height: 120, width: '100%' }}>
    //   <Slider
    //     mode={1}
    //     step={1}
    //     domain={domain}
    //     rootStyle={sliderStyle}
    //     onChange={onChange}
    //     values={values}
    //   >
    //     <Rail>
    //       {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
    //     </Rail>
    //     <Handles>
    //       {({ handles, getHandleProps }) => (
    //         <div className="slider-handles">
    //           {handles.map((handle) => (
    //             <Handle
    //               key={handle.id}
    //               handle={handle}
    //               domain={domain}
    //               getHandleProps={getHandleProps}
    //             />
    //           ))}
    //         </div>
    //       )}
    //     </Handles>
    //     <Tracks left={false} right={false}>
    //       {({ tracks, getTrackProps }) => (
    //         <div className="slider-tracks">
    //           {tracks.map(({ id, source, target }) => (
    //             <Track
    //               key={id}
    //               source={source}
    //               target={target}
    //               getTrackProps={getTrackProps}
    //             />
    //           ))}
    //         </div>
    //       )}
    //     </Tracks>
    //     <Ticks count={10}>
    //       {({ ticks }) => (
    //         <div className="slider-ticks">
    //           {ticks.map((tick) => (
    //             <Tick key={tick.id} tick={tick} count={ticks.length} />
    //           ))}
    //         </div>
    //       )}
    //     </Ticks>
    //   </Slider>
    // </div>
  );
}

export default EyeGlassSlider;
