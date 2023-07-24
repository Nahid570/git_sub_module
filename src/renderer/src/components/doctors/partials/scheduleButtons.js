import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const ScheduleButtons = ({ buttonArray, itemDetailIndex, actionMethod }) => {
  const inputFieldNo = (btnNo) => {
    let noOfFields = buttonArray.filter(function (item) {
      return item <= btnNo;
    });
    actionMethod(noOfFields, itemDetailIndex);
  };

  return (
    <div className="mb-1">
      {buttonArray.map((btnNo, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => inputFieldNo(btnNo)}
          >
            {btnNo}
          </Button>
        );
      })}
    </div>
  );
};
export default memo(ScheduleButtons);
