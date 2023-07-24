import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteConfirmation } from '../../../utils/helpers';
import { memo } from 'react';

const ItemMedicineWithDeleteIcon = ({
  item,
  isSelected,
  removeClickAction,
  removeMedicine,
  itemClickAction,
  showMedicineName,
}) => {
  const userInfo = useSelector((state) => state.authReducer.data);
  const [hoverClass, setHoverClass] = useState('complain-remove-btn');

  return (
    <>
      {item.createdBy === userInfo.id ? (
        <div
          className={`chief-complain-item mp-20 ${
            isSelected ? 'is-selected' : ''
          }`}
          key={item.id}
          onMouseOver={() => {
            setHoverClass('complain-remove-btn-hover');
          }}
          onMouseOut={() => {
            setHoverClass('complain-remove-btn');
          }}
        >
          <span
            className="cursor-pointer"
            onClick={() =>
              isSelected ? removeMedicine(item) : itemClickAction(item)
            }
          >
            {showMedicineName === 'brandName' || showMedicineName === 'any'
              ? item.brandName
              : item.genericName}
            ({item.type + (item.strength ? ` - ${item.strength}` : '')})
          </span>
          {/* <span className={hoverClass} onClick={() => deleteConfirmation(removeClickAction, item.id)}>
                        <i className="fa fa-minus-circle" aria-hidden="true" style={{ fontSize: "14px" }}></i>
                    </span> */}
        </div>
      ) : (
        <div
          className={`chief-complain-item mp-20 ${
            isSelected ? 'is-selected' : ''
          }`}
          key={item.id}
          onClick={() =>
            isSelected ? removeMedicine(item) : itemClickAction(item)
          }
          onMouseOut={() => {
            setHoverClass('complain-remove-btn');
          }}
        >
          <span className="cursor-pointer">
            {showMedicineName === 'brandName' || showMedicineName === 'any'
              ? item.brandName
              : item.genericName}
            ({item.type + (item.strength ? ` - ${item.strength}` : '')})
          </span>
        </div>
      )}
    </>
  );
};

export default memo(ItemMedicineWithDeleteIcon);
