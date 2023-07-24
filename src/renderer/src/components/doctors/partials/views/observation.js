import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Observation = ({
  deletePrescriptionItem,
  selectedOnExamination,
  prescriptionItems,
  isHistoryPage,
}) => {
  return (
    <div className="text-left">
      {selectedOnExamination?.observations.map((item, index) => {
        return (
          <div key={index}>
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.['on-examination']?.itemStyle || {},
              )}
            >
              {item.name.length ? ` ${item.name}` : ''}{' '}
            </span>
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.['on-examination']?.subItemStyle ||
                  {},
              )}
            >
              {item.note.length ? `- ${item.note}` : ''}
            </span>
            {!isHistoryPage && (
              <CommonDeleteBtn
                action={deletePrescriptionItem}
                itemName={'onExamination'}
                delId={item.name}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Observation);
