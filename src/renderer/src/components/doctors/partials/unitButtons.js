import React, { memo } from 'react';
import { Form, Button } from 'react-bootstrap';

const UnitButtons = ({ unitArray, selectedUnit }) => {
  return (
    <div className="unit-btn">
      {unitArray.map((val, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => selectedUnit('select', 'quantityUnit', val)}
          >
            {val}
          </Button>
        );
      })}
      <Form.Control
        type="text"
        style={{ width: '75px' }}
        size="sm"
        placeholder="যে কোন"
        onChange={(e) => selectedUnit('change', 'quantityUnit', e.target.value)}
        onBlur={() => selectedUnit('clickOutside')}
      />
    </div>
  );
};
export default memo(UnitButtons);
