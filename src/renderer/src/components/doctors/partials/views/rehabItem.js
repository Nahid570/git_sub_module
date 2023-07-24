import { memo } from 'react';
import { useSelector } from 'react-redux';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const RehabItem = ({ rehabItems, removeData, type, isHistoryPage }) => {
  const prescriptionItems = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.prescriptionItems,
  );
  return (
    <>
      {rehabItems?.map((item, index) => {
        return (
          <li key={index}>
            <div>
              <span
                className="text-left pr-5"
                style={itemSettingStyle(
                  prescriptionItems?.items?.rehabilitation?.itemStyle || {},
                )}
              >
                {item.name}{' '}
                {item.duration !== ''
                  ? '- ' + item.duration + ' ' + item.unit
                  : ''}{' '}
              </span>
              {!isHistoryPage && (
                <CommonDeleteBtn
                  action={removeData}
                  itemName={type}
                  delId={item.name}
                />
              )}
              {/* {removeData && (
                <span
                  className="float-right cursor-pointer"
                  onClick={() => removeData(type, item.name)}
                >
                  <i
                    className="fa fa-times-circle"
                    style={{ color: '#CB2020D9' }}
                  ></i>
                </span>
              )} */}
            </div>
            {item.note !== '' ? (
              <div
                className="pl-2 font-italic"
                style={itemSettingStyle(
                  prescriptionItems?.items?.rehabilitation?.subItemStyle || {},
                )}
              >
                - {item.note}
              </div>
            ) : (
              ''
            )}
          </li>
        );
      })}
    </>
  );
};

export default memo(RehabItem);
