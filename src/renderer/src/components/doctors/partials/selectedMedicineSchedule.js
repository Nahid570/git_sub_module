import { memo } from 'react';
import { medicineType, getRxLineClasses } from '../../../utils/helpers';

const selectedMedicineSchedule = ({ data, typeName, element, rxWhite }) => {
  return (
    <>
      <div className="ml-4 rx-left-space">
        <span className={getRxLineClasses(element, 'rx-schedule')}>
          {medicineType(typeName) &&
            Object.values(data.quantities)?.some((val) => val !== 0) &&
            Object.values(data.quantities)?.map((val, index) => (
              <span key={index} className={rxWhite}>
                {val}
                {++index === Object.values(data.quantities).length
                  ? ' ' + data.quantityUnit
                  : ' + '}
              </span>
            ))}
          {!medicineType(typeName) && data.quantity && (
            <span className={rxWhite}>
              {data.quantity +
                ' ' +
                data.quantityUnit +
                ' ' +
                data.schedule +
                ' ' +
                data.scheduleUnit}
            </span>
          )}
          <span className={`pr-2 ${rxWhite}`}></span>
        </span>
        <span className={getRxLineClasses(element, 'rx-instruction')}>
          {element?.lineDraw && element?.lineType !== 'none' && (
            <span className={`pl-2 ${rxWhite}`}></span>
          )}
          {data?.instructions?.map((insItem, key) => (
            <span key={key} className={rxWhite}>
              {insItem} {data.instructions.length !== key + 1 && ', '}
            </span>
          ))}
          {element?.lineDraw && element?.lineType !== 'none' && (
            <span className={`pr-2 ${rxWhite}`}></span>
          )}
        </span>
        <span className="medicine-duration">
          <span className={`pl-2 ${rxWhite}`}></span>
          {data.durationUnit === 'চলবে'
            ? data.durationUnit
            : data.duration
            ? data.duration + ' ' + data.durationUnit
            : ''}
        </span>
        {element?.lineDraw && element.lineType === 'underscore' && (
          <div className="bottom-border"></div>
        )}
      </div>
    </>
  );
};

export default memo(selectedMedicineSchedule);
