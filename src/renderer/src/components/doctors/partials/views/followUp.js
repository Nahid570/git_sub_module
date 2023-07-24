import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const FollowUp = ({
  element,
  prescriptionItems,
  setShowFollowUp,
  deletePrescriptionItem,
  selectedFollowUps,
  isHistoryPage = false,
}) => {
  return (
    <div
      className={`row item-row ${selectedFollowUps?.length ? 'pb-1' : 'pb-5'}`}
      key={`follow-up`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowFollowUp(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Follow Up +</span>
        )}
      </span>
      <ul className="sub-child-list">
        {selectedFollowUps?.map((item, index) => {
          return (
            <li key={index}>
              <span
                className="text-left pr-5"
                style={itemSettingStyle(
                  prescriptionItems?.items?.['follow-up']?.itemStyle || {},
                )}
              >
                {item}
              </span>
              {!isHistoryPage && (
                <CommonDeleteBtn
                  action={deletePrescriptionItem}
                  itemName={'followup'}
                  delId={item}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(FollowUp);
