import { memo } from 'react';
import {
  isExistAnyGyneData,
  isExistAnyDentalData,
  isExistAnyOncologyData,
  isExistObservationData,
  isExistAnyOnExamination,
  isExistAnyCardiologyData,
  isExistGeneralExaminationData,
} from '../../../../utils/helpers';
import ObservationView from '../views/observation';
import OcularExaminationView from '../views/ocularExaminationView';
import GeneralExaminationView from '../views/generalExaminationView';
import DentalView from '../views/dental';
import SystemicExaminationView from '../views/systemicExamination';
import OncologyExaminationView from '../views/oncologyExamination';
import GyneExaminationView from '../views/gyne';

const OnExamination = ({
  element,
  prescriptionItems,
  selectedOnExamination,
  setShowOnExamination,
  deletePrescriptionItem,
  setSelectedOnExamination,
  isHistoryPage = false,
}) => {

  return (
    <div
      className={`row item-row ${
        !isExistAnyOnExamination(selectedOnExamination) ? 'pb-5' : 'pb-2'
      }`}
      key={`onExamination`}
    >
      <div
        className="prescription-item"
        {...(!isHistoryPage
          ? {
              onClick: (e) => {
                e.stopPropagation();
                setShowOnExamination(true);
              },
            }
          : {})}
      >
        {element?.alterName?.length ? (
          <span>{element?.alterName}</span>
        ) : (
          <span>On Examinations +</span>
        )}
      </div>
      <div className="on-examination-view-area">
        {isExistObservationData(
          selectedOnExamination?.observations,
          'observation',
        ) && (
          <ObservationView
            selectedOnExamination={selectedOnExamination}
            deletePrescriptionItem={deletePrescriptionItem}
            prescriptionItems={prescriptionItems}
            isHistoryPage={isHistoryPage}
          />
        )}
        {isExistGeneralExaminationData(
          selectedOnExamination?.generalExaminations,
        ) && (
          <GeneralExaminationView
            selectedOnExamination={selectedOnExamination}
            setSelectedOnExamination={setSelectedOnExamination}
            prescriptionItems={prescriptionItems}
            isHistoryPage={isHistoryPage}
          />
        )}
        <OcularExaminationView
          selectedOnExamination={selectedOnExamination}
          setSelectedOnExamination={setSelectedOnExamination}
          prescriptionItems={prescriptionItems}
          isHistoryPage={isHistoryPage}
        />

        {isExistAnyOncologyData(selectedOnExamination?.oncologyExamination) && (
          <OncologyExaminationView
            selectedOnExamination={selectedOnExamination}
            setSelectedOnExamination={setSelectedOnExamination}
            isHistoryPage={isHistoryPage}
          />
        )}

        {isExistAnyCardiologyData(
          selectedOnExamination?.systemicExamination,
        ) && (
          <SystemicExaminationView
            selectedOnExamination={selectedOnExamination}
            setSelectedOnExamination={setSelectedOnExamination}
            prescriptionItems={prescriptionItems}
            isHistoryPage={isHistoryPage}
          />
        )}

        {(isExistAnyGyneData(selectedOnExamination?.gyneExamination) ||
          isExistAnyGyneData(selectedOnExamination?.breastExamination)) && (
          <GyneExaminationView
            selectedOnExamination={selectedOnExamination}
            setSelectedOnExamination={setSelectedOnExamination}
            prescriptionItems={prescriptionItems}
            isHistoryPage={isHistoryPage}
          />
        )}

        {isExistAnyDentalData(selectedOnExamination?.dentalExamination) && (
          <DentalView
            selectedOnExamination={selectedOnExamination}
            setSelectedOnExamination={setSelectedOnExamination}
            prescriptionItems={prescriptionItems}
            isHistoryPage={isHistoryPage}
          />
        )}
      </div>
    </div>
  );
};

export default memo(OnExamination);
