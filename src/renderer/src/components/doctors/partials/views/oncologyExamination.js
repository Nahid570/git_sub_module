import { memo } from 'react';
import { cnsIpiTotalPoint } from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const OncologyExamination = ({
  selectedOnExamination,
  setSelectedOnExamination,
  isHistoryPage = false,
}) => {
  let { oncologyExamination } = selectedOnExamination;

  const deleteData = (itemName) => {
    selectedOnExamination.oncologyExamination[itemName] = false;
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  return (
    <div className="oncology-examination-view">
      {oncologyExamination?.isShowAuc && oncologyExamination?.aucResult && (
        <div>
          <span className="text-left pr-5">
            AUC: {oncologyExamination?.aucResult} mg
          </span>
          {!isHistoryPage && (
            <CommonDeleteBtn action={deleteData} itemName={'isShowAuc'} />
          )}
        </div>
      )}
      {oncologyExamination?.isShowCnsIpi && (
        <div>
          <span className="text-left pr-5">
            CNS-IPI: {cnsIpiTotalPoint(oncologyExamination)}
          </span>
          {!isHistoryPage && (
            <CommonDeleteBtn action={deleteData} itemName={'isShowCnsIpi'} />
          )}
        </div>
      )}
      {oncologyExamination?.isShowMmIss && (
        <div>
          <span className="text-left pr-5">
            MM-ISS: {oncologyExamination?.mmIssResult?.stage}
          </span>
          {/* <div className="pl-2 font-italic">
            - Median survival is {oncologyExamination?.mmIssResult?.survivalMonths} months
          </div> */}
          {!isHistoryPage && (
            <CommonDeleteBtn action={deleteData} itemName={'isShowMmIss'} />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(OncologyExamination);
