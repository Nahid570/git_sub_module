import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const GeneralExaminationBtn = ({ fieldName, btnInputArray, onClickAction }) => {
  return (
    <div className="mt-1 unit-btn">
      {btnInputArray.map((item, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => onClickAction(fieldName, item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};
export default memo(GeneralExaminationBtn);
