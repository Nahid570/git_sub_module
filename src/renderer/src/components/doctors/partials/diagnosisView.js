import React, { memo } from 'react';
import { itemSettingStyle } from '../../../utils/helpers';
import CommonDeleteBtn from './commonDeleteBtn';

const DiagnosisView = ({
  selectedDiagnosis,
  setShowDiagnosis,
  prescriptionItems,
  deletePrescriptionItem,
  isHistoryPage = false,
  element,
}) => {
  return (
    <div
      className={`row item-row ${
        selectedDiagnosis.length ? 'data-item' : 'no-data-item'
      }`}
      key={selectedDiagnosis.name}
    >
      <span
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowDiagnosis(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>Diagnosis +</span>
        )}
      </span>
      <ul className="sub-child-list">
        {selectedDiagnosis.length > 0 &&
          selectedDiagnosis?.map((item, index) => {
            return (
              <li key={item.id}>
                <div>
                  <span
                    className="text-left pr-5"
                    style={itemSettingStyle(
                      prescriptionItems?.items?.['diagnosis']?.itemStyle || {},
                    )}
                  >
                    {item.query ? '?' : ''} {item.query} {item.name}
                  </span>
                  {!isHistoryPage && (
                    <CommonDeleteBtn
                      action={deletePrescriptionItem}
                      itemName={'diagnosis'}
                      delId={item.id}
                    />
                  )}
                  {item.note !== '' && (
                    <div
                      className="pl-2"
                      style={itemSettingStyle(
                        prescriptionItems?.items?.['diagnosis']?.subItemStyle ||
                          {},
                      )}
                    >
                      {item.note ? `- ${item.note}` : ''}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default memo(DiagnosisView);
