import ReactSlider from 'react-slider';

function VerticalRanger({ onChangeVerticalHandler, value = 0 }) {
  const handleChange = (e) => {
    console.log('vertical: ', e.target.value);
  };

  return (
    <ReactSlider
      className="vertical-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      orientation="vertical"
      renderThumb={(props, state) => (
        <div {...props}>
          <span style={{ marginLeft: '-30px' }}>{state.valueNow}</span>
        </div>
      )}
      value={value}
      onChange={(first, second) => onChangeVerticalHandler(first)}
      // renderTrack={(props, state) => (
      //   <span {...props} index={state.index}>
      //     {state.index}
      //   </span>
      // )}
    />
  );
}

export default VerticalRanger;
