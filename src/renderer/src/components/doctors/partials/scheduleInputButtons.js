import React, { memo } from 'react';
import { Button, Form } from 'react-bootstrap';

const ScheduleInputButtons = ({
  inputArr,
  scheduleIndex,
  setQuantitiesField,
}) => {
  const handleSchedule = (val, type) => {
    setQuantitiesField(scheduleIndex, val, type);
  };
  return (
    <div className="unit-btn">
      {inputArr.map((item, index) => {
        return (
          <Button
            className="btn-sm-customize"
            style={{
              padding: `0.225rem 0.75rem`,
              boxShadow: `0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)`,
            }}
            onClick={() => handleSchedule(item)}
            key={index}
            variant="outline-secondary"
          >
            {item}
          </Button>
        );
      })}
      <Form.Control
        type="text"
        style={{ width: '60px' }}
        size="sm"
        placeholder="যে কোন"
        onChange={(e) => handleSchedule(e.target.value, 'change')}
        // onBlur={() => handleSchedule('clickOutside')}
      />
    </div>
  );
};
export default memo(ScheduleInputButtons);
