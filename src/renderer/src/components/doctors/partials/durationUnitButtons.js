import React, { memo } from 'react';
import { Form, Button } from 'react-bootstrap';

const DurationUnitButtons = ({ inputArr, actionOnClick }) => {
  return (
    <div className="unit-btn">
      {inputArr.map((val, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => actionOnClick('durationUnit', val)}
          >
            {val}
          </Button>
        );
      })}
      {/* <Form.Control type="text" style={{ width: "85px" }} size="sm" placeholder="Enter new" onChange={(e) => actionOnClick('change', 'duration', e.target.value)} onBlur={() => actionOnClick('clickOutside')} /> */}
    </div>
  );
};
export default memo(DurationUnitButtons);
