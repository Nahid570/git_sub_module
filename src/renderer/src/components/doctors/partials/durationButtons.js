import React, { memo } from 'react';
import { Form, Button } from 'react-bootstrap';

const DurationButtons = ({ unitArray, selectedUnit }) => {
  return (
    <div className="unit-btn">
      {unitArray.map((item, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => selectedUnit('select', 'duration', item)}
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
        onChange={(e) => selectedUnit('change', 'duration', e.target.value)}
        onBlur={() => selectedUnit('clickOutside')}
      />
    </div>
  );
};
export default memo(DurationButtons);
