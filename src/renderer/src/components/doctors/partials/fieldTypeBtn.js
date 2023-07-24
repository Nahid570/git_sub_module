import { memo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const FieldTypeBtn = ({
  btnArr,
  btnClass,
  fieldName,
  selectedItem,
  actionMethod,
}) => {
  return (
    <ButtonGroup
      className={`field-type-group-btn mb-1 ${btnClass}`}
      aria-label="Basic example"
    >
      {btnArr.map((item, key) => {
        let btnName = item.toLowerCase();
        return (
          <Button
            key={key}
            size="sm"
            onClick={() => actionMethod(fieldName, '', btnName)}
            variant={`${
              selectedItem === btnName ? 'primary' : 'outline-secondary'
            }`}
          >
            {item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default memo(FieldTypeBtn);
