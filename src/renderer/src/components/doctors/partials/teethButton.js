import { memo } from 'react';
import { Button } from 'react-bootstrap';

const TeethButton = ({
  buttonArr,
  handleDentalExamination,
  position,
  dentalExamination,
}) => {
  return (
    <>
      {buttonArr.map((item, index) => {
        return (
          <Button
            key={index}
            size="md"
            variant={
              dentalExamination[position].includes(item)
                ? 'secondary'
                : 'outline-secondary'
            }
            onClick={() => handleDentalExamination('', position, item)}
          >
            {item}
          </Button>
        );
      })}
    </>
  );
};

export default memo(TeethButton);
