import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Investigation = ({
  element,
  prescriptionItems,
  setShowInvestigation,
  deletePrescriptionItem,
  selectedInvestigations,
  isHistoryPage = false,
}) => {
  return (
    <div
      className={`row item-row ${
        selectedInvestigations.length ? 'data-item' : 'no-data-item'
      }`}
      key={`investigations`}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowInvestigation(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Investigations +</span>
        )}
      </span>
      {selectedInvestigations.length > 0 && (
        <ul className="sub-child-list">
          {selectedInvestigations.map((item, index) => {
            return (
              <li key={index}>
                <div>
                  <span
                    className="text-left"
                    style={itemSettingStyle(
                      prescriptionItems?.items?.investigation?.itemStyle || {},
                    )}
                  >
                    {item.name}{' '}
                    {item?.result && (
                      <span className="pl-2">
                        - <i>{item.result}</i>
                      </span>
                    )}
                  </span>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={deletePrescriptionItem}
                      itemName={'investigation'}
                      delId={item.name}
                    />
                  )}
                </div>
                {item?.instruction ? (
                  <div
                    className="pl-2"
                    style={itemSettingStyle(
                      prescriptionItems?.items?.investigation?.subItemStyle ||
                        {},
                    )}
                  >
                    - {item.instruction}
                  </div>
                ) : (
                  ''
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default memo(Investigation);
