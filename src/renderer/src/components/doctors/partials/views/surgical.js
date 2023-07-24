import { memo } from 'react';
import { styledComponent } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const Surgical = ({
  selectedHistories,
  setSelectedHistories,
  prescriptionItems,
  isDelBtn = true,
}) => {
  let { surgical } = selectedHistories || {};
  const clearData = (itemName) => {
    surgical[itemName] = '';
    selectedHistories['surgical'] = surgical;
    setSelectedHistories({ ...selectedHistories });
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['history']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['history']?.subItemStyle || {},
  );

  return (
    <div className="breast-exam-view">
      {surgical?.lucs && (
        <div>
          <span className="text-left pr-5">
            <Title>LUCS:</Title>
            <Value> {surgical?.lucs}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'lucs'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {surgical?.appendicectomy && (
        <div>
          <span className="text-left pr-5">
            <Title>Appendicectomy:</Title>
            <Value> {surgical?.appendicectomy}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'appendicectomy'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {surgical?.cholecystectomy && (
        <div>
          <span className="text-left pr-5">
            <Title>Cholecystectomy:</Title>
            <Value> {surgical?.cholecystectomy}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'cholecystectomy'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {surgical?.laparotomy && (
        <div>
          <span className="text-left pr-5">
            <Title>Laparotomy:</Title>
            <Value> {surgical?.laparotomy}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'laparotomy'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {surgical?.laparoscopy && (
        <div>
          <span className="text-left pr-5">
            <Title>Laparoscopy:</Title>
            <Value> {surgical?.laparoscopy}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'laparoscopy'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
      {surgical?.others && (
        <div>
          <span className="text-left pr-5">
            <Title>Others:</Title>
            <Value> {surgical?.others}</Value>
          </span>
          <CommonDeleteBtn
            action={clearData}
            itemName={'others'}
            isDelBtn={isDelBtn}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Surgical);
