import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const ChiefComplain = ({
  element,
  prescriptionItems,
  setShowChiefComplain,
  deletePrescriptionItem,
  selectedChiefComplains,
  isHistoryPage = false,
  isDelBtn = true,
}) => {
  return (
    <div
      className={`row item-row ${
        selectedChiefComplains.length ? 'data-item' : 'no-data-item'
      }`}
      key={`chief-complain`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowChiefComplain(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span> Chief Complain +</span>
        )}
      </span>
      <ul className="sub-child-list">
        {selectedChiefComplains.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <span
                  className="text-left pr-5"
                  style={itemSettingStyle(
                    prescriptionItems?.items?.['chief-complain']?.itemStyle ||
                      {},
                  )}
                >
                  {item.name}{' '}
                  {item.duration !== ''
                    ? '- ' + item.duration + ' ' + item.unit
                    : ''}{' '}
                </span>
                {!isHistoryPage && (
                  <CommonDeleteBtn
                    action={deletePrescriptionItem}
                    itemName={'chiefComplain'}
                    delId={item.name}
                  />
                )}
              </div>
              {item.note !== '' ? (
                <div
                  style={itemSettingStyle(
                    prescriptionItems?.items?.['chief-complain']
                      ?.subItemStyle || {},
                  )}
                  className="pl-2 font-italic"
                >
                  - {item.note}
                </div>
              ) : (
                ''
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(ChiefComplain);
