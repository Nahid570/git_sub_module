import React, { memo } from 'react';
import {
  isExistOnExamination,
  styledComponent,
} from '../../../../utils/helpers';
import CommonDeleteBtn from '../commonDeleteBtn';

const GeneralExaminationView = ({
  prescriptionItems,
  selectedOnExamination,
  setSelectedOnExamination,
  isHistoryPage,
}) => {
  let { generalExaminations } = selectedOnExamination;
  const removeItemsData = (fieldName) => {
    if (fieldName === 'bloodPressure') {
      generalExaminations.bloodPressure = { systolic: '', diastolic: '' };
    } else if (fieldName === 'pulseInfo') {
      generalExaminations.pulseInfo = {
        pulse: '',
        pulseUnit: 'PM',
        pulseType: '',
      };
    } else if (fieldName === 'temperatureInfo') {
      generalExaminations.temperatureInfo = {
        temperature: '',
        temperatureUnit: 'F',
        temperatureType: '',
      };
    } else if (fieldName === 'weightInfo') {
      generalExaminations.weightInfo = {
        weight: '',
        weightUnit: 'KG',
        weightShowInPrescription: '',
      };
    } else if (fieldName === 'bsa') {
      generalExaminations.showBsa = false;
      generalExaminations.bsa = '';
    } else if (fieldName === 'heightInfo') {
      generalExaminations.heightInfo = {
        feet: '',
        inch: '',
        heightUnit: 'Ft',
        heightShowInPrescription: '',
      };
    } else if (fieldName === 'bmi') {
      generalExaminations.showBmi = false;
      generalExaminations.bmi = '';
    } else if (fieldName === 'idealWeightInfo') {
      generalExaminations.idealWeightInfo = {
        idealWeight: '',
        idealWeightUnit: 'Ft',
      };
    } else if (fieldName === 'idealBmi') {
      generalExaminations.idealBmi = '';
    } else if (fieldName === 'targetDailyCalory') {
      generalExaminations.targetDailyCalory = '';
    } else {
      generalExaminations.diabetes = '';
    }
    selectedOnExamination.generalExaminations = generalExaminations;
    setSelectedOnExamination({ ...selectedOnExamination });
  };

  const Title = styledComponent(
    prescriptionItems?.items?.['on-examination']?.itemStyle || {},
  );
  const Value = styledComponent(
    prescriptionItems?.items?.['on-examination']?.subItemStyle || {},
  );

  return (
    <>
      {(selectedOnExamination?.generalExaminations['bloodPressure'].systolic ||
        selectedOnExamination?.generalExaminations['bloodPressure']
          .diastolic) && (
        <div className="text-left">
          <Title>BP:</Title>{' '}
          <Value>
            {
              selectedOnExamination?.generalExaminations['bloodPressure']
                .systolic
            }
            /
            {
              selectedOnExamination?.generalExaminations['bloodPressure']
                .diastolic
            }
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn
              action={removeItemsData}
              itemName={'bloodPressure'}
            />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['pulseInfo'].pulse && (
        <div className="text-left">
          <Title>Pulse:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['pulseInfo'].pulse +
              ' '}
            {selectedOnExamination?.generalExaminations['pulseInfo']
              .pulseUnit === 'PM'
              ? 'Per Minute'
              : 'BPM'}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'pulseInfo'} />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['pulseInfo'].pulseType && (
        <div className="text-left">
          <Title>Pulse:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['pulseInfo']
              .pulseType && (
              <span>
                {
                  selectedOnExamination?.generalExaminations['pulseInfo']
                    .pulseType
                }{' '}
              </span>
            )}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'pulseInfo'} />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['temperatureInfo']
        .temperature && (
        <div className="text-left">
          <Title>Temperature:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['temperatureInfo']
              .temperature + ' '}
            {
              selectedOnExamination?.generalExaminations['temperatureInfo']
                ?.temperatureUnit
            }
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn
              action={removeItemsData}
              itemName={'temperatureInfo'}
            />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['temperatureInfo']
        .temperatureType && (
        <div className="text-left">
          <Title>Temperature:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['temperatureInfo']
              .temperatureType && (
              <span>
                {
                  selectedOnExamination?.generalExaminations['temperatureInfo']
                    .temperatureType
                }
              </span>
            )}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn
              action={removeItemsData}
              itemName={'temperatureInfo'}
            />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['weightInfo']
        .weightShowInPrescription && (
        <div className="text-left">
          <Title>Weight:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['weightInfo'].weight +
              ' '}
            {
              selectedOnExamination?.generalExaminations['weightInfo']
                .weightUnit
            }
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'weightInfo'} />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations.bsa &&
        selectedOnExamination?.generalExaminations.showBsa && (
          <div className="text-left">
            <Title>BSA:</Title>{' '}
            <Value>{selectedOnExamination?.generalExaminations?.bsa}</Value>
            {!isHistoryPage && (
              <CommonDeleteBtn action={removeItemsData} itemName={'bsa'} />
            )}
          </div>
        )}
      {selectedOnExamination?.generalExaminations['heightInfo']
        .heightShowInPrescription && (
        <div className="text-left">
          <Title>Height:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['heightInfo'].feet +
              '.'}
            {selectedOnExamination?.generalExaminations['heightInfo'].inch
              ? ' ' +
                selectedOnExamination?.generalExaminations['heightInfo'].inch
              : 0}
            {' ' +
              selectedOnExamination?.generalExaminations['heightInfo']
                .heightUnit}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'heightInfo'} />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations.bmi &&
        selectedOnExamination?.generalExaminations.showBmi && (
          <div className="text-left">
            <Title>BMI:</Title>{' '}
            <Value>{selectedOnExamination?.generalExaminations?.bmi}</Value>
            {!isHistoryPage && (
              <CommonDeleteBtn action={removeItemsData} itemName={'bmi'} />
            )}
          </div>
        )}
      {selectedOnExamination?.generalExaminations?.idealWeightInfo
        ?.idealWeight && (
        <div className="text-left">
          <Title>Ideal Weight:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations?.idealWeightInfo
              ?.idealWeight + ' '}
            {
              selectedOnExamination?.generalExaminations?.idealWeightInfo
                ?.idealWeightUnit
            }
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn
              action={removeItemsData}
              itemName={'idealWeightInfo'}
            />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['idealBmi'] && (
        <div className="text-left">
          <Title>Ideal BMI:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['idealBmi']}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'idealBmi'} />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations['targetDailyCalory'] && (
        <div className="text-left">
          <Title>Target Daily Calory:</Title>{' '}
          <Value>
            {selectedOnExamination?.generalExaminations['targetDailyCalory']}
          </Value>
          {!isHistoryPage && (
            <CommonDeleteBtn
              action={removeItemsData}
              itemName={'targetDailyCalory'}
            />
          )}
        </div>
      )}
      {selectedOnExamination?.generalExaminations.diabetes && (
        <div className="text-left">
          <Title>Diabetes:</Title>{' '}
          <Value>{selectedOnExamination?.generalExaminations.diabetes}</Value>
          {!isHistoryPage && (
            <CommonDeleteBtn action={removeItemsData} itemName={'diabetes'} />
          )}
        </div>
      )}
    </>
  );
};

export default memo(GeneralExaminationView);
