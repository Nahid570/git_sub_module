import { memo } from 'react';
import { itemSettingStyle } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Others = ({
  selectedHistories,
  setSelectedHistories,
  prescriptionItems,
  isDelBtn = true,
}) => {
  let { others } = selectedHistories || {};
  const clearData = (itemName) => {
    switch (itemName) {
      case 'mh':
        others[itemName] = {
          regular: false,
          irregular: false,
          menapause: false,
          Pregnancy: false,
          note: '',
        };
        break;
      default:
        others[itemName] = '';
    }
    selectedHistories['others'] = others;
    setSelectedHistories({ ...selectedHistories });
  };

  return (
    <div className="breast-exam-view">
      {others?.surgicalHistory && (
        <div>
          <span className="text-left pr-5">
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.itemStyle || {},
              )}
            >
              Surgical History:
            </span>{' '}
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.subItemStyle || {},
              )}
            >
              {others?.surgicalHistory}
            </span>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'surgicalHistory'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {others?.allergicHistory && (
        <div>
          <span className="text-left pr-5">
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.itemStyle || {},
              )}
            >
              Allergic History:
            </span>{' '}
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.subItemStyle || {},
              )}
            >
              {others?.allergicHistory}
            </span>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'allergicHistory'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {(others?.mh?.regular ||
        others?.mh?.irregular ||
        others?.mh?.menopause ||
        others?.mh?.pregnancy) && (
        <div>
          <span className="text-left pr-5">
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.itemStyle || {},
              )}
            >
              M/H:
            </span>{' '}
            <span
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.subItemStyle || {},
              )}
            >
              {others?.mh?.regular && <span>Regular </span>}
              {others?.mh?.irregular && <span>Irregular </span>}
              {others?.mh?.menopause && <span>Menopause </span>}
              {others?.mh?.pregnancy && <span>Pregnancy </span>}
            </span>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'sfh'}
            isDelBtn={isDelBtn}
          />
          {others?.mh?.note && (
            <div
              className="pl-4 font-italic"
              style={itemSettingStyle(
                prescriptionItems?.items?.history?.subItemStyle || {},
              )}
            >
              {others?.mh?.note ? `- ${others?.mh?.note}` : ''}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Others);
