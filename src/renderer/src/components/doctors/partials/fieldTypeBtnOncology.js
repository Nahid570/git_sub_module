import { memo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const FieldTypeBtnOncology = ({
  btnArr,
  fieldName,
  selectedItem,
  actionMethod,
}) => {
  return (
    <ButtonGroup
      className={`field-type-group-btn mb-1`}
      aria-label="Basic example"
    >
      {btnArr.map((item, key) => {
        return (
          <Button
            key={key}
            size="sm"
            onClick={() => actionMethod(fieldName, item)}
            variant={`${
              selectedItem === item ? 'primary' : 'outline-secondary'
            }`}
          >
            {item}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default memo(FieldTypeBtnOncology);
