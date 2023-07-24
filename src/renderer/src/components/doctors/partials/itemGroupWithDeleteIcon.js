import { useState } from 'react';
import { deleteConfirmation } from '../../../utils/helpers';
import { memo } from 'react';

const ItemGroupWithDeleteIcon = ({
  item,
  isSelectedGroup,
  removeClickAction,
  unSelectMedicineGroup,
  itemClickAction,
}) => {
  const [hoverClass, setHoverClass] = useState('complain-remove-btn');

  return (
    <>
      <div
        className={`chief-complain-item mp-20 ${
          isSelectedGroup ? 'is-selected' : ''
        }`}
        key={item.id}
        onMouseOver={() => setHoverClass('complain-remove-btn-hover')}
        onMouseOut={() => setHoverClass('complain-remove-btn')}
      >
        <span
          onClick={(e) =>
            isSelectedGroup
              ? unSelectMedicineGroup(item)
              : itemClickAction(item)
          }
          className="cursor-pointer"
        >
          {item.name}
        </span>
        <span
          className={hoverClass}
          onClick={() => deleteConfirmation(removeClickAction, item.id)}
        >
          <i
            className="fa fa-minus-circle"
            aria-hidden="true"
            style={{ fontSize: '14px' }}
          ></i>
        </span>
      </div>
    </>
  );
};

export default memo(ItemGroupWithDeleteIcon);
